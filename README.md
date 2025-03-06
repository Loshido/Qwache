# Qwache

cache your data effortless using Qwik

```tsx
const data = useSignal<number>();
useTask$(async () => {
    // cache some data until it is expired, and get fresh data using the callback.

    data.value = await cache<number>( 
        'data', // cache identifier
        async () => { // callback to get fresh data
            return Math.random() 
        }, 
        10 // data expires after 10s
    ) 
})

return <>
    cache: { data.value }
</> 
```

## Create the cache fn

```ts
// use memory as a cache driver (default)
const cache = createCache(
    createMemoryCachee()
);
```

```ts
const cache = createCache(
    createMemoryCachee({
        get<T>(id: string): Promise<T | undefined> => {
            // gets data for a specific id
        },
        set<T>(id: string, data: T): Promise<void> => {
            // sets data for specific id
            // you don't have to handle ttl.
        },
        list(): Promise<string[]> => {
            // lists ids
        } 
    })
);
```