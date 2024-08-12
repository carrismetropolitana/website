'use client';

/* * */

import { createContext, useContext, useState } from 'react';

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

	const [flagIsDebugModeState, setFlagIsDebugModeState] = useState<boolean>(false);

	//
	// B. Handle actions

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
