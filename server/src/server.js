import { randomBytes } from 'node:crypto';

import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

import { OciProvider } from './sandbox/ociProvider.js';
import { SandboxRegistry, registerCleanupHooks } from './sandbox/sandboxRegistry.js';
import { buildOAuthUrl, exchangeCode, getGitHubUser } from './auth/github.js';
import { signSession, signWsToken, verify } from './auth/jwt.js';
import { createTerminalBridge } from './ws/terminalBridge.js';

const {
    PORT = '3001',
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_SECRET,
    BLOG_ORIGIN = 'http://localhost:4321',
    // 可选：逗号分隔的 GitHub 用户名白名单，不填则所有 GitHub 用户可用
    ALLOWED_GITHUB_LOGINS = '',
    SANDBOX_IMAGE = 'chiffon-sandbox:latest',
    MAX_SANDBOXES = '20',
    MAX_SANDBOXES_PER_USER = '2',
} = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !JWT_SECRET) {
    process.stderr.write('[server] 缺少必要环境变量: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET\n');
    process.exit(1);
}

const allowedLogins = ALLOWED_GITHUB_LOGINS
    ? new Set(ALLOWED_GITHUB_LOGINS.split(',').map((s) => s.trim()).filter(Boolean))
    : null;

const provider = new OciProvider({ image: SANDBOX_IMAGE });
const registry = new SandboxRegistry();
registerCleanupHooks(registry, provider);

// login → active sandbox count
const userSandboxCount = new Map();
// synchronous reservation counter to prevent race conditions on the limit check
let pendingCount = 0;

const app = Fastify({ logger: { level: 'info' } });

await app.register(fastifyCookie);
await app.register(fastifyCors, {
    origin: BLOG_ORIGIN,
    credentials: true,
});
await app.register(fastifyWebsocket);

// ─── 工具函数 ────────────────────────────────────────────────────────────────

function setCookieSession(reply, token) {
    const isProd = process.env.NODE_ENV === 'production';
    reply.setCookie('sb_session', token, {
        httpOnly: true,
        // 博客与 sandbox server 跨域时必须 none+secure；本地开发用 lax
        sameSite: isProd ? 'none' : 'lax',
        secure: isProd,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
    });
}

function getSessionFromRequest(request) {
    const token = request.cookies?.sb_session;
    if (!token) return null;
    return verify(token, JWT_SECRET);
}

// ─── GitHub OAuth ────────────────────────────────────────────────────────────

app.get('/auth/github', async (request, reply) => {
    const state = randomBytes(16).toString('hex');
    const isProdState = process.env.NODE_ENV === 'production';
    reply.setCookie('oauth_state', state, { httpOnly: true, sameSite: 'lax', secure: isProdState, path: '/', maxAge: 300 });
    return reply.redirect(buildOAuthUrl(GITHUB_CLIENT_ID, state));
});

app.get('/auth/github/callback', async (request, reply) => {
    const { code, state } = request.query;
    const storedState = request.cookies?.oauth_state;

    if (!code || !state || state !== storedState) {
        return reply.status(400).send({ error: 'invalid_state' });
    }

    let user;
    try {
        const accessToken = await exchangeCode(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, code);
        user = await getGitHubUser(accessToken);
    } catch (err) {
        app.log.warn({ err }, 'GitHub OAuth 失败');
        return reply.status(401).send({ error: 'oauth_failed' });
    }

    if (allowedLogins && !allowedLogins.has(user.login)) {
        return reply.status(403).send({ error: 'not_allowed' });
    }

    const token = signSession({ sub: String(user.id), login: user.login, avatar: user.avatar_url }, JWT_SECRET);
    setCookieSession(reply, token);
    reply.clearCookie('oauth_state');

    return reply.redirect(`${BLOG_ORIGIN}/terminal`);
});

app.get('/auth/me', async (request, reply) => {
    const session = getSessionFromRequest(request);
    if (!session) return reply.status(401).send({ error: 'unauthenticated' });
    return { login: session.login, avatar: session.avatar };
});

app.post('/auth/logout', async (request, reply) => {
    reply.clearCookie('sb_session', { path: '/' });
    return { ok: true };
});

// 颁发短命 ws-token，客户端用于 WebSocket 握手
app.get('/auth/ws-token', async (request, reply) => {
    const session = getSessionFromRequest(request);
    if (!session) return reply.status(401).send({ error: 'unauthenticated' });
    const wsToken = signWsToken({ sub: session.sub, login: session.login }, JWT_SECRET);
    return { token: wsToken };
});

