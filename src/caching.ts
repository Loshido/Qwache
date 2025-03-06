import { createMemoryCachee } from ".";
import { CacheDriver, Caching } from "./types/qwache";

export const createCache = (driver?: CacheDriver): Caching => {
    const activeDriver = driver || createMemoryCachee();
    return async <T>(id: string, callback: () => Promise<T>, ttl: number = 60 * 60): Promise<T> => {
        const data = await activeDriver.get<[T, number]>(id)

        if(data && data[1] + ttl * 1000 > Date.now()) {
            return data[0];
        }

        const fresh = await callback();
        await activeDriver.set(id, [fresh, Date.now()]);

        return fresh;
    };
}