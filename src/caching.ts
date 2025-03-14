import { createMemoryCachee } from ".";
import { CacheDriver, Caching } from "./types/qwache";

export const createCache = (driver?: CacheDriver): Caching => {
    const activeDriver = driver || createMemoryCachee();
    return async <T>(id: string, callback: () => Promise<T>, ttl: number = 60 * 60 * 1000): Promise<T> => {
        const data = await activeDriver.get<[T, number]>(id)

        if(data && data[1] + ttl > Date.now()) {
            return data[0];
        }

        const freshData = await callback();
        await activeDriver.set(id, [freshData, Date.now()]);

        return freshData;
    };
}