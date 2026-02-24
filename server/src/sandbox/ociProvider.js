import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import os from 'node:os';

import {
    SandboxEngine,
    SandboxRuntime,
    SandboxEngineResolved,
    SandboxRuntimeResolved,
    NetworkPolicy,
    WorkspaceAccess,
} from './constants.js';
import { SandboxErrorCode as ErrorCode } from './errors.js';
import { nowIso } from './utils.js';
import { probeExecutable, runOciCommand } from './ociCli.js';
import { buildCreateArgs, buildExecArgs, BLOG_IMAGE } from './ociSpecBuilder.js';

function makeError(code, message, details) {
    const err = new Error(message);
    err.code = code;
    if (details) err.details = details;
    return err;
}

function generateSandboxId() {
    return `sb_${randomBytes(6).toString('hex')}`;
}

async function resolveEngine(engine) {
    if (engine === SandboxEngine.DOCKER) return SandboxEngineResolved.DOCKER;
    if (engine === SandboxEngine.PODMAN) return SandboxEngineResolved.PODMAN;
    // auto
    if (await probeExecutable('docker')) return SandboxEngineResolved.DOCKER;
    if (await probeExecutable('podman')) return SandboxEngineResolved.PODMAN;
    throw makeError(ErrorCode.ERR_SANDBOX_START_FAILED, '未找到可用的 OCI engine（docker/podman）');
}

async function resolveRuntime(runtime) {
    if (runtime === SandboxRuntime.GVISOR) return SandboxRuntimeResolved.GVISOR;
    if (runtime === SandboxRuntime.NATIVE) return SandboxRuntimeResolved.NATIVE;
    // auto: 优先 gVisor，不可用则降级
    if (await probeExecutable('runsc')) return SandboxRuntimeResolved.GVISOR;
    return SandboxRuntimeResolved.NATIVE;
}

/** 博客沙盒默认资源限制 */
function blogResources() {
    return {
        max_wall_clock_ms: 60_000,
        max_stdout_bytes: 512 * 1024,
        max_stderr_bytes: 64 * 1024,
        max_memory_mb: 256,
        max_cpu: 0.5,
    };
}

export class OciProvider {
    constructor({ image, engine, runtime } = {}) {
        this._image = image ?? BLOG_IMAGE;
        this._engine = engine ?? SandboxEngine.AUTO;
        this._runtime = runtime ?? SandboxRuntime.AUTO;
    }

    async createSandbox() {
        const engineResolved = await resolveEngine(this._engine);
        const runtimeResolved = await resolveRuntime(this._runtime);

        const handle = {
            sandbox_id: generateSandboxId(),
            created_at: nowIso(),
            engine_resolved: engineResolved,
            runtime_resolved: runtimeResolved,
            image: this._image,
            network_policy: NetworkPolicy.OFF,
            workspace_access: WorkspaceAccess.NONE,
            workspace_mount_path: null,
            resources: blogResources(),
        };

        const { args, runtimeNote } = buildCreateArgs({ handle });
        const raw = await runOciCommand(handle.engine_resolved, args, { timeout_ms: 30_000 });

        if (raw.spawnError) {
            throw makeError(ErrorCode.ERR_SANDBOX_START_FAILED, `engine spawn 失败: ${raw.spawnError.message}`);
        }
        if (raw.exit_code !== 0) {
            throw makeError(
                ErrorCode.ERR_SANDBOX_START_FAILED,
                `容器启动失败 (exit ${raw.exit_code}): ${raw.stderr}`.slice(0, 500),
            );
        }

        return { handle, runtimeNote };
    }

    async destroy(handle) {
        const raw = await runOciCommand(
            handle.engine_resolved,
            ['rm', '-f', handle.sandbox_id],
            { timeout_ms: 15_000 },
        );
        if (raw.spawnError) {
            throw makeError(ErrorCode.ERR_SANDBOX_EXEC_FAILED, `destroy spawn 失败: ${raw.spawnError.message}`);
        }
    }
}
