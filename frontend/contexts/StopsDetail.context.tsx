'use client';

/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';
import type { Arrival } from '@/types/stops.types';
import type { Line, Pattern, Shape, Stop } from '@carrismetropolitana/api-types/network';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { Routes } from '@/utils/routes';
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAnalyticsContext } from './Analytics.context';

/* * */

interface StopsDetailContextState {
	actions: {
		resetActiveTripId: () => void
		setActiveStopId: (stopId: string) => void
		setActiveTripId: (tripId: string, stopSequence: number) => void
	}
	data: {
		active_alerts: SimplifiedAlert[] | undefined
		active_pattern_group: Pattern | undefined
		active_shape: Shape | undefined
		active_stop_id: string
		active_stop_sequence: number | undefined
		active_trip_id: string | undefined
		lines: Line[] | undefined
		patterns: Pattern[][] | undefined
		stop: Stop | undefined
		timetable_realtime: Arrival[] | undefined
		timetable_realtime_future: Arrival[] | undefined
		timetable_realtime_past: Arrival[] | undefined
		timetable_schedule: Arrival[] | undefined
		valid_pattern_groups: Pattern[] | undefined
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
	const analyticsContext = useAnalyticsContext();

	const [dataStopState, setDataStopState] = useState<Stop | undefined>(undefined);
	const [dataActiveStopIdState, setDataActiveStopIdState] = useState<string>(stopId);

	const [dataLinesState, setDataLinesState] = useState<Line[] | undefined>(undefined);
	const [dataPatternsState, setDataPatternsState] = useState<Pattern[][] | undefined>(undefined);
	const [dataValidPatternsState, setDataValidPatternsState] = useState<Pattern[] | undefined>(undefined);
	const [dataShapeState, setDataShapeState] = useState<Shape | undefined>(undefined);

	const [dataTimetableRealtimeState, setDataTimetableRealtimeState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableRealtimePastState, setDataTimetableRealtimePastState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableRealtimeFutureState, setDataTimetableRealtimeFutureState] = useState<Arrival[] | undefined>(undefined);
	const [dataTimetableScheduleState, setDataTimetableScheduleState] = useState<Arrival[] | undefined>(undefined);

	const [dataActivePatternState, setDataActivePatternState] = useState<Pattern | undefined>(undefined);
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
		if (!dataActiveStopIdState || !stopsContext.data.stops || !stopsContext.data.stops.length) return;
		const foundStopData = stopsContext.actions.getStopById(dataActiveStopIdState);
		if (foundStopData) {
			setDataStopState(foundStopData);
			window.history.replaceState({}, '', `${Routes.STOPS.route}/${dataActiveStopIdState}` + window.location.search);
		}
		else {
			notFound();
		}
	}, [stopsContext.data.stops, dataActiveStopIdState]);

	/**
	 * Fetch line data for the selected stop.
	 * This effect runs whenever the `dataStopState` changes.
	 * It fetches line data for each line associated with the stop and updates the state.
	 */
	useEffect(() => {
		if (!dataStopState) return;
		const linesData = dataStopState.line_ids
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
				const realtimeData = await fetch(`${Routes.API}/arrivals/by_stop/${dataActiveStopIdState}`)
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
				const patternsData = await Promise.all(dataStopState.pattern_ids.map((patternId) => {
					return fetch(`${Routes.API}/patterns/${patternId}`).then((response) => {
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

	/**
	 * TASK: Fetch shape data for the active trip.
	 * WHEN: The `dataActivePatternState` changes.
	 */
	useEffect(() => {
		if (!dataActivePatternState) return;
		(async () => {
			try {
				const shapeData = await fetch(`${Routes.API}/shapes/${dataActivePatternState.shape_id}`).then((response) => {
					if (!response.ok) console.log(`Failed to fetch shape data for shapeId: ${dataActivePatternState.shape_id}`);
					else return response.json();
				});
				if (shapeData) {
					shapeData.geojson = {
						...shapeData.geojson,
						properties: {
							color: dataActivePatternState.color,
							text_color: dataActivePatternState.text_color,
						},
					};
				}
				setDataShapeState(shapeData);
			}
			catch (error) {
				console.error('Error fetching shape data:', error);
			}
		})();
	}, [dataActivePatternState]);

	//
	// C. Transform data

	useEffect(() => {
		setFlagIsFavoriteState(profileContext.data.favorite_stops?.includes(stopId) ? true : false);
	}, [profileContext.data.favorite_stops, stopId]);

	/**
	 * Prepare timetable realtime data for the selected stop.
	 */
	useEffect(() => {
		const prepareTimetableRealtimeData = () => {
			if (!dataTimetableRealtimeState) return;
			const nowInUnixSeconds = DateTime.now().toSeconds();
			const timetableRealtimePastResult = dataTimetableRealtimeState
				.filter((arrival) => {
					// If the arrival has an observed arrival time,
					// then it means the vehicle has already passed the stop.
					if (arrival.observed_arrival_unix) return true;
					// Include it in the past if the estimated arrival time is in the past.
					return (arrival.estimated_arrival_unix || arrival.scheduled_arrival_unix) < nowInUnixSeconds;
				})
				.sort((a, b) => {
					const minimumArrivalA = a.observed_arrival_unix || a.scheduled_arrival_unix;
					const minimumArrivalB = b.observed_arrival_unix || b.scheduled_arrival_unix;
					return minimumArrivalA - minimumArrivalB;
				});
			const timetableRealtimeFutureResult = dataTimetableRealtimeState
				.filter((arrival) => {
					// If the arrival has an observed arrival time,
					// then it means the vehicle has already passed the stop.
					if (arrival.observed_arrival_unix) return false;
					// Include it in the future if the estimated arrival time is in the future.
					return (arrival.estimated_arrival_unix || arrival.scheduled_arrival_unix) >= nowInUnixSeconds;
				})
				.sort((a, b) => {
					const minimumArrivalA = a.estimated_arrival_unix || a.scheduled_arrival_unix;
					const minimumArrivalB = b.estimated_arrival_unix || b.scheduled_arrival_unix;
					return minimumArrivalA - minimumArrivalB;
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
		if (!operationalDayContext.data.selected_day || !dataValidPatternsState) return;

		const validScheduledTrips: Arrival[] = [];

		for (const patternGroup of dataValidPatternsState || []) {
			for (const trip of patternGroup.trips) {
				// Skip if trip is not valid for the selected operational day
				if (!trip.valid_on.includes(operationalDayContext.data.selected_day)) continue;
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
						pattern_id: patternGroup.id,
						route_id: patternGroup.route_id,
						scheduled_arrival: stopTime.arrival_time_24h,
						scheduled_arrival_unix: arrivalUnixTimestamp,
						stop_sequence: stopTime.stop_sequence,
						trip_id: trip.trip_ids.length ? trip.trip_ids[0] : '',
						vehicle_id: null,
					});
				}
			}
		}
		validScheduledTrips.sort((a, b) => (a.scheduled_arrival_unix - b.scheduled_arrival_unix));
		setDataTimetableScheduleState(validScheduledTrips);
	}, [operationalDayContext.data.selected_day, dataValidPatternsState, dataActiveStopIdState]);

	/**
	 * Fill state with valid pattern groups for the selected operational day.
	 */
	useEffect(() => {
		if (!dataPatternsState || !operationalDayContext.data.selected_day) return;
		const activePatterns: Pattern[] = [];
		for (const pattern of dataPatternsState) {
			for (const patternGroup of pattern) {
				if (patternGroup.valid_on.includes(operationalDayContext.data.selected_day)) {
					activePatterns.push(patternGroup);
				}
			}
		}
		setDataValidPatternsState(activePatterns);
	}, [dataPatternsState, operationalDayContext.data.selected_day]);

	useEffect(() => {
		if (!alertsContext.data.simplified) return;
		const activeAlerts = alertsContext.data.simplified.filter((simplifiedAlertData) => {
			return simplifiedAlertData.informed_entity.some((informedEntity) => {
				if (!informedEntity.stop_id && !informedEntity.route_id) return false;
				const hasMatchingStop = informedEntity.stop_id === dataActiveStopIdState;
				const hasMatchingRoute = dataStopState?.route_ids.includes(informedEntity.route_id || '');
				const isActive = simplifiedAlertData.end_date ? simplifiedAlertData.end_date >= new Date() : true;
				return (hasMatchingStop || hasMatchingRoute) && isActive;
			});
		});
		setDataActiveAlertsState(activeAlerts);
	}, [alertsContext.data.simplified, dataStopState, dataActiveStopIdState]);

	//
	// D. Handle actions

	const setActiveStopId = (stopId: string) => {
		resetActiveTripId();
		setDataActiveStopIdState(stopId);
	};

	const setActiveTripId = (tripId: string, stopSequence: number) => {
		const activePattern = dataValidPatternsState?.find(patternGroup => patternGroup.trips.find(trip => trip.trip_ids.includes(tripId)));
		if (activePattern) {
			setDataActivePatternState(activePattern);
		}
		setDataActiveTripIdState(tripId);
		setDataActiveStopSequenceState(stopSequence);
		analyticsContext.actions.capture(ampli => ampli.stopTripClicked({ trip_id: tripId }));
	};

	const resetActiveTripId = () => {
		setDataActivePatternState(undefined);
		setDataActiveTripIdState(undefined);
		setDataShapeState(undefined);
		setDataActiveStopSequenceState(undefined);
	};

	useEffect(() => {
		// Setup a keyboard listener for up and down arrow keys to navigate through the timetable.
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				event.preventDefault();
				// If not today, select from the schedule trips array
				if (!operationalDayContext.flags.is_today_selected) {
					const activeTripTimetableScheduleIndex = dataTimetableScheduleState?.findIndex(arrival => arrival.trip_id === dataActiveTripIdState);
					if (activeTripTimetableScheduleIndex !== undefined && activeTripTimetableScheduleIndex > -1) {
						const foundArrivalData = dataTimetableScheduleState?.[activeTripTimetableScheduleIndex + (event.key === 'ArrowUp' ? -1 : 1)];
						if (foundArrivalData) {
							setActiveTripId(foundArrivalData.trip_id, foundArrivalData.stop_sequence);
							return;
						}
					}
				}
				//
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [dataActiveStopSequenceState, dataTimetableScheduleState]);

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
			active_pattern_group: dataActivePatternState,
			active_shape: dataShapeState,
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
			valid_pattern_groups: dataValidPatternsState,
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
