import { WorkspaceAccess, NetworkPolicy } from './constants.js';
import { SandboxRuntimeResolved } from './constants.js';

export const BLOG_IMAGE = process.env.SANDBOX_IMAGE ?? 'chiffon-sandbox:latest';

const CONTAINER_TMP_PATH = '/tmp';

export function buildCreateArgs({ handle, artifactsDir }) {
    const args = ['run', '-d', '--name', handle.sandbox_id];

    args.push('--label', 'chiffon-sandbox=true');

    const runtimeNote = applyRuntime(args, handle);
    applyHardening(args);
    applyNetwork(args, handle.network_policy);
    applyResources(args, handle.resources);

    args.push('--read-only');
    args.push('--tmpfs', `${CONTAINER_TMP_PATH}:rw,size=64m,exec`);

    if (artifactsDir) {
        applyWorkspace(args, handle);
    }

    args.push(handle.image || BLOG_IMAGE);
    args.push('sleep', 'infinity');

    return { args, runtimeNote };
}

export function buildExecArgs({ handle, execSpec }) {
    const args = ['exec'];

    if (execSpec.cwd) args.push('-w', execSpec.cwd);

    if (execSpec.env && typeof execSpec.env === 'object') {
        for (const [key, value] of Object.entries(execSpec.env)) {
            args.push('-e', `${key}=${value}`);
        }
    }

    args.push(handle.sandbox_id);
    args.push(execSpec.cmd);
    if (Array.isArray(execSpec.args)) args.push(...execSpec.args);

    return { args };
}

function applyRuntime(args, handle) {
    if (handle.runtime_resolved === SandboxRuntimeResolved.GVISOR) {
        args.push('--runtime=runsc');
        return 'gvisor';
    }
    return 'native';
}

function applyHardening(args) {
    args.push('--security-opt', 'no-new-privileges');
    args.push('--cap-drop', 'ALL');
    args.push('--pids-limit', '256');
}

function applyNetwork(args, policy) {
    if (policy === NetworkPolicy.OFF || policy === NetworkPolicy.RESTRICTED) {
        args.push('--network', 'none');
    }
}

function applyResources(args, resources) {
    if (resources?.max_memory_mb) {
        args.push('--memory', `${resources.max_memory_mb}m`);
        args.push('--memory-swap', `${resources.max_memory_mb}m`);
    }
    if (resources?.max_cpu) {
        args.push('--cpus', String(resources.max_cpu));
    }
}

function applyWorkspace(args, handle) {
    if (!handle.workspace_mount_path) return;
    const access = handle.workspace_access;
    if (access === WorkspaceAccess.READ_ONLY) {
        args.push('-v', `${handle.workspace_mount_path}:/workspace:ro`);
    } else if (access === WorkspaceAccess.READ_WRITE) {
        args.push('-v', `${handle.workspace_mount_path}:/workspace:rw`);
    }
}
