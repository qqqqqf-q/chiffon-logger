// sandbox 常量，从 Arkanis 提取，去掉 Zod 依赖

export const SandboxEngine = Object.freeze({
    AUTO: 'auto',
    DOCKER: 'docker',
    PODMAN: 'podman',
});

export const SandboxRuntime = Object.freeze({
    AUTO: 'auto',
    NATIVE: 'native',
    GVISOR: 'gvisor',
});

export const SandboxEngineResolved = Object.freeze({
    DOCKER: 'docker',
    PODMAN: 'podman',
});

export const SandboxRuntimeResolved = Object.freeze({
    NATIVE: 'native',
    GVISOR: 'gvisor',
});

export const NetworkPolicy = Object.freeze({
    OFF: 'off',
    RESTRICTED: 'restricted',
    FULL: 'full',
});

export const WorkspaceAccess = Object.freeze({
    NONE: 'none',
    READ_ONLY: 'read_only',
    READ_WRITE: 'read_write',
});
