export interface ErrorResponse {
    status: number;
    message: string;
    error: string | null;
}

export interface FetchResult {
    html: string | null;
    error: {
        status: number;
        message: string;
        error: string | null;
    } | null;
}

export interface routineTopInfo {
    program: string;
    intake: string;
    section: string;
    semester: string;
}

export interface ProgramRoutineData {
    routine: string[][];
    routineDetails: string[][];
    routineTopInfo: routineTopInfo;
}
