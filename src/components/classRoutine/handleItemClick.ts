import { PUBLIC_PROXY_URL } from '$env/static/public';
import { errorResp, hasError, isLoading, loadingMsg, showQueryBox } from '$lib/stores/commonStore';
import {
    isMenuOpen,
    routineHtml,
    queryBoxInputData,
    resetState,
    progamRoutineData,
    intakeList,
    sectionList
} from '$lib/stores/classRoutineStore';
import fetchData from '$lib/utils/fetchUtils';
import { getIntakeSection, getProgramRoutine } from '$lib/utils/tableUtils';
import { isValidUrl } from '$lib/utils/validators';
import { get } from 'svelte/store';

export async function onProgramItemClick(program: any) {
    if (!isValidUrl(program[1].url)) return;

    showQueryBox.set(false);
    isLoading.set(true);

    isMenuOpen.update((currentState) => ({ ...currentState, program: false }));

    loadingMsg.set('Getting Your Routine, Hold on.');

    let proxyUrl = `${PUBLIC_PROXY_URL}?url=${btoa(program[1].url)}`;

    const resp = await fetchData(proxyUrl);
    if (resp.error) {
        hasError.set(true);
        errorResp.set(resp.error);
    }
    if (resp.html) {
        resetState();

        routineHtml.set(resp.html);
        intakeList.set(getIntakeSection(resp.html));

        queryBoxInputData.update((data) => {
            data.program_url = program[1].url;
            return data;
        });

        isMenuOpen.update((currentState) => ({
            ...currentState,
            intake: true
        }));
    }

    showQueryBox.set(true);
    isLoading.set(false);
}

export function onIntakeItemClick(intake: any) {
    sectionList.set(intake[1].section);

    isMenuOpen.update((currentState) => ({
        ...currentState,
        intake: false
    }));

    queryBoxInputData.update((data) => {
        data.intake = intake[0];
        data.section = '';
        return data;
    });

    isMenuOpen.update((currentState) => ({
        ...currentState,
        section: true
    }));
}

export function onSectionItemClick(section: string) {
    queryBoxInputData.update((data) => {
        data.section = section[1];
        return data;
    });

    isMenuOpen.update((currentState) => ({
        ...currentState,
        section: false
    }));

    const routineData = getProgramRoutine(
        get(routineHtml),
        get(queryBoxInputData).intake,
        get(queryBoxInputData).section
    );

    if (routineData != null) progamRoutineData.set(routineData);
}
