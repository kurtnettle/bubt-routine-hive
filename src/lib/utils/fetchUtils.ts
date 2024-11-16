import type { FetchResult } from '../types';

const fetchData = async (url: string, timeoutDuration: number = 30000): Promise<FetchResult> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
            console.error(res);
            return {
                html: null,
                error: {
                    status: res.status,
                    message: `Failed To Get Your Program Routine`,
                    error: res.statusText
                }
            };
        }

        const html = await res.text();
        return { html, error: null };
    } catch (err: unknown) {
        console.error(err);

        let errorMessage = 'An unexpected error occurred.';
        let errorDetails: string | null = null;
        let errorStatus = 500;

        const error = err as Error;
        if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
            errorMessage = 'Unable to reach the server.';
            errorDetails = error.message;
            errorStatus = 503;
        } else if (error instanceof DOMException && error.name === 'AbortError') {
            errorMessage = 'The request timed out. Please try again later.';
            errorDetails = error.message;
            errorStatus = 408;
        } else if (error instanceof Error) {
            errorMessage = error.message || errorMessage;
            errorDetails = error.stack || error.message;
        }

        return {
            html: null,
            error: { status: errorStatus, message: errorMessage, error: errorDetails }
        };
    } finally {
        clearTimeout(timeoutId);
    }
};

export default fetchData;
