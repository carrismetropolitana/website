/* * */

import Timetable from '@/components/common/Timetable';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
// import { useProfileContext } from '@/contexts/Profile.context';
import createTimetable from '@/utils/createTimetable';
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
		if (!activePatternGroup || !secondaryPatternGroups.length || !mentionedRoutes || !selectedStopId || !selectedStopSequence || !selectedOperationalDay) {
			return null;
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
	// C. Render components

	if (!timetableData) {
		return (
			<div className={styles.container}>
				<p className={styles.noData}>{t('no_data')}</p>
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
