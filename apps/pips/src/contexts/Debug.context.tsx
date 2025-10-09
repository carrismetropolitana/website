'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface DebugContextState {
	actions: {
		toggleDebugMode: () => void
	}
	flags: {
		is_debug_mode: boolean
	}
}

/* * */

const DebugContext = createContext<DebugContextState | undefined>(undefined);

export function useDebugContext() {
	const context = useContext(DebugContext);
	if (!context) {
		throw new Error('useDebugContext must be used within a DebugContextProvider');
	}
	return context;
}

/* * */

export const DebugContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const analyticsContext = useAnalyticsContext();

	const [flagIsDebugModeState, setFlagIsDebugModeState] = useState<boolean>(false);

	//
	// B. Handle actions

	useEffect(() => {
		// Capture debug mode state when it changes.
		// This should stay in its own use effect to ensure the latest value of flagIsDebugModeState is captured.
		if (flagIsDebugModeState) analyticsContext.actions.capture((ampli, props) => ampli.debugModeEnabled(props));
		else analyticsContext.actions.capture((ampli, props) => ampli.debugModeDisabled(props));
	}, [flagIsDebugModeState]);

	const toggleDebugMode = () => {
		setFlagIsDebugModeState(prev => !prev);
	};

	//
	// C. Define context value

	const contextValue: DebugContextState = {
		actions: {
			toggleDebugMode,
		},
		flags: {
			is_debug_mode: flagIsDebugModeState,
		},
	};

	//
	// D. Render components

	return (
		<DebugContext.Provider value={contextValue}>
			{children}
		</DebugContext.Provider>
	);

	//
};
