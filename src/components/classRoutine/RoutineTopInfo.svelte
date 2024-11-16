<script lang="ts">
    import { progamRoutineData } from '$lib/stores/classRoutineStore';
    import { showQueryBox } from '$lib/stores/commonStore';

    let isMaximized: boolean = false;
    let toggleFormat: boolean = false;

    function handleClick() {
        showQueryBox.update((val) => !val);
        isMaximized = !isMaximized;
    }

    $: routineInfo = $progamRoutineData.routineTopInfo;

    function handleCenterClick() {
        toggleFormat = !toggleFormat;
    }

    // https://svelte.dev/docs/svelte/compiler-warnings#a11y_click_events_have_key_events
    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            handleCenterClick();
        }
    }
</script>

<div
    id="routine-top-info"
    class="flex w-full flex-row items-center justify-between rounded-t-none border border-x-0 bg-gray-50 py-2 text-sm sm:rounded-t-md sm:border-x md:py-4 md:text-base dark:border-gray-600 dark:bg-zinc-900"
>
    <div class="ml-2 grow basis-20 items-center md:basis-12">{routineInfo.program}</div>

    <div class="grow items-center">
        <span
            class="rounded-md bg-gray-200 p-1 text-center md:p-2 dark:bg-zinc-800"
            role="button"
            on:click={handleCenterClick}
            on:keypress={handleKeyPress}
            tabindex="0"
        >
            {#if toggleFormat}
                {routineInfo.semester} | {routineInfo.intake}/{routineInfo.section}
            {:else}
                {routineInfo.intake}/{routineInfo.section} | {routineInfo.semester}
            {/if}
        </span>
    </div>

    <div class="items-center" id="print-btn">
        <button aria-label="print button" on:click={() => window.print()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-gray-800 md:h-6 md:w-6 dark:text-white"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
            </svg>
        </button>
    </div>
    <div class="ml-2 mr-2 items-center" id="max-btn">
        <button class="w-full" on:click={handleClick} aria-label="maximize button">
            {#if isMaximized}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-4 w-4 text-gray-800 md:h-6 md:w-6 dark:text-white"
                >
                    <path
                        d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-4 w-4 text-gray-800 md:h-6 md:w-6 dark:text-white"
                >
                    <path
                        d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z"
                    />
                </svg>
            {/if}
        </button>
    </div>
</div>

<style lang="css">
    @media print {
        #print-btn,
        #max-btn {
            visibility: hidden;
        }

        #routine-top-info {
            border-radius: 0;
        }
    }
</style>
