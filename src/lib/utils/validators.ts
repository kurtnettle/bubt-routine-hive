import { isMenuOpen, queryBoxInputData } from '$lib/stores/classRoutineStore';
import { errorResp, hasError } from '$lib/stores/commonStore';

import { defaultErrorResp } from '$lib/stores/defaults';
import type { ErrorResponse } from '$lib/types';

export function isValidUrl(url: string): boolean {
    let hasErr = false;
    const errorRsp: ErrorResponse = { ...defaultErrorResp };

    if (url.endsWith('pdf')) {
        errorRsp.message = 'PDF file is not supported.';
        hasErr = true;
    } else if (url.endsWith('docx') || url.endsWith('doc')) {
        errorRsp.message = 'DOC file is not supported.';
        hasErr = true;
    }

    if (hasErr) {
        hasError.set(true);
        errorResp.set(errorRsp);
        isMenuOpen.update((currentState) => ({ ...currentState, program: false }));
        queryBoxInputData.update((data) => {
            data.program_url = url;
            return data;
        });
        return false;
    } else {
        hasError.set(false);
    }
    return true;
}
