import { parse, HTMLElement } from 'node-html-parser';
import { type ProgramRoutineData, type routineTopInfo } from '$lib/types';

interface ProgramRoutineHtml {
    topInfo?: routineTopInfo;
    routine?: string;
    info?: string;
}

export function getProgramList(html: string) {
    const programs: { name: string; url: string }[] = [];

    const rows: HTMLElement[] = parse(html).querySelectorAll('div#accordionClassRoutine tbody tr');
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) return;

        const name = cells[1].textContent.trim();
        const viewUrl = cells[2].querySelector('a.btn.btn-primary')?.getAttribute('href') || '';
        if (!viewUrl) return;

        programs.push({ name: name, url: viewUrl });
    });

    return programs;
}

export function parseIntakeSectionSemester(cells: HTMLElement[]): routineTopInfo | null {
    if (cells.length !== 3) {
        console.error(`Expected 3 cells, but found ${cells.length}`);
        return null;
    }

    const program = cells[0].textContent.replaceAll('Program:', '').trim();
    const semester = cells[2].textContent.replaceAll('Semester:', '').trim();
    const centerCell = cells[1].textContent.replaceAll('Intake:', '').trim().split('-');

    if (centerCell.length === 2) {
        return {
            program: program,
            intake: centerCell[0].trim(),
            section: centerCell[1].trim(),
            semester: semester
        };
    } else {
        console.error(`Failed to parse intake-section from ${cells[1].textContent}`);
        return null;
    }
}

export function getIntakeSection(html: string) {
    const intakeSections: { [intake: string]: { section: number[] } }[] = [];

    const tables: HTMLElement[] = parse(html).querySelectorAll('table#HdtableRtn');
    tables.forEach((table) => {
        const cells = table.querySelectorAll('tr:nth-child(2) td');
        const parsed = parseIntakeSectionSemester(cells);
        if (!parsed) return;

        if (!intakeSections[parsed.intake]) {
            intakeSections[parsed.intake] = { section: [parsed.section] };
        } else {
            intakeSections[parsed.intake].section.push(parsed.section);
        }
    });

    return intakeSections;
}

export function getProgramRoutineHtml(html: string, intake: string, section: string) {
    const data: ProgramRoutineHtml = {};
    let routineTopInfo;

    const tables: HTMLElement[] = parse(html).querySelectorAll('table#HdtableRtn');
    const table = tables.find((table) => {
        const cells = table.querySelectorAll('tr:nth-child(2) td');
        const parsed = parseIntakeSectionSemester(cells);
        if (parsed) {
            routineTopInfo = parsed;
            return parsed.intake === intake && parsed.section === section;
        }
        return false;
    });

    if (!table) {
        console.error(`Table for intake ${intake} and section ${section} not found.`);
        return;
    }

    data.topInfo = routineTopInfo;
    data.routine = table.nextElementSibling?.outerHTML;
    data.info = table.nextElementSibling?.nextElementSibling?.outerHTML;

    return data;
}

export function parseRoutineHtml(html: string) {
    const rows: HTMLElement[] = parse(html).querySelectorAll('tr');

    const data: string[][] = [];
    rows.forEach((row) => {
        const rowData: string[] = [];
        row.querySelectorAll('th, td').forEach((cell) => {
            rowData.push(cell.innerHTML.trim());
        });
        data.push(rowData);
    });

    return data;
}

export function getProgramRoutine(
    html: string,
    intake: string,
    section: string
): ProgramRoutineData | undefined {
    const routineData = getProgramRoutineHtml(html, intake, section);

    if (!routineData || !routineData.info || !routineData.routine || !routineData.topInfo) {
        console.error('no routine found.');
        return;
    }

    const routineHtmlText: string = routineData.routine;
    const facultyInfo: string = routineData.info;

    return {
        routineDetails: parseRoutineHtml(facultyInfo),
        routine: parseRoutineHtml(routineHtmlText),
        routineTopInfo: routineData.topInfo
    };
}
