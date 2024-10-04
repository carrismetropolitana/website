'use client';

/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';
import type { Line, Pattern, PatternGroup } from '@/types/lines.types';
import type { Arrival, Stop } from '@/types/stops.types';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { Routes } from '@/utils/routes';
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface StopsDetailContextState {
	actions: {
		resetActiveTripId: () => void
		setActiveStopId: (stopId: string) => void
		setActiveTripId: (tripId: string, stopSequence: number) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | undefined
		active_pattern_group: PatternGroup | undefined
		active_stop_id: string
		active_stop_sequence: number | undefined
		active_trip_id: string | undefined
		lines: Line[] | undefined
		patterns: Pattern[] | undefined
		stop: Stop | undefined
		timetable_realtime: Arrival[] | undefined
		timetable_realtime_future: Arrival[] | undefined
		timetable_realtime_past: Arrival[] | undefined
		timetable_schedule: Arrival[] | undefined
		valid_pattern_groups: PatternGroup[] | undefined
	}
	filters: {
		none: string | undefined
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
		is_loading_timetable: boolean
	}
}

/* * */

const StopsDetailContext = createContext<StopsDetailContextState | undefined>(undefined);

export function useStopsDetailContext() {
	const context = useContext(StopsDetailContext);
	if (!context) {
		throw new Error('useStopsDetailContext must be used within a StopsDetailContextProvider');
	}
	return context;
}

/* * */

