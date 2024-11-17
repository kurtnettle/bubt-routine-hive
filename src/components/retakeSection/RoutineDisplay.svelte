<script lang="ts">
    import { getNearestPeriod } from '$lib/utils/retakeSectionUtils';

    export let routine: any;
    export let matrix: boolean[][];

    function getGap(dayNo: number, pIdx: any) {
        try {
            const gap = getNearestPeriod(matrix[dayNo], pIdx);
            if (gap === pIdx) return 0;
            else if (gap) return Math.abs(gap - pIdx);
        } catch (error) {
            console.debug(matrix);
            console.error(`failed to get nearest period:`, error);
            return -9;
        }
    }

    const DidxToName = {
        1: 'FRI',
        2: 'SAT',
        3: 'SUN',
        4: 'MON',
        5: 'TUE',
        6: 'WED',
        7: 'THR'
    };

    function getBgColor(val: any, val1: any) {
        const pGap = getGap(val, val1);

        switch (pGap) {
            case 0:
                return 'bg-red-200 dark:bg-red-900';
            case 1:
            case -1:
                return 'bg-green-200 dark:bg-green-900';
            case 2:
                return 'bg-yellow-200 dark:bg-yellow-900';
            case 3:
                return 'bg-orange-200 dark:bg-orange-900';
            default:
                return 'bg-gray-200 dark:bg-zinc-800';
        }
    }
</script>

<tr>
    <td colspan="5">
        <div class="m-1 items-center py-2 text-center font-sans font-semibold md:m-2 md:text-base">
            <span
                class="rounded-md border border-gray-200 bg-gray-100 p-1 md:p-2 dark:border-zinc-900 dark:bg-zinc-800"
            >
                {routine.meta.intake}/{routine.meta.section} | {routine.periods[0].code} ({routine
                    .periods[0].faculty})
            </span>
        </div>
    </td>
</tr>

{#each routine.periods as period, index}
    <tr>
        <td>
            <div
                class={`ml-1 rounded rounded-br-none rounded-tr-none border border-r-0 border-gray-200 md:ml-2 dark:border-zinc-900 ${getBgColor(period.dayNo - 1, period.periodNo - 1)}`}
                class:rounded-tl-none={index === routine.periods.length - 1}
                class:rounded-bl-none={index === 0}
                class:border-b-none={index !== routine.periods.length - 1}
            >
                <div class="py-2">
                    {DidxToName[period.dayNo]}
                </div>
            </div>
        </td>

        <td>
            <div
                class={`border border-x-0 border-gray-200 dark:border-zinc-900 ${getBgColor(period.dayNo - 1, period.periodNo - 1)}`}
                class:border-b-none={index !== routine.periods.length - 1}
            >
                <div class="py-2">
                    {period.periodNo}
                </div>
            </div>
        </td>

        <td>
            <div
                class={`border border-x-0 border-gray-200 dark:border-zinc-900 ${getBgColor(period.dayNo - 1, period.periodNo - 1)}`}
            >
                <div class="py-2">
                    {period.periodTime}
                </div>
            </div>
        </td>

        <td>
            <div
                class={`border border-x-0 border-gray-200 dark:border-zinc-900 ${getBgColor(period.dayNo - 1, period.periodNo - 1)}`}
                class:border-b-none={index !== routine.periods.length - 1}
            >
                <div class="py-2">
                    {period.building} / {period.room}
                </div>
            </div>
        </td>

        <td>
            <div
                class={`mr-1 rounded rounded-bl-none rounded-tl-none border border-l-0 border-gray-200 md:mr-2 dark:border-zinc-900 ${getBgColor(period.dayNo - 1, period.periodNo - 1)}`}
                class:rounded-tr-none={index === routine.periods.length - 1}
                class:rounded-br-none={index === 0}
                class:border-b-none={index !== routine.periods.length - 1}
            >
                <div class="py-2">{getGap(period.dayNo - 1, period.periodNo - 1)}</div>
            </div>
        </td>
    </tr>
{/each}
