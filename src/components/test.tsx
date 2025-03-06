import { component$ } from "@builder.io/qwik";
import { useSignal, useTask$ } from "@builder.io/qwik";
import { createCache } from "~/index";

const cache = createCache();

export default component$(() => {

    const data = useSignal<number>();
    useTask$(async () => {
        data.value = await cache<number>('data', async () => {
            return Math.random()
        }, 10)
    })

    return <>
        cache: { data.value }
    </>
})