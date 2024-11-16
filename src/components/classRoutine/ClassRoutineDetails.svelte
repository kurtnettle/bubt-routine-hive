<script lang="ts">
    export let routineInfoRows;
</script>

<div
    id="class-routine-details"
    class="mb-2 mt-4 max-w-fit overflow-x-auto border border-x-0 border-gray-200 bg-gray-50 shadow-sm sm:rounded-lg sm:border-x dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200"
>
    <table class="min-w-max text-left font-serif text-xs md:min-w-0 md:text-sm">
        <thead class="sticky top-0 bg-blue-300 dark:border-gray-700 dark:bg-[#035abd4b]">
            <tr class="text-center">
                {#each Object.values(routineInfoRows[0]) as cell, i}
                    <th
                        class="border-b border-gray-300 bg-blue-300 px-2 py-3 dark:border-gray-600 dark:bg-[#1e293b]"
                        class:border-r={i < routineInfoRows[0].length - 1}
                        class:left-0={i === 0}
                        class:sticky={i === 0}
                    >
                        {cell}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each routineInfoRows as row, idx}
                {#if idx > 0}
                    <tr
                        class="border-gray-300 transition duration-200 dark:border-gray-600"
                        class:border-b={idx < routineInfoRows.length - 1}
                    >
                        {#each Object.values(row) as cell, i}
                            <td
                                class:border-r={i < row.length - 1}
                                class="border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-zinc-900"
                                class:left-0={i === 0}
                                class:sticky={i === 0}
                            >
                                {cell}
                            </td>
                        {/each}
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style lang="css">
    @media print {
        #class-routine-details {
            border-radius: 0;
        }
    }
</style>
