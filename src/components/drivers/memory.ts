import { CacheDriver } from "~/types/qwache";

const memory = new Map<string, any>();

export default (): CacheDriver => ({
    get: async <T>(id: string) => {
        return memory.get(id) as T | undefined
    },
    async set(id, data) {
        memory.set(id, data);
    },
    async list() {
        const keys = []
        for(const key of memory.keys()) {
            keys.push(key)
        }
        return keys
    },
})