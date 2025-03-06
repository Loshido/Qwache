import memory from "./components/drivers/memory";

export type { CacheDriver } from "./types/qwache"
export { createCache } from "./caching";
export const createMemoryCachee = memory;