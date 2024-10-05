'use client';

/* * */

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function SelectOperationalDay() {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.SelectOperationalDay');
	const operationalDayContext = useOperationalDayContext();

	const [selectedSegmentedControlOption, setSelectedSegmentedControlOption] = useState<string | undefined>();

	const segementedControlOptions = [
		{
			label: t('today'),
			value: 'today',
		},
		{
			label: t('tomorrow'),
			value: 'tomorrow',
		},
		{
			label: (
				<DatePickerInput
					classNames={{ input: styles.datePickerInput, section: styles.datePickerSection, wrapper: styles.datePickerWrapper }}
					data-selected={!operationalDayContext.flags.is_today_selected && !operationalDayContext.flags.is_tomorrow_selected}
					dropdownType="modal"
					leftSection={<IconCalendarEvent />}
					onChange={operationalDayContext.actions.updateSelectedDayFromJsDate}
					size="lg"
					value={operationalDayContext.data.selected_day_jsdate}
					valueFormat="DD MMM YYYY"
					variant="unstyled"
				/>
			),
			value: 'custom_date',
		},
	];

	//
	// B. Transform data

	useEffect(() => {
		if (operationalDayContext.flags.is_today_selected) {
			setSelectedSegmentedControlOption('today');
		}
		else if (operationalDayContext.flags.is_tomorrow_selected) {
			setSelectedSegmentedControlOption('tomorrow');
		}
		else if (!operationalDayContext.flags.is_today_selected && !operationalDayContext.flags.is_tomorrow_selected) {
			setSelectedSegmentedControlOption('custom_date');
		}
	}, [operationalDayContext.flags.is_today_selected, operationalDayContext.flags.is_tomorrow_selected]);

	//
	// C. Handle actions

	const handleSegmentedControlChange = (value: string) => {
		if (value === 'today') {
			operationalDayContext.actions.updateSelectedDayToToday();
		}
		else if (value === 'tomorrow') {
			operationalDayContext.actions.updateSelectedDayToTomorrow();
		}
	};

	//
	// D. Render components

	return (
		<SegmentedControl
			data={segementedControlOptions}
			onChange={handleSegmentedControlChange}
			value={selectedSegmentedControlOption}
			w="100%"
			classNames={{
				control: styles.segmentedControlDateInputOverrideControl,
				label: styles.segmentedControlDateInputOverrideLabel,
			}}
		/>
	);

	//
}
