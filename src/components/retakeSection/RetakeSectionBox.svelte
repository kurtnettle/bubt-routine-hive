<script lang="ts">
    import { mergedCourses, queryBoxInputData, routineData } from '$lib/stores/retakeSectionStore';
    import { buildPnoDnoArray, getPeriodsByCourseCode } from '$lib/utils/retakeSectionUtils';
    import RoutineDisplay from './RoutineDisplay.svelte';

    const headers = ['Day', 'Period', 'Time', 'Room', 'Gap'];

    let rtnData: any;
    let currInk: any;
    let currSec: any;
    let sections: any;
    let matrix: any;
    let mgdData: any;

    $: {
        currSec = $queryBoxInputData.section;
        currInk = $queryBoxInputData.intake;
        mgdData = $mergedCourses;

        rtnData = $routineData;

        const selectedRoutine = rtnData.find(
            (x) => currInk === x.meta.intake && currSec === x.meta.section
        );

        if (selectedRoutine) {
            matrix = buildPnoDnoArray(selectedRoutine.periods);
            sections = getPeriodsByCourseCode(mgdData, $queryBoxInputData.course);
        }
    }
</script>

{#if sections && sections.length > 0}
    <div class="mx-auto mt-4 max-w-5xl">
        <div class="max-h-[65vh] overflow-y-auto">
            <div
                class="overflow-x-auto border border-x-0 border-gray-200 bg-gray-50 shadow-md md:rounded-lg md:border-x dark:border-gray-600 dark:bg-zinc-900 dark:text-gray-200"
            >
                <table
                    cellpadding="0"
                    cellspacing="0"
                    class="min-w-full table-fixed border-separate border-spacing-0 border-none text-center text-xs md:min-w-full md:text-sm"
                >
                    <thead class="sticky top-0 z-20 bg-gray-100 font-semibold dark:bg-transparent">
                        <tr>
                            {#each headers as header}
                                <th
                                    class="border-b border-gray-300 px-4 py-4 md:px-8 dark:border-gray-700 dark:bg-[#212125] dark:text-gray-200"
                                >
                                    {header}
                                </th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each sections as section}
                            <RoutineDisplay routine={section} {matrix} />
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{/if}
