/* * */

import Timetable from '@/components/common/Timetable';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
// import { useProfileContext } from '@/contexts/Profile.context';
import createTimetable from '@/utils/createTimetable';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.PathStopTimetable');

	// const profileContext = useProfileContext();
	const linesDetailContext = useLinesDetailContext();
	const operationalDayContext = useOperationalDayContext();

	const showVariantsOnTimetable = true;

	//
	// B. Transform data

	const timetableData = useMemo(() => {
		// Setup variables
		const activePatternGroup = linesDetailContext.data.active_pattern_group;
		const secondaryPatternGroups = linesDetailContext.data.valid_pattern_groups?.filter(patternGroup => patternGroup.pattern_group_id !== activePatternGroup?.pattern_group_id) || [];
		const mentionedRoutes = linesDetailContext.data.all_routes;
		const selectedStopId = linesDetailContext.data.active_stop?.stop.id;
		const selectedStopSequence = linesDetailContext.data.active_stop?.sequence;
		const selectedOperationalDay = operationalDayContext.data.selected_day;
		// Check if all these variables are defined
		if (!activePatternGroup || !secondaryPatternGroups.length || !mentionedRoutes || !selectedStopId || selectedStopSequence === undefined || !selectedOperationalDay) {
			return null;
		}

		// Check if there are schedules for the selected operational day
		if (!activePatternGroup.valid_on.includes(selectedOperationalDay)) {
			// Find the closest valid date
			return activePatternGroup.valid_on.reduce((acc, curr) => {
				if (selectedOperationalDay <= curr && (acc === '' || curr < acc)) return curr;

				return acc;
			}, '');
		}

		// Check if the user has enabled complex schedules
		if (showVariantsOnTimetable) {
			return createTimetable(activePatternGroup, secondaryPatternGroups, mentionedRoutes, selectedStopId, selectedStopSequence, selectedOperationalDay);
		}
		else {
			return createTimetable(activePatternGroup, [], [], selectedStopId, selectedStopSequence, selectedOperationalDay);
		}
	}, [linesDetailContext.data.active_pattern_group, linesDetailContext.data.valid_pattern_groups, linesDetailContext.data.active_stop, operationalDayContext.data.selected_day]);

	//
	// C. Handle actions
	function handleNextDateClick(date: Date) {
		operationalDayContext.actions.updateSelectedDayFromJsDate(date);
	}

	//
	// D. Render components

	if (!timetableData || typeof timetableData === 'string') {
		const nextDate = timetableData && DateTime.fromISO(timetableData).toJSDate();
		return (
			<div className={styles.container}>
				<p className={styles.noData}>{t('no_data')}</p>
				{nextDate && <p className={styles.nextDate} onClick={() => handleNextDateClick(nextDate)}>{t('next_date', { value: nextDate })}</p>}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>{t('title')}</p>
			<Timetable timetableData={timetableData} />
		</div>
	);

	//
}
