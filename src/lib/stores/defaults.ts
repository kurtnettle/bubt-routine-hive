import type { ErrorResponse, ProgramRoutineData, routineTopInfo } from '$lib/types';

export const defaultErrorResp: ErrorResponse = {
    status: 500,
    message: 'Something went wrong.',
    error: 'Unknown error'
};

export const defaultRoutineTopInfo: routineTopInfo = {
    intake: '',
    section: '',
    program: '',
    semester: ''
};

export const defaultProgramRoutineData: ProgramRoutineData = {
    routine: [[]],
    routineDetails: [[]],
    routineTopInfo: defaultRoutineTopInfo
};
