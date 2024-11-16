<script lang="ts">
    import { onMount } from 'svelte';
    import ClassRoutineBox from '../../components/classRoutine/ClassRoutineBox.svelte';
    import { getProgramList } from '$lib/utils/tableUtils';
    import ErrorBox from '../../components/utils/ErrorBox.svelte';
    import fetchData from '$lib/utils/fetchUtils';
    import LoadingBox from '../../components/utils/LoadingBox.svelte';
    import ClassRoutineQueryBox from '../../components/classRoutine/ClassRoutineQueryBox.svelte';

    import { errorResp, hasError, isLoading, showQueryBox } from '$lib/stores/commonStore';
    import { programsList } from '$lib/stores/commonStore';
    import { PUBLIC_BUBT_ROUTINE_URL, PUBLIC_PROXY_URL } from '$env/static/public';

    const title = 'Class Routine';

    onMount(async () => {
        let resp = await fetchData(`${PUBLIC_PROXY_URL}?url=${btoa(PUBLIC_BUBT_ROUTINE_URL)}`);
        if (resp.error) {
            hasError.set(true);
            errorResp.set(resp.error);
        }

        if (resp.html) {
            showQueryBox.set(true);
            programsList.set(getProgramList(resp.html));
        }

        isLoading.set(false);
    });
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    {#if $showQueryBox}
        <ClassRoutineQueryBox />
    {/if}
    {#if $isLoading}
        <LoadingBox />
    {:else if $hasError}
        <ErrorBox />
    {:else}
        <ClassRoutineBox />
    {/if}
</main>

<style lang="css">
    @media print {
        @page {
            size: auto;
            margin: 0;
        }

        :global(body) {
            visibility: hidden;
        }
    }
</style>
