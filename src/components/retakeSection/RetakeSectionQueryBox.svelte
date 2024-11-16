<script lang="ts">
    import QueryBox from '../queryBox/QueryBox.svelte';
    import QueryBoxItem from '../queryBox/QueryBoxItem.svelte';
    import {
        courseList,
        intakeList,
        isMenuOpen,
        queryBoxInputData,
        sectionList
    } from '$lib/stores/retakeSectionStore';
    import DropDownMenu from '../queryBox/DropDownMenu.svelte';
    import {
        onProgramItemClick,
        onIntakeItemClick,
        onSectionItemClick,
        onCourseItemClick
    } from './handleItemClick';
    import { programsList } from '$lib/stores/commonStore';

    const title = 'Retake Section';

    function isProgramItemActive(value: any) {
        return value[1].url === $queryBoxInputData.program_url;
    }

    function isIntakeItemActive(value: any) {
        return value[0] === $queryBoxInputData.intake;
    }

    function isSectionItemActive(value: any) {
        return value[1] === $queryBoxInputData.section;
    }

    function isCourseItemActive(value: any) {
        return value[1] === $queryBoxInputData.course;
    }
</script>

<QueryBox {title}>
    <QueryBoxItem label="Program" {isMenuOpen}>
        <DropDownMenu
            items={$programsList}
            onItemClick={onProgramItemClick}
            isItemActive={isProgramItemActive}
        />
    </QueryBoxItem>
    <QueryBoxItem label="Intake" {isMenuOpen}>
        <DropDownMenu
            items={$intakeList}
            onItemClick={onIntakeItemClick}
            isItemActive={isIntakeItemActive}
        />
    </QueryBoxItem>
    <QueryBoxItem label="Section" {isMenuOpen}>
        <DropDownMenu
            items={$sectionList}
            onItemClick={onSectionItemClick}
            isItemActive={isSectionItemActive}
        />
    </QueryBoxItem>
    <QueryBoxItem label="Course" {isMenuOpen}>
        <DropDownMenu
            items={$courseList}
            onItemClick={onCourseItemClick}
            isItemActive={isCourseItemActive}
        />
    </QueryBoxItem>
</QueryBox>
