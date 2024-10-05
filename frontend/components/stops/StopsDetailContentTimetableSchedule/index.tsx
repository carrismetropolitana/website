/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import { StopsDetailContentTimetableRow } from '@/components/stops/StopsDetailContentTimetableRow';
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

	if (!stopsDetailContext.data.timetable_schedule || stopsDetailContext.data.timetable_schedule?.length === 0) {
		return (
			<NoDataLabel text={t('no_service')} withMinHeight />
		);
	}

	return (
		<>
			{stopsDetailContext.data.timetable_schedule.map(realtime => (
				<StopsDetailContentTimetableRow
					key={realtime.trip_id}
					arrivalData={realtime}
					status="scheduled"
				/>
			))}
		</>
	);

	//
}
