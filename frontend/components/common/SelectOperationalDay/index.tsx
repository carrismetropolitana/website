'use client';

/* * */

import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.SelectOperationalDay');
	const operationalDayContext = useOperationalDayContext();

	//
	// D. Render components

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
