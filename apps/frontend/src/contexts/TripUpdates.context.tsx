'use client';

import { API_ROUTES } from '@tmlmobilidade/consts';
import { type GtfsRtFeedMessage } from '@tmlmobilidade/go-types-gtfs-rt';
import { type UnixTimestamp, validateUnixTimestamp } from '@tmlmobilidade/go-types-shared';
import { createContext, type PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

export interface PreparedTripUpdate {
	arrival_time: UnixTimestamp
	delay: number
	stop_id: string
	trip_id: string
	vehicle_id: string
}

interface TripUpdatesContextState {
	actions: {
		getTripUpdateForStop: (tripIds: string[], stopId: string) => PreparedTripUpdate | undefined
	}
	data: {
		map: Map<string, PreparedTripUpdate>
	}
	flags: {
		error: Error | undefined
		isLoading: boolean
	}
}

/* * */

const TripUpdatesContext = createContext<TripUpdatesContextState | undefined>(undefined);

export function useTripUpdatesContext() {
	const context = useContext(TripUpdatesContext);
	if (!context) {
		throw new Error('useTripUpdatesContext must be used within a TripUpdatesContextProvider');
	}
	return context;
}

/* * */

export function TripUpdatesContextProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Fetch data

	const { data: tripUpdatesData, error: tripUpdatesError, isLoading: tripUpdatesLoading } = useSWR<GtfsRtFeedMessage, Error>({ credentials: 'omit', url: API_ROUTES.hub.REALTIME_TRIP_UPDATES }, { refreshInterval: 30_000 }); // 30 seconds

	//
	// B. Transform data

	const tripUpdatesMap = useMemo(() => {
		// Setup a new map instance
		const map = new Map<string, PreparedTripUpdate>();
		// If there is no data, return the empty map
		if (!tripUpdatesData?.entity?.length) return map;
		// Iterate over the entities
		for (const entity of tripUpdatesData?.entity ?? []) {
			// Skip if the trip update does not have stop time updates
			if (!entity.trip_update?.stop_time_update?.length) continue;
			// Iterate over each stop time update for this trip entity
			for (const stopTimeUpdate of entity.trip_update.stop_time_update) {
				// Set a unique key for this object based on
				// the trip id, stop id and stop sequence
				const key = `${entity.trip_update.trip.trip_id}-${stopTimeUpdate.stop_id}`;
				// Prepare the trip update
				const preparedTripUpdate: PreparedTripUpdate = {
					arrival_time: validateUnixTimestamp(stopTimeUpdate.arrival.time * 1000),
					delay: stopTimeUpdate.arrival.delay ?? 0,
					stop_id: stopTimeUpdate.stop_id,
					trip_id: entity.trip_update.trip?.trip_id,
					vehicle_id: entity.trip_update.vehicle.id,
				};
				// Add the trip update to the map
				map.set(key, preparedTripUpdate);
			}
		}
		return map;
	}, [tripUpdatesData]);

	// console.log('tripUpdatesMap:', tripUpdatesMap);

	//
	// C. Handle actions

	const getTripUpdateForStop = useCallback((tripIds: string[], stopId: string): PreparedTripUpdate | undefined => {
		let keyMatch: PreparedTripUpdate | undefined;

		// Iterate over each trip id and return the first trip update that matches the stop id and stop sequence.
		// This is because data in the Network API is compressed — there is no information
		// on which days the trip ID is valid, only that all those trip IDs are valid on those days.
		for (const tripId of tripIds) {
			// Set a unique key for this object based on
			const key = `${tripId}-${stopId}`;

			if (tripUpdatesMap.has(key)) {
				keyMatch = tripUpdatesMap.get(key);
				break;
			}
		}
		return keyMatch ?? undefined;
	}, [tripUpdatesMap]);

	//
	// D. Define context value

	const contextValue: TripUpdatesContextState = useMemo(() => {
		return {
			actions: {
				getTripUpdateForStop,
			},
			data: {
				map: tripUpdatesMap,
			},
			flags: {
				error: tripUpdatesError,
				isLoading: tripUpdatesLoading,
			},
		};
	}, [getTripUpdateForStop, tripUpdatesError, tripUpdatesLoading, tripUpdatesMap]);

	//
	// E. Render components

	return (
		<TripUpdatesContext.Provider value={contextValue}>
			{children}
		</TripUpdatesContext.Provider>
	);
};
