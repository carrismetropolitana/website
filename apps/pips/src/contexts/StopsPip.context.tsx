'use client';

/* * */

import { useStopsContext } from '@/contexts/Stops.context';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* * */

interface StopsPipContextState {
	data: {
		stops: Stop[]
	}
	filters: {
		max_lines: number
	}
}

/* * */

const StopsPipContext = createContext<StopsPipContextState | undefined>(undefined);

export function useStopsPipContext() {
	const context = useContext(StopsPipContext);
	if (!context) {
		throw new Error('useStopsListContext must be used within a StopsListContextProvider');
	}
	return context;
}

/* * */

export const StopsPipContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsContext();

	const searchParams = useSearchParams();
	const stopIds = useMemo(() => {
		const raw = searchParams.get('stop_ids');
		return raw ? raw.split(',') : [];
	}, [searchParams]);
	const maxLines = useMemo(() =>
		parseInt(searchParams.get('max_lines')) || undefined,
	[searchParams]);
	const maxStops = useMemo(() =>
		parseInt(searchParams.get('max_stops')) || undefined,
	[searchParams]);

	const [dataStopsState, setDataStopsState] = useState<Stop[]>([]);

	//
	// B. Fetch data

	/**
	 * Populate stopsData state when stopIds change.
	 * Use data from stopsContext to avoid fetching the same data twice.
	 */
	useEffect(() => {
		if (!stopIds.length || !stopsContext.data.stops?.length) return;

		const foundStops = stopIds
			.map(id => stopsContext.actions.getStopById(id))
			.filter((stop): stop is Stop => !!stop) // filter out undefined/null
			.slice(0, maxStops); // Maybe this doesn't make sense since we can restrict that in stop_ids !

		setDataStopsState(foundStops);

		// Optional: handle case where some stops were missing
		const missingIds = stopIds.filter(id =>
			!stopsContext.actions.getStopById(id),
		);
		if (missingIds.length > 0) {
			console.warn(`Missing stop IDs: ${missingIds.join(', ')}`);
		}
	}, [stopIds, stopsContext.data.stops]);

	//
	// C. Handle actions

	//
	// D. Define context value

	const contextValue: StopsPipContextState = {
		data: {
			stops: dataStopsState,
		},
		filters: {
			max_lines: maxLines,
		},
	};

	//
	// E. Render components

	return (
		<StopsPipContext.Provider value={contextValue}>
			{children}
		</StopsPipContext.Provider>
	);

	//
};