// ─── WebSocket 终端 ─────────────────────────────────────────────────────────

app.get('/ws/terminal', { websocket: true }, async (socket, request) => {
    const { token, cols, rows } = request.query ?? {};
    const session = token ? verify(token, JWT_SECRET) : null;

    if (!session) {
        socket.send(JSON.stringify({ t: 'error', msg: 'unauthenticated' }));
        socket.close(4001, 'Unauthorized');
        return;
    }

    if (registry.size + pendingCount >= Number(MAX_SANDBOXES)) {
        socket.send(JSON.stringify({ t: 'error', msg: 'server_full' }));
        socket.close(1013, 'Try Again Later');
        return;
    }

    const userCount = userSandboxCount.get(session.login) ?? 0;
    if (userCount >= Number(MAX_SANDBOXES_PER_USER)) {
        socket.send(JSON.stringify({ t: 'error', msg: 'user_limit_reached' }));
        socket.close(1013, 'Too Many Sessions');
        return;
    }
    // Reserve slot synchronously before any await — prevents concurrent connections
    // from all passing the limit check before any container is registered
    pendingCount++;
    userSandboxCount.set(session.login, userCount + 1);

    const initCols = Math.max(40, Math.min(500, Number(cols) || 80));
    const initRows = Math.max(10, Math.min(200, Number(rows) || 24));

    app.log.info({ login: session.login }, 'terminal connect');

    let handle = null;
    let bridge = null;
    let cleanedUp = false;

    // 创建容器
    try {
        const result = await provider.createSandbox();
        handle = result.handle;
        registry.register(handle);
        app.log.info({ sandbox_id: handle.sandbox_id, runtime: result.runtimeNote }, 'sandbox created');
    } catch (err) {
        pendingCount--;
        const cur = userSandboxCount.get(session.login) ?? 1;
        if (cur <= 1) userSandboxCount.delete(session.login);
        else userSandboxCount.set(session.login, cur - 1);
        app.log.error({ err }, 'sandbox create failed');
        socket.send(JSON.stringify({ t: 'error', msg: 'sandbox unavailable' }));
        socket.close(1011, 'Sandbox error');
        return;
    }
    // Container is now tracked in registry; release the pending reservation
    pendingCount--;

    socket.send(JSON.stringify({ t: 'ready', sandbox_id: handle.sandbox_id }));

    // 建立 PTY 桥
    bridge = createTerminalBridge({
        containerId: handle.sandbox_id,
        cols: initCols,
        rows: initRows,
        onData(data) {
            if (socket.readyState === socket.OPEN) {
                socket.send(data);
            }
        },
        onExit(code) {
            app.log.info({ sandbox_id: handle.sandbox_id, code }, 'pty exit');
            if (socket.readyState === socket.OPEN) {
                socket.send(JSON.stringify({ t: 'exit', code }));
                socket.close(1000);
            }
            cleanup();
        },
    });

    socket.on('message', (raw) => {
        const msg = raw.toString();
        // 控制消息（JSON 字符串）
        if (msg.startsWith('{')) {
            try {
                const parsed = JSON.parse(msg);
                if (parsed.t === 'resize' && parsed.cols && parsed.rows) {
                    bridge.resize(parsed.cols, parsed.rows);
                }
            } catch { /* 忽略非法控制帧 */ }
            return;
        }
        // 其余视为键盘输入
        bridge.write(msg);
    });

    socket.on('close', () => {
        app.log.info({ sandbox_id: handle?.sandbox_id, login: session.login }, 'terminal disconnect');
        cleanup();
    });

    function cleanup() {
        if (cleanedUp) return;
        cleanedUp = true;
        if (bridge) {
            bridge.kill();
            bridge = null;
        }
        if (handle) {
            registry.remove(handle.sandbox_id);
            provider.destroy(handle).catch((err) => {
                app.log.warn({ err, sandbox_id: handle.sandbox_id }, 'destroy failed');
            });
            handle = null;
        }
        const cur = userSandboxCount.get(session.login) ?? 1;
        if (cur <= 1) userSandboxCount.delete(session.login);
        else userSandboxCount.set(session.login, cur - 1);
    }
});

// ─── 启动 ────────────────────────────────────────────────────────────────────

try {
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
