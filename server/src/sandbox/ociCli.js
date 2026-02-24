import { spawn } from 'node:child_process';
import { limitBytes, nowIso, durationMs } from './utils.js';

const DEFAULT_MAX_STDOUT_BYTES = 4 * 1024 * 1024;
const DEFAULT_MAX_STDERR_BYTES = 1 * 1024 * 1024;
const PROBE_TIMEOUT_MS = 5_000;

export async function probeExecutable(name) {
    return new Promise((resolve) => {
        let settled = false;

        function settle(value) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(value);
        }

        const child = spawn(name, ['--version'], { stdio: 'ignore' });
        child.on('error', () => settle(false));
        child.on('close', () => settle(true));

        const timer = setTimeout(() => {
            try { child.kill('SIGKILL'); } catch { /* already exited */ }
            settle(false);
        }, PROBE_TIMEOUT_MS);
    });
}

export async function runOciCommand(engine, args, opts = {}) {
    const timeoutMs = opts.timeout_ms ?? 0;
    const maxStdout = opts.max_stdout_bytes ?? DEFAULT_MAX_STDOUT_BYTES;
    const maxStderr = opts.max_stderr_bytes ?? DEFAULT_MAX_STDERR_BYTES;

    const startedAt = nowIso();
    const child = spawn(engine, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    const stdoutChunks = [];
    const stderrChunks = [];

    child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk) => stderrChunks.push(chunk));

    let timedOut = false;
    let timer = null;

    const exitPromise = new Promise((resolve, reject) => {
        child.on('error', reject);
        child.on('close', (code, signal) => resolve({ code, signal }));
    });

    if (timeoutMs > 0) {
        timer = setTimeout(() => {
            timedOut = true;
            try { child.kill('SIGKILL'); } catch { /* already exited */ }
        }, timeoutMs);
    }

    let exitCode = null;
    let exitSignal = null;
    let spawnError = null;

    try {
        const result = await exitPromise;
        exitCode = result.code;
        exitSignal = result.signal ?? null;
    } catch (err) {
        spawnError = err;
    } finally {
        if (timer) clearTimeout(timer);
    }

    const endedAt = nowIso();
    const rawStdout = Buffer.concat(stdoutChunks);
    const rawStderr = Buffer.concat(stderrChunks);

    const stdoutLimited = limitBytes(rawStdout, maxStdout);
    const stderrLimited = limitBytes(rawStderr, maxStderr);

    return {
        startedAt,
        endedAt,
        duration_ms: durationMs(startedAt, endedAt),
        timed_out: timedOut,
        exit_code: exitCode,
        signal: exitSignal,
        stdout: stdoutLimited.text,
        stderr: stderrLimited.text,
        stdout_bytes: stdoutLimited.bytes,
        stderr_bytes: stderrLimited.bytes,
        stdout_truncated: stdoutLimited.truncated,
        stderr_truncated: stderrLimited.truncated,
        spawnError,
    };
}
