'use client';

/* * */

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.SelectOperationalDay');
	const operationalDayContext = useOperationalDayContext();

	const [selectedSegmentedControlOption, setSelectedSegmentedControlOption] = useState<string | undefined>();

	//
	// B. Transform data

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
					classNames={styles}
					data-selected={!operationalDayContext.flags.is_today_selected && !operationalDayContext.flags.is_tomorrow_selected}
					dropdownType="modal"
					leftSection={<IconCalendarFilled size={20} />}
					onChange={operationalDayContext.actions.updateSelectedDayFromJsDate}
					value={operationalDayContext.data.selected_day_jsdate}
					valueFormat="DD MMM YYYY"
				/>
			),
			value: 'custom_date',
		},
	];

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
	// B. Handle actions

	const handleSegmentedControlChange = (value: string) => {
		if (value === 'today') {
			operationalDayContext.actions.updateSelectedDayToToday();
		}
		else if (value === 'tomorrow') {
			operationalDayContext.actions.updateSelectedDayToTomorrow();
		}
	};

	//
	// B. Render components

	return (
		<SegmentedControl data={segementedControlOptions} onChange={handleSegmentedControlChange} value={selectedSegmentedControlOption} />
	);

	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper} data-custom={!operationalDayContext.flags.is_today_selected && !operationalDayContext.flags.is_tomorrow_selected}>
				<div className={styles.button} data-selected={operationalDayContext.flags.is_today_selected} onClick={operationalDayContext.actions.updateSelectedDayToToday}>
					{t('today')}
				</div>
				<div className={styles.button} data-selected={operationalDayContext.flags.is_tomorrow_selected} onClick={operationalDayContext.actions.updateSelectedDayToTomorrow}>
					{t('tomorrow')}
				</div>
				<DatePickerInput
					classNames={styles}
					data-selected={!operationalDayContext.flags.is_today_selected && !operationalDayContext.flags.is_tomorrow_selected}
					dropdownType="modal"
					leftSection={<IconCalendarFilled size={20} />}
					onChange={operationalDayContext.actions.updateSelectedDayFromJsDate}
					value={operationalDayContext.data.selected_day_jsdate}
					valueFormat="DD MMM YYYY"
				/>
			</div>
		</div>
	);

	//
}
