'use client';

/* * */

import { useStopsContext } from '@/contexts/Stops.context';
import { type HubStop } from '@tmlmobilidade/go-types-public-info';
import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* * */

export type PipsDisplayOrientation = 'landscape' | 'vertical';
export type PipsDisplayRotation = 'ccw' | 'cw';

interface StopsPipContextState {
	data: {
		pip_id?: string
		stops: HubStop[]
	}
	display: {
		orientation: PipsDisplayOrientation
		rotation: PipsDisplayRotation
		scale: number
	}
	flags: {
		is_loading: boolean
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
	const pathname = usePathname();

	const [dataStopsState, setDataStopsState] = useState<HubStop[]>([]);
	const [stopsLoading, setStopsLoading] = useState(true);

	const stopIds = useMemo(() => {
		const raw = searchParams.get('stop_ids');
		return raw ? raw.split(',') : [];
	}, [searchParams]);

	const pipId = useMemo(() => {
		const raw = searchParams.get('pip_id');
		return raw && raw.trim().length > 0 ? raw.trim() : undefined;
	}, [searchParams]);

	const maxStops = useMemo(() =>
		parseInt(searchParams.get('max_stops')) || undefined,
	[searchParams]);

	// Display configuration parameters
	const scale = useMemo(() => {
		const raw = searchParams.get('scale');
		const parsed = parseFloat(raw);
		// Validate range: 0.1 to 3.0
		if (!isNaN(parsed) && parsed >= 0.1 && parsed <= 3.0) {
			return parsed;
		}
		return 1.0; // Default scale
	}, [searchParams]);

	const orientation = useMemo<PipsDisplayOrientation>(() => {
		const raw = searchParams.get('orientation');
		return raw === 'vertical' ? 'vertical' : 'landscape';
	}, [searchParams]);

	const rotation = useMemo<PipsDisplayRotation>(() => {
		const raw = searchParams.get('rotation');
		return raw === 'ccw' ? 'ccw' : 'cw';
	}, [searchParams]);

	//
	// B. Transform data

	/**
	 * Populate stopsData state when stopIds change.
	 * Use data from stopsContext to avoid fetching the same data twice.
	 */
	useEffect(() => {
		if (stopsContext.flags.is_loading) return;

		setStopsLoading(true);

		if (!stopIds.length || !stopsContext.data.stops?.length) {
			setDataStopsState([]);
			setStopsLoading(false);
			return;
		}

		Promise.resolve().then(() => {
			const foundStops = stopIds
				.map(id => stopsContext.actions.getStopById(id))
				.filter((stop): stop is HubStop => !!stop)
				.slice(0, maxStops);

			setDataStopsState(foundStops);
			setStopsLoading(false);

			const missingIds = stopIds.filter(id => !stopsContext.actions.getStopById(id));
			if (missingIds.length > 0) {
				console.warn(`Missing stop IDs: ${missingIds.join(', ')}`);
			}
		});
	}, [stopIds, stopsContext.data.stops]);

	//
	// C. Handle actions

	useEffect(() => {
		if (pathname === '/' && searchParams.toString() === '') {
			setDataStopsState([]);
		}
	}, [pathname, searchParams]);

	//
	// D. Define context value

	const contextValue: StopsPipContextState = {
		data: {
			pip_id: pipId,
			stops: dataStopsState,
		},
		display: {
			orientation,
			rotation,
			scale,
		},
		flags: {
			is_loading: stopsLoading,
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
