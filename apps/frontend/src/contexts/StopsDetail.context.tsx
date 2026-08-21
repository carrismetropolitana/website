'use client';
/* * */

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useDebugContext } from '@/contexts/Debug.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useProfileContext } from '@/contexts/Profile.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { fetchPatterns } from '@/hooks/fetch-patterns';
import { normalizeReferenceId } from '@/utils/alerts';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { Dates } from '@tmlmobilidade/dates';
import { type HubAlert, type HubLine, type HubPattern, type HubShape, type HubStop } from '@tmlmobilidade/go-types-public-info';
import { type UnixTimestamp, validateUnixTimestamp } from '@tmlmobilidade/types';
import { convertGTFSTimeStringAndOperationalDateToUnixTimestamp } from '@tmlmobilidade/utils';
import { notFound } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

export interface StopsDetailViewTimetableData {
	_id: string
	arrival_effective_ms: null | UnixTimestamp
	arrival_estimated_ms: null | UnixTimestamp
	arrival_scheduled_ms: UnixTimestamp
	color: string
	headsign: string
	is_past: boolean
	is_realtime: boolean
	line_id: string
	locality_names: string[]
	pattern_id: string
	short_name: string
	stop_sequence: number
	text_color: string
	trip_ids: string[]
}

interface HubEtaByStop {
	eta_at: null | UnixTimestamp
	eta_seconds: null | number
	position_created_at: null | string
	stop_id: string
	trip_id: string
}

interface StopsDetailContextState {
	actions: {
		resetActiveTripId: () => void
		setActiveStopId: (stopId: string) => void
		setActiveTripId: (tripId: string) => void
	}
	data: {
		active_alerts: HubAlert[]
		highlighted_pattern: HubPattern
		highlighted_shape: HubShape
		highlighted_trip_id: string
		lines: HubLine[]
		stop: HubStop
		timetable: StopsDetailViewTimetableData[]
	}
	flags: {
		is_favorite: boolean
		is_loading: boolean
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
	const operationalDateContext = useOperationalDateContext();
	const debugContext = useDebugContext();
	const environmentContext = useEnvironmentContext();
	const [dataActiveStopIdState, setDataActiveStopIdState] = useState<string>(stopId);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentTimestamp, setCurrentTimestamp] = useState(() => Dates.now('Europe/Lisbon').unix_timestamp);
	const [associatedPatternsData, setAssociatedPatternsData] = useState<HubPattern[][]>();
	const [highlightedPattern, setHighlightedPattern] = useState<HubPattern>();
	const [highlightedShape, setHighlightedShape] = useState<HubShape>();
	const [highlightedTripId, setHighlightedTripId] = useState<string>();

	//
	// B. Fetch data

	const selectedStopData = useMemo(() => {
		if (!dataActiveStopIdState || !stopsContext.data.stops?.length) return;
		return stopsContext.actions.getStopById(dataActiveStopIdState);
	}, [dataActiveStopIdState, stopsContext.data.stops, stopsContext.actions]);

	/**
	 * Fetch associate estimates
	 */

	const etaApiUrl = operationalDateContext.flags.is_today_selected && dataActiveStopIdState ? `${getPublicVariable('go_api_url')}/hub/api/v1/realtime/eta/by-stop/${encodeURIComponent(dataActiveStopIdState)}` : null;
	const { data: etaResponse } = useSWR<GoApiResponse<HubEtaByStop[]>, Error>(etaApiUrl, { refreshInterval: 30_000 });
	const etaData = Array.isArray(etaResponse?.data) ? etaResponse.data : [];

	/**
	 * Get associated lines data for the selected stop.
	 */

	const associatedLinesData = useMemo(() => {
		if (!selectedStopData) return;
		return linesContext.data.lines.filter(line => selectedStopData.line_ids.includes(line._id));
	}, [linesContext.data.lines, selectedStopData]);

	/**
	 * Get associated patterns data for the selected stop.
	 */

	useEffect(() => {
		(async () => {
			if (!selectedStopData) return;
			setIsLoading(true);
			const patternsData = await fetchPatterns(selectedStopData.pattern_ids);
			setAssociatedPatternsData(patternsData);
			setIsLoading(false);
		})();
	}, [selectedStopData]);

	/**
	 * Get associated shape data for the highlighted pattern.
	 */

