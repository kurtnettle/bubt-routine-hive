<script lang="ts">
    import ClassRoutineDetails from './ClassRoutineDetails.svelte';
    import { showQueryBox } from '$lib/stores/commonStore';
    import { progamRoutineData } from '$lib/stores/classRoutineStore';
    import RoutineTopInfo from './RoutineTopInfo.svelte';

    let routineBox: HTMLElement;
    let routineRows: string[][] = [];

    $: routineRows = $progamRoutineData.routine;
    $: routineInfoRows = $progamRoutineData.routineDetails;
</script>

<div
    class="mx-auto mt-4 max-w-5xl"
    class:hidden={$progamRoutineData.routine[0].length === 0}
    id="routine-outter-box"
>
    <div class="shadow-lg md:rounded-lg dark:text-gray-200" id="class-routine-table-box">
        <RoutineTopInfo />
        <div
            class="overflow-y-auto"
            bind:this={routineBox}
            class:max-h-full={!$showQueryBox}
            class:max-h-[60vh]={$showQueryBox}
        >
            <div
                class="overflow-auto border border-x-0 border-t-0 border-gray-200 shadow-sm sm:border-x md:rounded-lg md:rounded-t-none dark:border-gray-600"
            >
                <table class="min-w-max text-center font-serif text-xs md:min-w-0 md:text-sm">
                    <thead class="sticky top-0 z-20 bg-slate-100 font-semibold dark:bg-transparent">
                        <tr>
                            {#each Object.values(routineRows[0]) as cell, i}
                                <th
                                    class="border-b border-gray-300 px-2 py-3 dark:border-gray-700 dark:bg-[#212125] dark:text-gray-200"
                                    class:bg-slate-100={i === 0}
                                    class:border-r={i < routineRows[0].length - 1}
                                    class:sticky={i === 0}
                                    class:left-0={i === 0}
                                >
                                    {@html cell}
                                </th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each routineRows as row, idx}
                            {#if idx > 0}
                                <tr
                                    class="border-gray-300 transition duration-200 dark:border-gray-700"
                                    class:border-b={idx < routineRows.length - 1}
                                >
                                    {#each Object.values(row) as cell, i}
                                        <td
                                            class="border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-{i ===
                                            0
                                                ? '[#212125]'
                                                : 'zinc-900'}"
                                            class:bg-slate-100={i === 0}
                                            class:border-r={i < row.length - 1}
                                            class:sticky={i === 0}
                                            class:left-0={i === 0}
                                            class:z-10={i === 0}
                                            class:font-semibold={i === 0}
                                        >
                                            {@html cell}
                                        </td>
                                    {/each}
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
            <ClassRoutineDetails {routineInfoRows} />
        </div>
    </div>
</div>

<style lang="css">
    @media print {
        #class-routine-table-box {
            visibility: visible;
            position: absolute;
            box-shadow: none;
            left: 0;
            top: 0;
        }

        #class-routine-table-box .overflow-y-auto {
            overflow: hidden;
        }
    }
</style>
