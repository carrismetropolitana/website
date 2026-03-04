'use client';

/* * */

import type { AlertCause, AlertEffect } from '@/types/alerts.types';

import { useAlertsContext } from '@/contexts/Alerts.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';
import { type Arrival } from '@/types/stops.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

export interface MergedArrival extends Arrival {
	stop_id: string
	stop_long_name: string
	stop_short_name: string
	warnings: ArrivalWarning[]
}

export interface ArrivalWarning {
	cause: AlertCause
	effect: AlertEffect
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

export const PipsArrivalsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const stopsPipContext = useStopsPipContext();
	const alertsContext = useAlertsContext();

	//
	// B. Fetch data for all stops

	const stopIds = useMemo(() => stopsPipContext.data.stops.map(stop => stop.id), [stopsPipContext.data.stops]);

	// Create a fetcher that handles multiple stops
	const fetcher = async (url: string) => {
		const stopIdsFromUrl = url.split('?stopIds=')[1]?.split(',') || [];
		if (stopIdsFromUrl.length === 0) return [];

		const arrivalsPromises = stopIdsFromUrl.map(async (stopId) => {
			try {
				const response = await fetch(`${getPublicVariable('api_url')}/arrivals/by_stop/${stopId}`);
				if (!response.ok) return { arrivals: [], stopId };
				const arrivals: Arrival[] = await response.json();
				return { arrivals, stopId };
			}
			catch (error) {
				console.error(`Error fetching arrivals for stop ${stopId}:`, error);
				return { arrivals: [], stopId };
			}
		});

		const results = await Promise.all(arrivalsPromises);
		return results;
	};

	const { data: arrivalsData, isLoading: arrivalsLoading, mutate: revalidateArrivals } = useSWR(
		stopIds.length > 0 ? `arrivals-multi?stopIds=${stopIds.join(',')}` : null,
		fetcher,
		{ refreshInterval: 10000 }, // 10 seconds
	);

	//
	// C. Transform data

	const mergedArrivals = useMemo<MergedArrival[]>(() => {
		if (!arrivalsData || !stopsPipContext.data.stops.length) return [];

		const flatArrivals: MergedArrival[] = [];

		arrivalsData.forEach(({ arrivals, stopId }) => {
			const stop = stopsPipContext.data.stops.find(s => s.id === stopId);
			if (!stop) return;

			arrivals.forEach((arrival) => {
				const warningsMap = new Map<string, ArrivalWarning>();
				const now = new Date();

				const matchingAlerts = (alertsContext.data.simplified || []).filter((alert) => {
					const isActive = alert.end_date ? alert.end_date >= now : true;
					if (!isActive) return false;

					return alert.informed_entity.some((entity) => {
						const matchesStop = entity.stop_id ? entity.stop_id === stopId : false;
						const matchesExactRoute = entity.route_id ? entity.route_id === arrival.route_id : false;
						const matchesLineId = entity.line_id ? entity.line_id === arrival.line_id : false;
						const matchesRoutePrefixForLine = entity.route_id ? entity.route_id.startsWith(arrival.line_id) : false;
						return matchesStop || matchesExactRoute || matchesLineId || matchesRoutePrefixForLine;
					});
				});

				matchingAlerts.forEach((alert) => {
					const key = `${alert.effect}|${alert.cause}`;
					if (!warningsMap.has(key)) {
						warningsMap.set(key, { cause: alert.cause, effect: alert.effect });
					}
				});

				flatArrivals.push({
					...arrival,
					stop_id: stopId,
					stop_long_name: stop.long_name,
					stop_short_name: stop.short_name,
					warnings: Array.from(warningsMap.values()),
				});
			});
		});

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
	}, [arrivalsData, stopsPipContext.data.stops, alertsContext.data.simplified]);

	//
	// D. Define context value

	const contextValue: PipsArrivalsContextState = useMemo(() => ({
		actions: {
			revalidate: () => {
				void revalidateArrivals();
			},
		},
		data: {
			merged_arrivals: mergedArrivals,
		},
		flags: {
			is_loading: arrivalsLoading,
		},
	}), [arrivalsLoading, mergedArrivals, revalidateArrivals]);

	//
	// E. Render components

	return (
		<PipsArrivalsContext.Provider value={contextValue}>
			{children}
		</PipsArrivalsContext.Provider>
	);

	//
};
