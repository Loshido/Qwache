# Qwache

It provides hooks to deliver and cache data seamlessly.

#### *Concrete example*
```tsx
const data = useSignal<number>();
useTask$(async () => {
    // its use cache as long as the data is not expired, then it pulls data.

    data.value = await cache<number>( 
        'data', // cache identifier
        async () => { // callback to get fresh data
            return Math.random() 
        }, 
        10 * 1000 // data expires after 10s from now. (1h by default)
    ) 
})

return <>
    cache: { data.value }
</> 
```

### Install

`bun install qwache`

## How it works

The objective of Qwache is to be compatible with any caching mechanism.
In that way, it **only** provides a function builder which needs a driver to handle how data is stored and delivered.

Qwache provides by default a memory driver to handle cache (It uses a Map object).

### Create cache function

```ts
// use memory as a cache driver (default)
const cache = createCache(
    createMemoryCachee()
);
```

```ts
// create your own driver
const cache = createCache({
    get<T>(id: string): Promise<T | undefined>=> {
        // gets data for a specific id
    },
    set<T>(id: string, data: T): Promise<void>=> {
        // sets data for specific id
        // you don't have to handle ttl.
    },
    list(): Promise<string[]> => {
        // lists ids
    }
});
```