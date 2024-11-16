<script lang="ts">
    import { loadingMsg } from '$lib/stores/commonStore';
</script>

<div class="flex min-h-[60vh] items-center justify-center md:min-h-[70vh]">
    <div
        class="mx-auto mt-4 max-w-5xl p-4 text-center text-gray-800 md:mt-0 md:rounded-lg dark:text-gray-50"
    >
        <div class="mx-auto mb-4 text-xl">{$loadingMsg}</div>
        <div class="loader w-full"></div>
    </div>
</div>

<!-- credit: #16 https://css-loaders.com/progress/ -->
<style>
    .loader {
        height: 4px;
        --c: no-repeat linear-gradient(rgb(37, 99, 235) 0 0);
        background: var(--c), var(--c), rgb(219 234 254);
        background-size: 60% 100%;
        animation: l16 3s infinite;
    }

    @media (prefers-color-scheme: dark) {
        .loader {
            --c: no-repeat linear-gradient(rgb(29, 78, 216) 0 0);
            background: var(--c), var(--c), #1e293b;
            background-size: 60% 100%;
            animation: l16 3s infinite;
        }
    }

    @keyframes l16 {
        0% {
            background-position:
                -150% 0,
                -150% 0;
        }
        66% {
            background-position:
                250% 0,
                -150% 0;
        }
        100% {
            background-position:
                250% 0,
                250% 0;
        }
    }
</style>
