<script>
    import { goto } from '$app/navigation';
    import NavbarItems from './NavbarItems.svelte';

    let isOpen = false;
    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<p
class="rounded w-full bg-orange-400 py-1.5 text-center text-sm font-medium text-black dark:bg-orange-700 dark:text-white"
>
Website Under Maintenance, Sorry for the inconvinience.
</p>

<nav
    id="navbar"
    class="mx-auto flex max-w-5xl flex-wrap items-center border border-x-0 border-gray-200 bg-gray-50 text-gray-800 shadow-md sm:border-x sm:py-2 md:my-6 md:rounded-lg lg:my-8 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-50"
>
    <div class="flex w-full items-center justify-between">
        <a href="/">
            <span class="mx-2 p-2 text-xl font-semibold md:hidden">
                Routine<span class="text-blue-600 dark:text-blue-500">Hive</span>
            </span>
        </a>
        <button
            on:click={toggleMenu}
            aria-label="mobile menu"
            id="menu-button"
            class="rotate-{isOpen
                ? '90'
                : '0'} block rounded px-3 py-2 text-gray-800 transition hover:text-gray-600 focus:outline-none md:hidden dark:text-gray-50 dark:hover:text-gray-300"
        >
            <svg
                class="h-6 w-6 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </svg>
        </button>
    </div>
    <a href="/">
        <span class="hidden p-2 text-2xl font-semibold md:mx-2 md:block"
            >Routine<span class="text-blue-600 dark:text-blue-500">Hive</span></span
        >
    </a>
    <ul
        id="menu-items"
        class="{isOpen ? 'block' : 'hidden'} mx-2 flex-col md:ml-auto md:flex md:flex-row"
    >
        <NavbarItems />
    </ul>
</nav>
