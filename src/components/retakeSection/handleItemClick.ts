import { PUBLIC_PROXY_URL } from '$env/static/public';
import { errorResp, hasError, isLoading, loadingMsg, showQueryBox } from '$lib/stores/commonStore';
import {
    isMenuOpen,
    queryBoxInputData,
    resetState,
    intakeList,
    sectionList,
    routineData,
    courseList,
    mergedCourses
} from '$lib/stores/retakeSectionStore';
import fetchData from '$lib/utils/fetchUtils';
import { getCourseList, mergeCoursePeriods, prepareRoutine } from '$lib/utils/retakeSectionUtils';
import { getIntakeSection } from '$lib/utils/tableUtils';
import { isValidUrl } from '$lib/utils/validators';

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
        intakeList.set(getIntakeSection(resp.html));
        routineData.set(prepareRoutine(resp.html));
        mergedCourses.set(mergeCoursePeriods(prepareRoutine(resp.html)));

        queryBoxInputData.update((data) => {
            data.program_url = program[1].url;
            data.intake = '';
            data.section = '';
            data.course = '';
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
        data.course = '';
        return data;
    });

    isMenuOpen.update((currentState) => ({
        ...currentState,
        section: true
    }));

    courseList.set(getCourseList());
}

export function onSectionItemClick(section: string) {
    queryBoxInputData.update((data) => {
        data.section = section[1];
        return data;
    });

    isMenuOpen.update((currentState) => ({
        ...currentState,
        section: false,
        course: true
    }));
}

export function onCourseItemClick(course: string) {
    // if (course.length == 2) course = course[1];

    queryBoxInputData.update((data) => {
        data.course = course[1];
        return data;
    });

    isMenuOpen.update((currentState) => ({
        ...currentState,
        course: false
    }));
}
