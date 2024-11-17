import { parse, HTMLElement } from 'node-html-parser';
import { parseIntakeSectionSemester } from './tableUtils';
import type { routineTopInfo } from '$lib/types';
import { get } from 'svelte/store';
import { routineData, queryBoxInputData } from '$lib/stores/retakeSectionStore';

export interface routineData {
    meta: routineTopInfo;
    periods: periodInfo[];
}

interface periodInfo {
    dayNo: number;
    periodNo: number;
    periodTime: string;
    code: string;
    faculty: string | undefined;
    building: number;
    room: number;
}

export function parseCellContent(elem: HTMLElement): periodInfo | undefined {
    const strongs = elem.querySelectorAll('strong');
    if (strongs[0].text.trim() === '') return undefined;

    return {
        periodNo: -1,
        dayNo: -1,
        periodTime: '',
        code: strongs[0].text.trim(),
        faculty: strongs[1].nextSibling?.text.trim() || '-1',
        building:
            parseInt(strongs[2].nextSibling?.rawText.replace('&rArr;', '').trim() || '0', 10) || -1,
        room: parseInt(strongs[3].nextSibling?.text.trim() || '0', 10) || -1
    };
}

export function prepareRoutine(html: string): routineData[] {
    const routineData: routineData[] = [];
    const routineTables = parse(html).querySelectorAll('table#HdtableRtn');

    for (let routineTable of routineTables) {
        const centerCells = routineTable.querySelectorAll('tr:nth-child(2) td');
        const meta = parseIntakeSectionSemester(centerCells);
        if (!meta) continue;

        let days = routineTable.nextElementSibling?.querySelectorAll('tr');
        if (!days) continue;

        let pTime = days[0].querySelectorAll('th');

        let periodData = [];
        for (const [dayIndex, day] of days.entries()) {
            const rowData: periodInfo[] = [];
            const periods = day.querySelectorAll('td');
            for (const [periodIndex, periodElem] of periods.entries()) {
                if (periodElem.text.trim() !== '') {
                    let pInfo = parseCellContent(periodElem);
                    if (!pInfo) continue;

                    pInfo.periodNo = periodIndex + 1;
                    pInfo.dayNo = dayIndex + 1;
                    pInfo.periodTime = pTime[periodIndex + 1].text.trim();
                    rowData.push(pInfo);
                }
            }
            if (rowData.length) periodData.push(rowData);
        }

        routineData.push({
            meta: meta,
            periods: periodData
        });
    }
    return routineData;
}

export function getCourseList() {
    let data = get(routineData);
    const currIntk = parseInt(get(queryBoxInputData).intake, 10);

    let courses = new Set();
    for (let x of data) {
        const intk = parseInt(x.meta.intake, 10);
        if (intk <= currIntk) continue;

        for (let d of x.periods) {
            for (let q of d) {
                courses.add(q.code);
            }
        }
    }

    return Array.from(courses).sort((a, b) => {
        const [prefixA, numA] = [
            a.slice(0, a.indexOf(' ')),
            parseInt(a.slice(a.indexOf(' ') + 1), 10)
        ];
        const [prefixB, numB] = [
            b.slice(0, b.indexOf(' ')),
            parseInt(b.slice(b.indexOf(' ') + 1), 10)
        ];

        if (prefixA < prefixB) return -1;
        if (prefixA > prefixB) return 1;

        return numA - numB;
    });
}

export function mergeCoursePeriods(routines: routineData[]) {
    const data: any = [];

    routines.forEach((routine) => {
        const mergedDay: Record<string, periodInfo[]> = {};

        routine.periods.forEach((periods) => {
            periods.forEach((period) => {
                if (!mergedDay[period.code]) {
                    mergedDay[period.code] = [];
                }
                mergedDay[period.code].push(period);
            });
        });

        data.push({
            meta: routine.meta,
            courses: mergedDay
        });
    });

    return data;
}

export function getPeriodsByCourseCode(
    routines: routineData[],
    courseCode: string
): { meta: routineTopInfo; periods: periodInfo[] }[] {
    const data: { meta: routineTopInfo; periods: periodInfo[] }[] = [];

    routines.forEach((routine) => {
        if (routine.courses[courseCode]) {
            data.push({
                meta: routine.meta,
                periods: routine.courses[courseCode]
            });
        }
    });

    return data;
}

export function buildPnoDnoArray(data: any) {
    const pairs = new Set<string>();
    const matrix = Array.from({ length: 9 }, () => Array(9).fill(false));

    let { maxPeriodNo, maxDayNo } = data.reduce(
        (acc, dayArray) => {
            dayArray.forEach((entry) => {
                pairs.add(`${entry.periodNo}-${entry.dayNo}`);
                // acc.maxPeriodNo = Math.max(acc.maxPeriodNo, entry.periodNo);
                // acc.maxDayNo = Math.max(acc.maxDayNo, entry.dayNo);
            });
            return acc;
        },
        { maxPeriodNo: 0, maxDayNo: 0 }
    );

    /* TODO: investigate further about the dynamic matrix error.
    dynamic mat was throwing error in some scenario. My guess is the matrix 
    gets smaller in some cases than the user's current routine.
    for example: if a user got day no 7 and the mat's highest day is 6, 
    so it will return undefined when accessed.

    */
    // let matrix = Array.from({ length: maxDayNo }, () => Array(maxPeriodNo).fill(false));

    pairs.forEach((pair) => {
        const [period, day] = pair.split('-').map(Number);
        matrix[day - 1][period - 1] = true;
    });

    return matrix;
}

export function getNearestPeriod(periods: boolean[], pIdx: number) {
    let nearest = -1;
    let minDistance = Infinity;

    for (let i = 0; i < periods.length; i++) {
        if (periods[i]) {
            const distance = Math.abs(i - pIdx);

            if (distance < minDistance) {
                minDistance = distance;
                nearest = i;
            }
        }
    }

    return nearest;
}
