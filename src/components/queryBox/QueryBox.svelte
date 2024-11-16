<script lang="ts">
    export let title;
</script>

<div
    id="query-box"
    class="relative z-40 mx-auto mt-4 max-w-5xl border border-x-0 border-gray-200 bg-gray-50 p-4 text-center text-gray-800 shadow-md sm:border-x md:mt-0 md:rounded-lg dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-50"
>
    <span
        class="rounded-lg bg-gray-200 p-1 text-xl text-gray-800 md:text-2xl dark:bg-zinc-700 dark:text-gray-50"
        >{title}</span
    >
    <div class="mt-4 flex flex-col flex-wrap gap-2 md:flex-row">
        <slot></slot>
    </div>
</div>
