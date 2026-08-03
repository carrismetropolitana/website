/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { StopsDetailViewTimetableRow } from '@/components/stops/StopsDetailContentTimetableRow';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useTranslations } from 'next-intl';

/* * */

export function StopsDetailContentTimetableSchedule() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableSchedule');
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render components

	if (!stopsDetailContext.data.timetable.length) {
		return (
			<NoDataLabel text={t('no_service')} withMinHeight />
		);
	}

	return (
		<>
			{stopsDetailContext.data.timetable.map(item => (
				<StopsDetailViewTimetableRow
					key={item._id}
					data={item}
					status="scheduled"
					withClock={false}
				/>
			))}
			<NoDataLabel text={t('end_of_day')} withMinHeight />
		</>
	);

	//
}
