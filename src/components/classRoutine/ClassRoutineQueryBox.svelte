<script lang="ts">
    import QueryBox from '../queryBox/QueryBox.svelte';
    import QueryBoxItem from '../queryBox/QueryBoxItem.svelte';
    import {
        intakeList,
        isMenuOpen,
        queryBoxInputData,
        sectionList
    } from '$lib/stores/classRoutineStore';
    import DropDownMenu from '../queryBox/DropDownMenu.svelte';
    import { onIntakeItemClick, onProgramItemClick, onSectionItemClick } from './handleItemClick';
    import { programsList } from '$lib/stores/commonStore';

    const title = 'Class Routine';

    function isProgramItemActive(value: obj) {
        return value[1].url === $queryBoxInputData.program_url;
    }

    function isIntakeItemActive(value: any) {
        return value[0] === $queryBoxInputData.intake;
    }

    function isSectionItemActive(value: any) {
        return value[1] === $queryBoxInputData.section;
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
</QueryBox>
