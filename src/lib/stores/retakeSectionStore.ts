import type { ProgramRoutineData } from '$lib/types';
import { writable, type Writable } from 'svelte/store';
import { defaultProgramRoutineData } from './defaults';
import { IntakeData, QueryBoxInputData } from './commonStore';

export const routineHtml: Writable<string> = writable('');

export const intakeList = writable<{ [intake: string]: { section: number[] } }[]>([]);
export const sectionList = writable([]);
export const courseList = writable([]);

export const isMenuOpen: Writable<{ [key: string]: boolean }> = writable({
    program: false,
    intake: false,
    section: false,
    course: false
});

export const routineData = writable([]);

export const rtnData = writable([]);
export const matData = writable([]);
export const mergedCourses = writable([]);
export const currPeriods = writable([]);
export const currRtnData = writable([]);

export class RoutineData {
    intakes: IntakeData[] = [];
    html: string = '';
    routineData: ProgramRoutineData = defaultProgramRoutineData;
}

export const queryBoxInputData = writable(new QueryBoxInputData());

export function resetState() {
    intakeList.set([]);
    routineData.set([]);
    sectionList.set([]);
    courseList.set([]);
    queryBoxInputData.set({ program_url: '', intake: '', section: '', course: '' });
}
