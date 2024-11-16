<script lang="ts">
    import { onMount } from 'svelte';
    import RetakeSectionBox from '../../components/retakeSection/RetakeSectionBox.svelte';
    import RetakeSectionQueryBox from '../../components/retakeSection/RetakeSectionQueryBox.svelte';
    import fetchData from '$lib/utils/fetchUtils';
    import { errorResp, hasError, isLoading, showQueryBox } from '$lib/stores/commonStore';
    import { programsList } from '$lib/stores/commonStore';
    import { getProgramList } from '$lib/utils/tableUtils';
    import LoadingBox from '../../components/utils/LoadingBox.svelte';
    import ErrorBox from '../../components/utils/ErrorBox.svelte';
    import { PUBLIC_BUBT_ROUTINE_URL, PUBLIC_PROXY_URL } from '$env/static/public';

    const title = 'Retake Section';

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
        <RetakeSectionQueryBox />
    {/if}
    {#if $isLoading}
        <LoadingBox />
    {:else if $hasError}
        <ErrorBox />
    {:else}
        <RetakeSectionBox />
    {/if}
</main>
