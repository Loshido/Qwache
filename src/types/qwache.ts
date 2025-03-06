// allow you to cache some data until it is expired, and get fresh data using the callback.
// id: string <- data/resource identifier
// callback: () => Promise<T> <- the callback to get fresh data
// ttl: number <- time to live in seconds
export type Caching = <T>(id: string, callback: () => Promise<T>, ttl: number) => Promise<T>;
    
export interface CacheDriver {
    get: <T>(id: string) => Promise<T | undefined>,
    set: <T>(id: string, data: T) => Promise<void>,
    list: () => Promise<string[]>
}