export const StopsDetailContextProvider = ({ children, stopId }: { children: React.ReactNode, stopId: string }) => {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();
	const linesContext = useLinesContext();
	const alertsContext = useAlertsContext();
	const profileContext = useProfileContext();
	const operationalDayContext = useOperationalDayContext();

	const [dataStopState, setDataStopState] = useState<Stop | undefined>(undefined);
	const [dataActiveStopIdState, setDataActiveStopIdState] = useState<string>(stopId);

	const [dataLinesState, setDataLinesState] = useState<Line[] | undefined>(undefined);
	const [dataPatternsState, setDataPatternsState] = useState<Pattern[] | undefined>(undefined);
	const [dataValidPatternGroupsState, setDataValidPatternGroupsState] = useState<PatternGroup[] | undefined>(undefined);

	const [dataTimetableRealtimeState, setDataTimetableRealtimeState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableRealtimePastState, setDataTimetableRealtimePastState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableRealtimeFutureState, setDataTimetableRealtimeFutureState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableScheduleState, setDataTimetableScheduleState] = useState<Arrival[] | undefined>(undefined);

	const [dataActivePatternGroupState, setDataActivePatternGroupState] = useState<PatternGroup | undefined>(undefined);
	const [dataActiveAlertsState, setDataActiveAlertsState] = useState<SimplifiedAlert[] | undefined>(undefined);
	const [dataActiveTripIdState, setDataActiveTripIdState] = useState<string | undefined>(undefined);
	const [dataActiveStopSequenceState, setDataActiveStopSequenceState] = useState<number | undefined>(undefined);

	const [flagIsFavoriteState, setFlagIsFavoriteState] = useState<boolean>(false);

	//
	// B. Fetch data

	/**
	 * Populate stopData state when stopId changes.
	 * Use data from stopsContext to avoid fetching the same data twice.
	 */
	useEffect(() => {
		if (!dataActiveStopIdState || !stopsContext.data.raw || !stopsContext.data.raw.length) return;
		const foundStopData = stopsContext.actions.getStopDataById(dataActiveStopIdState);
		if (foundStopData) {
			setDataStopState(foundStopData);
			window.history.replaceState({}, '', `${Routes.STOPS.route}/${dataActiveStopIdState}` + window.location.search);
		}
		else {
			notFound();
		}
	}, [stopsContext.data.raw, dataActiveStopIdState]);

	/**
	 * Fetch line data for the selected stop.
	 * This effect runs whenever the `dataStopState` changes.
	 * It fetches line data for each line associated with the stop and updates the state.
	 */
	useEffect(() => {
		if (!dataStopState) return;
		const linesData = dataStopState.lines
			.map(lineId => linesContext.actions.getLineDataById(lineId))
			.filter(lineData => lineData !== undefined);
		setDataLinesState(linesData);
	}, [dataStopState]);

	/**
	 * Fetch realtime arrivals data for the selected stop.
	 * This effect runs whenever the `dataStopState` changes.
	 * It fetches line data for each line associated with the stop and updates the state.
	 */
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!dataActiveStopIdState) return;
				const realtimeData = await fetch(`${Routes.API}/v2/stops/${dataActiveStopIdState}/realtime`)
					.then((response) => {
						if (!response.ok) console.log(`Failed to fetch realtime data for stopId: ${dataActiveStopIdState}`);
						else return response.json();
					});
				setDataTimetableRealtimeState(realtimeData);
			}
			catch (error) {
				console.error('Error fetching realtime data:', error);
				setDataTimetableRealtimeState([]);
			}
		};
		//
		fetchData();
		const interval = setInterval(fetchData, 10000);
		return () => clearInterval(interval);
	}, [dataActiveStopIdState]);

	/**
	 * Fetch pattern data for the selected stop.
	 * This effect runs whenever the `dataStopState` changes.
	 * It fetches pattern data for each pattern associated with the stop and updates the state.
	 */
	useEffect(() => {
		if (!dataStopState) return;
		(async () => {
			try {
				const patternsData = await Promise.all(dataStopState.patterns.map((patternId) => {
					return fetch(`${Routes.API}/v2/patterns/${patternId}`).then((response) => {
						if (!response.ok) console.log(`Failed to fetch pattern data for patternId: ${patternId}`);
						else return response.json();
					});
				}));
				setDataPatternsState(patternsData);
			}
			catch (error) {
				console.error('Error fetching all pattern data:', error);
			}
		})();
	}, [dataStopState]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.profile?.favorite_stops?.includes(stopId) ? true : false);
	}, [profileContext.data.profile?.favorite_stops, stopId]);

	/**
	 * Prepare timetable realtime data for the selected stop.
	 */
	useEffect(() => {
		const prepareTimetableRealtimeData = () => {
			if (!dataTimetableRealtimeState) return;
			const nowInUnixSeconds = DateTime.now().toSeconds();
			const timetableRealtimePastResult = dataTimetableRealtimeState.filter((realtime) => {
				return (realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix) < nowInUnixSeconds;
			});
			const timetableRealtimeFutureResult = dataTimetableRealtimeState.filter((realtime) => {
				return (realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix) >= nowInUnixSeconds;
			});
			setDataTimetableRealtimePastState(timetableRealtimePastResult || []);
			setDataTimetableRealtimeFutureState(timetableRealtimeFutureResult || []);
		};
		prepareTimetableRealtimeData();
		const interval = setInterval(prepareTimetableRealtimeData, 1000);
		return () => clearInterval(interval);
	}, [dataTimetableRealtimeState]);

	/**
	 * Prepare timetable schedule data for the selected stop.
	 */
	useEffect(() => {
		// Return if no valid pattern groups or operational day is selected
		if (!operationalDayContext.data.selected_day || !dataValidPatternGroupsState) return;

		const validScheduledTrips: Arrival[] = [];

		for (const patternGroup of dataValidPatternGroupsState || []) {
			for (const trip of patternGroup.trips) {
				// Skip if trip is not valid for the selected operational day
				if (!trip.dates.includes(operationalDayContext.data.selected_day)) continue;
				// Find the schedule for the given Stop ID
				for (const stopTime of trip.schedule) {
					// Skip if not for the selected stop
					if (stopTime.stop_id !== dataActiveStopIdState) continue;
					// Convert the arrival time into a unix timestamp.
					// The arrival time is in 24h+ format, so we need to split it into hours, minutes, and seconds.
					// Remember that if the hour is greater than 24, it means the arrival time is on the next day, and we need to add one day to the timestamp.
					const [arrivalHours, arrivalMinutes, arrivalSeconds] = stopTime.arrival_time.split(':').map(Number);
					const arrivalUnixTimestamp = DateTime
						.fromFormat(operationalDayContext.data.selected_day, 'yyyyMMdd')
						.set({ hour: 0, minute: 0, second: 0 })
						.plus({ hours: arrivalHours, minute: arrivalMinutes, second: arrivalSeconds })
						.toUnixInteger();
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
						scheduled_arrival_unix: arrivalUnixTimestamp,
						stop_sequence: stopTime.stop_sequence,
						trip_id: trip.trip_ids.join(),
						vehicle_id: null,
					});
				}
			}
		}
		validScheduledTrips.sort((a, b) => a.scheduled_arrival_unix - b.scheduled_arrival_unix);
		setDataTimetableScheduleState(validScheduledTrips);
	}, [operationalDayContext.data.selected_day, dataValidPatternGroupsState, dataActiveStopIdState]);

	/**
	 * Fill state with valid pattern groups for the selected operational day.
	 */
	useEffect(() => {
		if (!dataPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatternGroups: PatternGroup[] = [];
		for (const pattern of dataPatternsState) {
			for (const patternGroup of pattern) {
				if (patternGroup.valid_on.includes(operationalDayContext.data.selected_day)) {
					activePatternGroups.push(patternGroup);
				}
			}
		}
		setDataValidPatternGroupsState(activePatternGroups);
	}, [dataPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!alertsContext.data.simplified) return;
		const activeAlerts = alertsContext.data.simplified.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				if (!informedEntity.stopId || !informedEntity.routeId) return false;
				const hasMatchingStop = informedEntity.stopId === dataActiveStopIdState;
				const hasMatchingRoute = dataStopState?.routes.includes(informedEntity.routeId);
				const isActive = simplifiedAlertData.start_date <= new Date() && simplifiedAlertData.end_date >= new Date();
				return (hasMatchingStop || hasMatchingRoute) && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [alertsContext.data.simplified, dataActiveStopIdState]);

	//
	// D. Handle actions

	const setActiveStopId = (stopId: string) => {
		setDataActiveStopIdState(stopId);
	};

	const setActiveTripId = (tripId: string, stopSequence: number) => {
		const activePatternGroup = dataValidPatternGroupsState?.find(patternGroup => patternGroup.trips.find(trip => trip.trip_ids.includes(tripId)));
		if (activePatternGroup) {
			setDataActivePatternGroupState(activePatternGroup);
		}
		setDataActiveTripIdState(tripId);
		setDataActiveStopSequenceState(stopSequence);
	};

	const resetActiveTripId = () => {
		setDataActivePatternGroupState(undefined);
		setDataActiveTripIdState(undefined);
		setDataActiveStopSequenceState(undefined);
	};

	//
	// E. Define context value

	const contextValue: StopsDetailContextState = {
		actions: {
			resetActiveTripId,
			setActiveStopId,
			setActiveTripId,
		},
		data: {
			active_alerts: dataActiveAlertsState,
			active_pattern_group: dataActivePatternGroupState,
			active_stop_id: dataActiveStopIdState,
			active_stop_sequence: dataActiveStopSequenceState,
			active_trip_id: dataActiveTripIdState,
			lines: dataLinesState,
			patterns: dataPatternsState,
			stop: dataStopState,
			timetable_realtime: dataTimetableRealtimeState,
			timetable_realtime_future: dataTimetableRealtimeFutureState,
			timetable_realtime_past: dataTimetableRealtimePastState,
			timetable_schedule: dataTimetableScheduleState,
			valid_pattern_groups: dataValidPatternGroupsState,
		},
		filters: {
			none: undefined,
		},
		flags: {
			is_favorite: flagIsFavoriteState,
			is_loading: dataPatternsState === undefined,
			is_loading_timetable: dataPatternsState === undefined || dataTimetableRealtimeState === undefined,
		},
	};

	//
	// F. Render components

	return (
		<StopsDetailContext.Provider value={contextValue}>
			{children}
		</StopsDetailContext.Provider>
	);

	//
};
