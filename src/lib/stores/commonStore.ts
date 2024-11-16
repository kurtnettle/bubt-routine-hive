import type { ErrorResponse } from '$lib/types';
import { type Writable, writable } from 'svelte/store';
import { defaultErrorResp } from './defaults';

export const routineHtmlForPreview: Writable<string> = writable('');

export class QueryBoxInputData {
    program_url: string = '';
    intake: string = '';
    section: string = '';
    course: string = '';
}

export class IntakeData {
    intake: string = '';
    sections: string[] = [];
}

export const showQueryBox: Writable<boolean> = writable(false);
export const isLoading: Writable<boolean> = writable(true);
export const loadingMsg: Writable<string> = writable('Retrieving Program List from BUBT');

export const hasError: Writable<boolean> = writable(false);
export const errorResp: Writable<ErrorResponse> = writable(defaultErrorResp);

export const programsList: Writable<{ name: string; url: string }[]> = writable<
    { name: string; url: string }[]
>([]);
