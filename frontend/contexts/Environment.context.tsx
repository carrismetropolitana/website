'use client';

/* * */

import { createContext, useContext } from 'react';

/* * */

const EnvironmentContext = createContext<string | undefined>(undefined);

export function useEnvironmentContext() {
	const context = useContext(EnvironmentContext);
	if (!context) {
		throw new Error('useEnvironmentContext must be used within a EnvironmentContextProvider');
	}
	return context;
}

/* * */

export const EnvironmentContextProvider = ({ children, value }) => {
	return (
		<EnvironmentContext.Provider value={value}>
			{children}
		</EnvironmentContext.Provider>
	);
};
