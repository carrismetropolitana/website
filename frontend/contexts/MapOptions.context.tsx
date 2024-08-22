'use client';

/* * */

import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const LOCAL_STORAGE_KEYS = {
	viewport_height: 'map|viewport_height',
};

const DEFAULT_OPTIONS = {
	viewport_height: { max: 600, min: 300 },
};

/* * */

interface MapOptionsContextState {
	actions: {
		setViewportHeight: (value: number) => void
	}
	data: {
		viewport_height: null | number
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const MapOptionsContext = createContext<MapOptionsContextState | undefined>(undefined);

export function useMapOptionsContext() {
	const context = useContext(MapOptionsContext);
	if (!context) {
		throw new Error('useMapOptionsContext must be used within a MapOptionsContextProvider');
	}
	return context;
}

/* * */

export const MapOptionsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataViewportHeightState, setDataViewportHeightState] = useState<MapOptionsContextState['data']['viewport_height']>(null);

	//
	// B. Transform data

	useEffect(() => {
		// Get viewport height from local storage
		if (typeof window === 'undefined') return;
		const viewportHeightLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.viewport_height);
		if (viewportHeightLocal) {
			setDataViewportHeightState(Number(viewportHeightLocal));
		}
	}, []);

	useEffect(() => {
		// Save viewport height to local storage
		if (typeof window === 'undefined' || dataViewportHeightState === null) return;
		const viewportHeightTxt = String(dataViewportHeightState);
		localStorage.setItem(LOCAL_STORAGE_KEYS.viewport_height, viewportHeightTxt);
	}, [dataViewportHeightState]);

	//
	// C. Handle actions

	const setViewportHeight = (value: number) => {
		if (value < DEFAULT_OPTIONS.viewport_height.min) value = DEFAULT_OPTIONS.viewport_height.min;
		if (value > DEFAULT_OPTIONS.viewport_height.max) value = DEFAULT_OPTIONS.viewport_height.max;
		setDataViewportHeightState(value);
	};

	//
	// D. Define context value

	const contextValue: MapOptionsContextState = {
		actions: {
			setViewportHeight,
		},
		data: {
			viewport_height: dataViewportHeightState,
		},
		flags: {
			is_loading: false,
		},
	};

	//
	// E. Render components

	return (
		<MapOptionsContext.Provider value={contextValue}>
			{children}
		</MapOptionsContext.Provider>
	);

	//
};