	useEffect(() => {
		if (!highlightedPattern) {
			setHighlightedShape(undefined);
			return;
		}

		let isCancelled = false;
		(async () => {
			try {
				const response = await fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/network/shapes/${encodeURIComponent(highlightedPattern.shape_id)}`);
				if (!response.ok) throw new Error(`Failed to fetch shape ${highlightedPattern.shape_id}`);
				const payload = await response.json() as { data?: HubShape };
				const shapeData = payload.data;
				if (isCancelled || !shapeData) return;
				setHighlightedShape({
					...shapeData,
					geojson: {
						...shapeData.geojson,
						properties: {
							...shapeData.geojson.properties,
							color: highlightedPattern.color,
							text_color: highlightedPattern.text_color,
						},
					},
				});
			}
			catch (error) {
				if (!isCancelled) console.error('Error fetching highlighted shape:', error);
			}
		})();

		return () => {
			isCancelled = true;
		};
	}, [highlightedPattern]);

	/**
	 * Update the URL when the selected stop changes.
	 * Validate the stop using data already available in stopsContext.
 	*/

	useEffect(() => {
		if (!dataActiveStopIdState || !stopsContext.data.stops || !stopsContext.data.stops.length) return;
		if (selectedStopData) {
			window.history.replaceState({}, '', environmentContext.actions.getNormalizedHref(`/stops/${dataActiveStopIdState}`) + window.location.search);
		}
		else {
			notFound();
		}
	}, [selectedStopData, stopsContext.data.stops, dataActiveStopIdState, environmentContext.data.value]);

	//
	// C. Transform data

	const isFavoriteData = profileContext.data.favorite_stops?.includes(dataActiveStopIdState) ?? false;

	const activeAlertsData = useMemo(() => {
		if (!selectedStopData) return [];

		const normalizedStopId = normalizeReferenceId(dataActiveStopIdState);

		return alertsContext.data.alerts.filter((alert) => {
			if (alert.reference_type !== 'stops') return false;

			const hasMatchingReference = alert.references.some((reference) => {
				return normalizeReferenceId(reference.parent_id) === normalizedStopId;
			});
			const isActive = !alert.active_period_end_date || alert.active_period_end_date >= Date.now();
			return hasMatchingReference && isActive;
		});
	}, [alertsContext.data.alerts, selectedStopData, dataActiveStopIdState]);

	const validPatternsData = useMemo(() => {
		// Skip if no associated patterns data or no operational date is selected
		if (!associatedPatternsData || !operationalDateContext.data.selected_date) return;
		// Return patterns with trips on the selected operational date
		return associatedPatternsData
			.flat()
			.filter(patternGroup => patternGroup.valid_on.includes(operationalDateContext.data.selected_date.operational_date));
	}, [associatedPatternsData, operationalDateContext.data.selected_date]);

	/**
	 * Prepare timetable data for the selected stop.
 	*/

	const timetableDataForSelectedDate = useMemo(() => {
		// Skip if no valid patterns data or no operational date is selected
		if (!validPatternsData || !operationalDateContext.data.selected_date) return [];
		// Initialize the timetable data for the selected date
		const timetableDataForSelectedDate: StopsDetailViewTimetableData[] = [];
		// Loop through each valid pattern, and each trip of the pattern
		for (const patternData of validPatternsData) {
			for (const tripData of patternData.trips) {
				// Skip if this trip is not valid for the selected operational date
				if (!tripData.valid_on.includes(operationalDateContext.data.selected_date.operational_date)) continue;
				// Loop through each stop time of the trip
				for (const stopTime of tripData.schedule) {
					// Skip if this stop time is not for the selected stop
					if (String(stopTime.stop_id) !== String(dataActiveStopIdState)) continue;
					// Set a unique and stable ID for this arrival data
					const uniqueIdValueForArrivalData = `${operationalDateContext.data.selected_date.operational_date}-${patternData.version_id}-${tripData.version_id}-${stopTime.stop_id}-${stopTime.stop_sequence}-${stopTime.arrival_time}`;
					// Convert GTFS time string to Unix Timestamp
					const scheduledArrivalMs = convertGTFSTimeStringAndOperationalDateToUnixTimestamp(stopTime.arrival_time, operationalDateContext.data.selected_date.operational_date);
					// Fetch ETA for this trip and stop, if available.
					const eta = operationalDateContext.flags.is_today_selected
						? etaData?.find(eta => eta.trip_id.substring(eta.trip_id.indexOf(']') + 1) === tripData.trip_ids.find(tripId => tripId.substring(tripId.indexOf(']') + 1) === eta.trip_id.substring(eta.trip_id.indexOf(']') + 1))?.substring(eta.trip_id.indexOf(']') + 1))
						: undefined;
					// Extract the arrival time, delay and effective arrival time
					// from the trip update, if any was found
					const estimatedArrivalMs = eta?.eta_at;
					const effectiveArrivalMs = estimatedArrivalMs || scheduledArrivalMs;
					// Detect the position of this stop time in the pattern
					const isLastStop = stopTime.stop_sequence === patternData.path[patternData.path.length - 1].stop_sequence;
					// When debug is off, skip last-stop arrivals (show them only in debug mode).
					if (!debugContext.flags.is_debug_mode && isLastStop) continue;
					// Detect the temporal status of this stop time
					const isPast = Number(effectiveArrivalMs) < Dates.now('Europe/Lisbon').unix_timestamp;
					const isRealtime = !!estimatedArrivalMs && operationalDateContext.flags.is_today_selected;
					// Add this stop time to the timetable array
					timetableDataForSelectedDate.push({
						_id: uniqueIdValueForArrivalData,
						arrival_effective_ms: effectiveArrivalMs,
						arrival_estimated_ms: estimatedArrivalMs,
						arrival_scheduled_ms: scheduledArrivalMs,
						color: patternData.color,
						headsign: patternData.headsign,
						is_past: isPast,
						is_realtime: isRealtime,
						line_id: patternData.line_id,
						locality_names: patternData.locality_names,
						pattern_id: patternData._id,
						short_name: patternData.short_name,
						stop_sequence: stopTime.stop_sequence,
						text_color: patternData.text_color,
						trip_ids: tripData.trip_ids,
					});
				}
			}
		}
		// Return the timetable data, sorted by scheduled arrival time
		return timetableDataForSelectedDate.sort((a, b) => a.arrival_effective_ms - b.arrival_effective_ms);
	}, [validPatternsData, operationalDateContext.data.selected_date, operationalDateContext.flags.is_today_selected, dataActiveStopIdState, etaData, debugContext.flags.is_debug_mode, currentTimestamp]);

	useEffect(() => {
		const updateCurrentTimestamp = () => {
			setCurrentTimestamp(Dates.now('Europe/Lisbon').unix_timestamp);
		};

		updateCurrentTimestamp();
		if (!operationalDateContext.flags.is_today_selected) return;

		const interval = setInterval(updateCurrentTimestamp, 1000);
		return () => clearInterval(interval);
	}, [operationalDateContext.flags.is_today_selected]);

	//
	// D. Handle actions

	const setActiveStopId = (activeStopId: string) => {
		resetActiveTripId();
		setDataActiveStopIdState(activeStopId);
	};

	const setActiveTripId = (tripId: string) => {
		const activePattern = validPatternsData?.find(patternGroup => patternGroup.trips.find(trip => trip.trip_ids.includes(tripId)));
		if (activePattern) setHighlightedPattern(activePattern);
		setHighlightedTripId(tripId);
		// analyticsContext.actions.capture(ampli => ampli.stopTripClicked({ trip_id: tripId }));
	};

	const resetActiveTripId = () => {
		setHighlightedPattern(undefined);
		setHighlightedShape(undefined);
		setHighlightedTripId(undefined);
	};

	useEffect(() => {
		// Setup a keyboard listener for up and down arrow keys to navigate through the timetable.
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
				event.preventDefault();
				// If not today, select from the timetable array
				if (!operationalDateContext.flags.is_today_selected) {
					const activeTripTimetableScheduleIndex = timetableDataForSelectedDate?.findIndex(arrival => arrival.trip_ids.includes(highlightedTripId));
					if (activeTripTimetableScheduleIndex !== undefined && activeTripTimetableScheduleIndex > -1) {
						const foundArrivalData = timetableDataForSelectedDate?.[activeTripTimetableScheduleIndex + (event.key === 'ArrowUp' ? -1 : 1)];
						if (foundArrivalData) {
							setActiveTripId(foundArrivalData.trip_ids[0]);
							return;
						}
					}
				}
				//
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [timetableDataForSelectedDate, highlightedTripId, operationalDateContext.flags.is_today_selected]);

	//
	// E. Define context value

	const contextValue: StopsDetailContextState = {
		actions: {
			resetActiveTripId,
			setActiveStopId,
			setActiveTripId,
		},
		data: {
			active_alerts: activeAlertsData,
			highlighted_pattern: highlightedPattern,
			highlighted_shape: highlightedShape,
			highlighted_trip_id: highlightedTripId,
			lines: associatedLinesData,
			stop: selectedStopData,
			timetable: timetableDataForSelectedDate,
		},
		flags: {
			is_favorite: isFavoriteData,
			is_loading: isLoading || stopsContext.flags.is_loading || linesContext.flags.is_loading,
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
