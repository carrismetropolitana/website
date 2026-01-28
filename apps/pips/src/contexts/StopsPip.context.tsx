'use client';

/* * */

import { useStopsContext } from '@/contexts/Stops.context';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/* * */

interface StopsPipContextState {
	data: {
		stops: Stop[]
	}
	display: {
		auto_scroll: boolean
		scale: number
		scroll_pause: number
		scroll_speed: number
	}
	filters: {
		max_lines: number
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

	const [dataStopsState, setDataStopsState] = useState<Stop[]>([]);
	const [stopsLoading, setStopsLoading] = useState(true);

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

	// Display configuration parameters
	const scale = useMemo(() => {
		const raw = searchParams.get('scale');
		const parsed = parseFloat(raw);
		// Validate range: 0.5 to 3.0
		if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 3.0) {
			return parsed;
		}
		return 1.0; // Default scale
	}, [searchParams]);

	const autoScroll = useMemo(() => {
		const raw = searchParams.get('auto_scroll');
		return raw === 'true' || raw === '1';
	}, [searchParams]);

	const scrollSpeed = useMemo(() => {
		const raw = searchParams.get('scroll_speed');
		const parsed = parseInt(raw);
		// Validate range: 10ms to 500ms
		if (!isNaN(parsed) && parsed >= 10 && parsed <= 500) {
			return parsed;
		}
		return 50; // Default scroll speed in ms
	}, [searchParams]);

	const scrollPause = useMemo(() => {
		const raw = searchParams.get('scroll_pause');
		const parsed = parseInt(raw);
		// Validate range: 500ms to 10000ms
		if (!isNaN(parsed) && parsed >= 500 && parsed <= 10000) {
			return parsed;
		}
		return 2000; // Default pause duration in ms
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
				.filter((stop): stop is Stop => !!stop)
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
			stops: dataStopsState,
		},
		display: {
			auto_scroll: autoScroll,
			scale,
			scroll_pause: scrollPause,
			scroll_speed: scrollSpeed,
		},
		filters: {
			max_lines: maxLines,
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
