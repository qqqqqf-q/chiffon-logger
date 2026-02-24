export class SandboxRegistry {
    #handles = new Map();

    register(handle) {
        const id = handle?.sandbox_id;
        if (!id) throw new Error('handle 缺少 sandbox_id');
        if (this.#handles.has(id)) throw new Error(`sandbox_id ${id} 已注册`);
        this.#handles.set(id, handle);
    }

    get(sandboxId) {
        return this.#handles.get(sandboxId);
    }

    remove(sandboxId) {
        this.#handles.delete(sandboxId);
    }

    get size() {
        return this.#handles.size;
    }

    async destroyAll(provider) {
        const destroyed = [];
        const errors = [];
        const entries = [...this.#handles.entries()];
        this.#handles.clear();

        for (const [sandboxId, handle] of entries) {
            try {
                await provider.destroy(handle);
                destroyed.push(sandboxId);
            } catch (err) {
                errors.push({ sandbox_id: sandboxId, error: err });
            }
        }

        return { destroyed, errors };
    }
}

export function registerCleanupHooks(registry, provider) {
    let cleaned = false;

    async function cleanup() {
        if (cleaned) return;
        cleaned = true;
        if (registry.size === 0) return;

        const result = await registry.destroyAll(provider).catch((err) => {
            process.stderr.write(`[sandbox-cleanup] destroyAll 异常: ${err.message}\n`);
            return { destroyed: [], errors: [] };
        });

        for (const { sandbox_id, error } of result.errors) {
            process.stderr.write(`[sandbox-cleanup] ${sandbox_id}: ${error.message}\n`);
        }
    }

    async function onSignal() {
        await cleanup();
        process.exit(1);
    }

    process.on('SIGTERM', onSignal);
    process.on('SIGINT', onSignal);
    process.on('beforeExit', cleanup);

    return {
        detach() {
            process.removeListener('SIGTERM', onSignal);
            process.removeListener('SIGINT', onSignal);
            process.removeListener('beforeExit', cleanup);
        },
    };
}
