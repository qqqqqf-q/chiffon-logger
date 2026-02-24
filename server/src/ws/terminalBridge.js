import pty from 'node-pty';

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * 桥接 node-pty 和 docker exec，提供交互式终端。
 *
 * @param {object} opts
 * @param {string} opts.containerId
 * @param {number} opts.cols
 * @param {number} opts.rows
 * @param {(data: string) => void} opts.onData
 * @param {(code: number, signal: number) => void} opts.onExit
 * @returns {{ write, resize, kill }}
 */
export function createTerminalBridge({ containerId, cols, rows, onData, onExit }) {
    const proc = pty.spawn('docker', ['exec', '-it', containerId, '/bin/bash'], {
        name: 'xterm-256color',
        cols: cols ?? 80,
        rows: rows ?? 24,
        // 继承父进程 env，DOCKER_HOST 会自动传入
    });

    let idleTimer = resetIdleTimer(null);

    function resetIdleTimer(existing) {
        if (existing) clearTimeout(existing);
        return setTimeout(() => proc.kill(), IDLE_TIMEOUT_MS);
    }

    proc.onData((data) => {
        idleTimer = resetIdleTimer(idleTimer);
        onData(data);
    });

    proc.onExit(({ exitCode, signal }) => {
        clearTimeout(idleTimer);
        onExit(exitCode, signal);
    });

    return {
        write(data) {
            idleTimer = resetIdleTimer(idleTimer);
            proc.write(data);
        },
        resize(c, r) {
            proc.resize(c, r);
        },
        kill() {
            clearTimeout(idleTimer);
            try { proc.kill(); } catch { /* already dead */ }
        },
    };
}
