'use client';

/* * */

import type { GoApiResponse } from '@carrismetropolitana/website-shared-types';
import type { HubPattern } from '@tmlmobilidade/go-types-public-info';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';
import { type Arrival } from '@/types/stops.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { convertGTFSTimeStringAndOperationalDateToUnixTimestamp } from '@tmlmobilidade/utils';
import { DateTime } from 'luxon';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

export interface MergedArrival extends Arrival {
	stop_id: string
	stop_long_name: string
	stop_short_name: string
	warnings: ArrivalWarning[]
}

export interface ArrivalWarning {
	cause: string
	effect: string
}

interface TripUpdatesFeed {
	entity: TripUpdateEntity[]
}

interface TripUpdateEntity {
	trip_update?: null | {
		stop_time_update?: null | TripUpdateStopTime[]
		trip: {
			route_id: string
			trip_id: string
		}
		vehicle?: null | {
			id?: null | string
		}
	}
}

interface TripUpdateStopTime {
	arrival?: null | {
		time?: null | number
	}
	stop_id: string
	stop_sequence?: null | number
}

interface PreparedTripUpdate {
	arrival_time_unix: number
	stop_id: string
	trip_id: string
	vehicle_id: null | string
}

interface PipsArrivalsContextState {
	actions: {
		revalidate: () => void
	}
	data: {
		merged_arrivals: MergedArrival[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const PipsArrivalsContext = createContext<PipsArrivalsContextState | undefined>(undefined);

export function usePipsArrivalsContext() {
	const context = useContext(PipsArrivalsContext);
	if (!context) {
		throw new Error('usePipsArrivalsContext must be used within a PipsArrivalsContextProvider');
	}
	return context;
}

/* * */

export const PipsArrivalsContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const stopsPipContext = useStopsPipContext();
	const alertsContext = useAlertsContext();
	const operationalDateContext = useOperationalDateContext();

	//
	// B. Fetch data for all stops

	const stopIds = useMemo(() => stopsPipContext.data.stops.map(stop => String(stop._id)), [stopsPipContext.data.stops]);
	const patternIds = useMemo(() => {
		return Array.from(new Set(stopsPipContext.data.stops.flatMap(stop => stop.pattern_ids))).sort();
	}, [stopsPipContext.data.stops]);

	const fetchPatterns = async (url: string) => {
		const patternIdsFromUrl = url.split('?patternIds=')[1]?.split(',') || [];
		if (patternIdsFromUrl.length === 0) return [];

		const patternPromises = patternIdsFromUrl.map(async (patternId) => {
			const response = await fetch(`${getPublicVariable('go_api_url')}/hub/api/v1/network/patterns/${encodeURIComponent(patternId)}`);
			if (!response.ok) return [];
			const payload = await response.json() as GoApiResponse<HubPattern[]>;
			return payload.data ?? [];
		});

		return (await Promise.all(patternPromises)).flat();
	};

	const { data: patternsData, isLoading: patternsLoading } = useSWR<HubPattern[]>(
		patternIds.length > 0 ? `patterns-multi?patternIds=${patternIds.join(',')}` : null,
		fetchPatterns,
		{ refreshInterval: 900000 }, // 15 minutes
	);

	const { data: tripUpdatesResponse, isLoading: tripUpdatesLoading, mutate: revalidateTripUpdates } = useSWR<GoApiResponse<TripUpdatesFeed>, Error>(
		stopIds.length > 0 ? `${getPublicVariable('go_api_url')}/hub/api/v1/realtime/trip-updates` : null,
		{ refreshInterval: 30000 }, // 30 seconds
	);

	//
	// C. Transform data

	const tripUpdatesMap = useMemo(() => {
		const map = new Map<string, PreparedTripUpdate>();
		const tripUpdatesData = tripUpdatesResponse?.data;
		if (!tripUpdatesData?.entity?.length) return map;

		for (const entity of tripUpdatesData.entity) {
			const tripUpdate = entity.trip_update;
			if (!tripUpdate?.stop_time_update?.length) continue;

			for (const stopTimeUpdate of tripUpdate.stop_time_update) {
				const arrivalTime = stopTimeUpdate.arrival?.time;
				if (!arrivalTime) continue;

				const key = `${tripUpdate.trip.trip_id}-${stopTimeUpdate.stop_id}`;
				map.set(key, {
					arrival_time_unix: arrivalTime,
					stop_id: stopTimeUpdate.stop_id,
					trip_id: tripUpdate.trip.trip_id,
					vehicle_id: tripUpdate.vehicle?.id ?? null,
				});
			}
		}

		return map;
	}, [tripUpdatesResponse]);

	const mergedArrivals = useMemo<MergedArrival[]>(() => {
		if (!patternsData || !stopsPipContext.data.stops.length || !operationalDateContext.data.selected_date) return [];

		const flatArrivals: MergedArrival[] = [];
		const stopIdsSet = new Set(stopIds);
		const stopById = new Map(stopsPipContext.data.stops.map(stop => [String(stop._id), stop]));
		const nowInMilliseconds = Date.now();

		for (const patternData of patternsData) {
			if (!patternData.valid_on.includes(operationalDateContext.data.selected_date.operational_date)) continue;

			for (const tripData of patternData.trips) {
				if (!tripData.valid_on.includes(operationalDateContext.data.selected_date.operational_date)) continue;

				for (const stopTime of tripData.schedule) {
					if (!stopIdsSet.has(String(stopTime.stop_id))) continue;

					const stop = stopById.get(String(stopTime.stop_id));
					if (!stop) continue;

					const isLastStop = stopTime.stop_sequence === patternData.path[patternData.path.length - 1].stop_sequence;
					if (isLastStop) continue;

					const scheduledArrivalMs = convertGTFSTimeStringAndOperationalDateToUnixTimestamp(stopTime.arrival_time, operationalDateContext.data.selected_date.operational_date);
					const scheduledArrivalUnix = Math.floor(scheduledArrivalMs / 1000);
					const tripUpdate = operationalDateContext.flags.is_today_selected
						? tripData.trip_ids.map(tripId => tripUpdatesMap.get(`${tripId}-${stopTime.stop_id}`)).find(Boolean)
						: undefined;
					const estimatedArrivalUnix = tripUpdate?.arrival_time_unix ?? null;
					const warningsMap = new Map<string, ArrivalWarning>();
					const matchingAlerts = [
						...alertsContext.actions.getAlertsByStopId(String(stop._id)),
						...alertsContext.actions.getAlertsByLineId(patternData.line_id),
					].filter(alert => !alert.active_period_end_date || alert.active_period_end_date >= nowInMilliseconds);

					for (const alert of matchingAlerts) {
						const key = `${alert.effect}|${alert.cause}`;
						if (!warningsMap.has(key)) {
							warningsMap.set(key, { cause: alert.cause, effect: alert.effect });
						}
					}

					flatArrivals.push({
						estimated_arrival: estimatedArrivalUnix ? DateTime.fromSeconds(estimatedArrivalUnix).toFormat('HH:mm') : null,
						estimated_arrival_unix: estimatedArrivalUnix,
						headsign: patternData.headsign,
						line_id: patternData.line_id,
						observed_arrival: null,
						observed_arrival_unix: null,
						pattern_id: patternData._id,
						route_id: patternData.route_id,
						scheduled_arrival: DateTime.fromSeconds(scheduledArrivalUnix).toFormat('HH:mm'),
						scheduled_arrival_unix: scheduledArrivalUnix,
						stop_id: String(stop._id),
						stop_long_name: stop.name,
						stop_sequence: stopTime.stop_sequence,
						stop_short_name: stop.short_name,
						trip_id: tripUpdate?.trip_id ?? tripData.trip_ids[0] ?? '',
						vehicle_id: tripUpdate?.vehicle_id ?? null,
						warnings: Array.from(warningsMap.values()),
					});
				}
			}
		}

		// Filter and sort by time
		const nowInUnixSeconds = DateTime.now().toSeconds();
		const futureArrivals = flatArrivals
			.filter((arrival) => {
				// Only show future arrivals
				if (arrival.observed_arrival_unix) return false;
				const arrivalTime = arrival.estimated_arrival_unix || arrival.scheduled_arrival_unix;
				return arrivalTime >= nowInUnixSeconds;
			})
			.sort((a, b) => {
				const timeA = a.estimated_arrival_unix || a.scheduled_arrival_unix;
				const timeB = b.estimated_arrival_unix || b.scheduled_arrival_unix;
				return timeA - timeB;
			})
			.slice(0, 50); // Limit to first 50 arrivals

		return futureArrivals;
	}, [patternsData, stopsPipContext.data.stops, operationalDateContext.data.selected_date, operationalDateContext.flags.is_today_selected, stopIds, tripUpdatesMap, alertsContext.actions]);

	//
	// D. Define context value

	const contextValue: PipsArrivalsContextState = useMemo(() => ({
		actions: {
			revalidate: () => {
				void revalidateTripUpdates();
			},
		},
		data: {
			merged_arrivals: mergedArrivals,
		},
		flags: {
			is_loading: patternsLoading || tripUpdatesLoading || stopsPipContext.flags.is_loading,
		},
	}), [mergedArrivals, patternsLoading, revalidateTripUpdates, stopsPipContext.flags.is_loading, tripUpdatesLoading]);

	//
	// E. Render components

	return (
		<PipsArrivalsContext.Provider value={contextValue}>
			{children}
		</PipsArrivalsContext.Provider>
	);

	//
};
