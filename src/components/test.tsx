import { component$ } from "@builder.io/qwik";
import { useSignal, useTask$ } from "@builder.io/qwik";
import { createCache, createMemoryCachee } from "~/index";

const cacheFn = createCache(
    createMemoryCachee()
);

export default component$(() => {

    const data = useSignal<number>();
    useTask$(async () => {
        data.value = await cacheFn<number>('data', async () => {
            return Math.random()
        }, 10)
    })

    return <>
        cache: { data.value }
    </>
})