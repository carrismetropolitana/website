/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { StopRealtime } from '@/types/stops.types';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { NextBusRow } from '../NextBusRow';

/* * */

export function StopsDetailContentListSchedule() {
	//

	//
	// A. Setup variables

	const stopsDetailContext = useStopsSingleContext();
	const operationalDayContext = useOperationalDayContext();

	//
	// B. Transform data

	const operationalDayJs = dayjs(operationalDayContext.data.selected_day_jsdate, 'YYYYMMDD');

	const operationalDate = operationalDayContext.data.selected_day;

	// Get the valid scheduled trips for the current operationalDay
	const validScheduledTrips = useMemo(() => {
		// StopRealtime but only with required fields
		const validScheduledTrips: StopRealtime[] = [];
		// Filter the valid scheduled trips
		if (operationalDate && !operationalDayContext.flags.is_today_selected) {
			for (const patternGroup of stopsDetailContext.data.valid_pattern_groups || []) {
				for (const trip of patternGroup.trips) {
					if (trip.dates.includes(operationalDate)) {
						for (const stopTime of trip.schedule) {
							if (stopTime.stop_id !== stopsDetailContext.data.stop?.id) {
								continue;
							}
							const [hours, minutes, seconds] = stopTime.arrival_time.split(':').map(Number);
							const unixTime = operationalDayJs.set('hour', hours).set('minute', minutes).set('second', seconds).unix();
							validScheduledTrips.push({
								estimated_arrival: null,
								estimated_arrival_unix: null,
								headsign: patternGroup.headsign,
								line_id: patternGroup.line_id,
								observed_arrival: null,
								observed_arrival_unix: null,
								pattern_id: patternGroup.pattern_id,
								route_id: patternGroup.route_id,
								scheduled_arrival: stopTime.arrival_time_24h,
								scheduled_arrival_unix: unixTime,
								stop_sequence: stopTime.stop_sequence,
								trip_id: trip.trip_ids[0],
								vehicle_id: null,
							} satisfies StopRealtime);
						}
					}
				}
			}
		}
		validScheduledTrips.sort((a, b) => a.scheduled_arrival_unix - b.scheduled_arrival_unix);
		return validScheduledTrips;
	}, [operationalDate, stopsDetailContext.data.valid_pattern_groups, stopsDetailContext.data.stop?.id]);

	//
	// C. Render components

	return (
		<>
			{validScheduledTrips ? validScheduledTrips.map(realtime => (
				<NextBusRow key={realtime.trip_id} realtime={realtime} />
			)) : <NoDataLabel text="Sem passagens" />}
		</>
	);

	//
}
