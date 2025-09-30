/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { StopsDetailContentTimetableRow } from '@/components/stops/StopsDetailContentTimetableRow';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useTranslations } from 'next-intl';

/* * */

export function StopsDetailContentTimetableRealtime({ size }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRealtime');
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render components

	if ((!stopsDetailContext.data.timetable_realtime_future || stopsDetailContext.data.timetable_realtime_future?.length === 0)) {
		return (
			<NoDataLabel text={t('no_service')} withMinHeight />
		);
	}

	return (
		<>

			{stopsDetailContext.data.timetable_realtime_future && stopsDetailContext.data.timetable_realtime_future.length > 0 && (
				<>
					{stopsDetailContext.data.timetable_realtime_future.map(tripData => (
						<StopsDetailContentTimetableRow
							key={`${tripData.trip_id}-${tripData.stop_sequence}`}
							arrivalData={tripData}
							size={size}
							status={tripData.estimated_arrival_unix ? 'realtime' : 'scheduled'}
						/>
					))}
				</>
			)}

		</>
	);

	//
}
