<script lang="ts">
    import { type Writable } from 'svelte/store';

    export let label: string;
    export let isMenuOpen: Writable<{ [key: string]: boolean }>;

    let isOpen: boolean;

    let dropdownId: string = label.toLocaleLowerCase();
    $: {
        isOpen = $isMenuOpen[dropdownId];
    }

    function toggleMenu() {
        isMenuOpen.update((currentState) => ({
            ...currentState,
            [dropdownId]: !currentState[dropdownId]
        }));
    }

    const handleDropdownFocusLoss = (event: FocusEvent) => {
        const { relatedTarget, currentTarget } = event;
        if (
            currentTarget instanceof HTMLElement &&
            relatedTarget instanceof HTMLElement &&
            currentTarget.contains(relatedTarget)
        ) {
            return;
        }

        isMenuOpen.update((currentState) => ({
            ...currentState,
            [dropdownId]: false
        }));
    };
</script>

<div class="relative w-full flex-auto text-left md:w-0" on:focusout={handleDropdownFocusLoss}>
    <button
        on:click={toggleMenu}
        type="button"
        class="inline-flex w-full justify-center gap-x-1 rounded-md bg-gray-50 p-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-100 md:gap-x-1.5 md:p-4 dark:bg-zinc-900 dark:text-gray-50 dark:ring-gray-600 dark:hover:bg-zinc-800 dark:hover:text-gray-100"
        id="menu-button"
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
    >
        {label}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="-mr-1 h-5 w-5 transition"
            class:rotate-90={isOpen}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
            />
        </svg>
    </button>

    <div
        class="absolute z-10 mt-2 w-full origin-top-right transform rounded-md text-center shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        class:opacity-100={isOpen}
        class:opacity-0={!isOpen}
        class:max-h-64={isOpen}
        class:max-h-0={!isOpen}
        class:overflow-y-auto={isOpen}
        class:overflow-hidden={!isOpen}
    >
        <ul class="py-1" role="none">
            <slot></slot>
        </ul>
    </div>
</div>
