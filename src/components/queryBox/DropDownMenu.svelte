<script lang="ts">
    export let items: any;
    export let onItemClick: (value: any) => void;
    export let isItemActive: (value: any) => boolean;
</script>

{#each Object.entries(items) as item}
    <li
        class="block px-4 py-2 text-sm transition-all hover:bg-gray-200 dark:hover:bg-zinc-700"
        class:dark:bg-zinc-700={isItemActive(item)}
        class:bg-gray-200={isItemActive(item)}
        class:dark:bg-zinc-800={!isItemActive(item)}
        class:bg-gray-100={!isItemActive(item)}
        role="menuitem"
        tabindex="0"
        on:click={() => onItemClick(item)}
        on:keydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                onItemClick(item);
            }
        }}
    >
        {#if typeof item === 'object'}
            {#if item[1].name}
                {item[1].name}
            {:else if item[1].section}
                {item[0]}
            {:else}
                {item[1]}
            {/if}
        {:else}
            {item}
        {/if}
    </li>
{/each}
