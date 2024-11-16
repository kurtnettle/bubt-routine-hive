import type { ProgramRoutineData } from '$lib/types';
import { writable, type Writable } from 'svelte/store';
import { defaultProgramRoutineData } from './defaults';
import { QueryBoxInputData, type IntakeData } from './commonStore';

export const progamRoutineData: Writable<ProgramRoutineData> = writable(defaultProgramRoutineData);
export const progamRoutineHtml: Writable<string[][]> = writable([]);
export const routineHtml: Writable<string> = writable('');

export const intakeList = writable<{ [intake: string]: { section: number[] } }[]>([]);
export const sectionList = writable([]);

export const isMenuOpen: Writable<{ [key: string]: boolean }> = writable({
    program: false,
    intake: false,
    section: false
});

export class RoutineData {
    intakes: IntakeData[] = [];
    html: string = '';
    routineData: ProgramRoutineData = defaultProgramRoutineData;
}

export const queryBoxInputData = writable(new QueryBoxInputData());

export function resetState(): void {
    progamRoutineData.set(defaultProgramRoutineData);
    routineHtml.set('');
    sectionList.set([]);
    queryBoxInputData.set({ program_url: '', intake: '', section: '', course: '' });
}
