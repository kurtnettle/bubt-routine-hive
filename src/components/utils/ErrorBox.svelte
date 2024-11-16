<script lang="ts">
    import { errorResp } from '$lib/stores/commonStore';
</script>

<div class="flex min-h-[50vh] items-center justify-center">
    <div
        class="mx-auto mt-4 max-w-5xl p-4 text-center text-sm text-gray-800 md:mt-0 md:rounded-lg md:text-xl dark:text-gray-50"
    >
        <img
            class="mx-auto mb-4 h-24 w-24 md:h-32 md:w-32"
            src="/error.png"
            alt="An error occurred."
        />
        <span>{$errorResp.status}</span>
        <br />
        <span>{$errorResp.message}</span>
    </div>
</div>
