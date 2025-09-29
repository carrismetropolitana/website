'use client';

/* * */

import { createContext, useContext, useEffect, useState } from 'react';

/* * */

interface EnvironmentContextState {
	actions: {
		getNormalizedHref: (href: string) => string
		set: (value: string) => void
	}
	data: {
		href: string
		value: string
	}
}

/* * */

const EnvironmentContext = createContext<EnvironmentContextState | undefined>(undefined);

export function useEnvironmentContext() {
	const context = useContext(EnvironmentContext);
	if (!context) {
		throw new Error('useEnvironmentContext must be used within a EnvironmentContextProvider');
	}
	return context;
}

/* * */

export const EnvironmentContextProvider = ({ children, value }) => {
	//

	//
	// A. Setup variables

	const [dataValueState, setDataValueState] = useState<EnvironmentContextState['data']['value']>(value);
	const [dataHrefState, setDataHrefState] = useState<EnvironmentContextState['data']['href']>('#');

	//
	// B. Transform data

	useEffect(() => {
		// Return early if undefined
		if (!dataValueState) return;
		// If value is 'website', set href to '/' (the default)
		if (dataValueState === 'website') setDataHrefState('/');
		// Else, set href to '/value'
		else setDataHrefState(`/${dataValueState}`);
		//
	}, [dataValueState]);

	//
	// C. Handle actions

	const set = (value: string) => {
		if (!value) return;
		setDataValueState(value);
	};

	const getNormalizedHref = (href: string) => {
		// Do nothing if undefined
		if (!href) return '#';
		// If environmet is 'website' (the default) only return href
		if (dataValueState === 'website') return href;
		// Check if href already includes a slash or not
		if (href.startsWith('/')) return `/${dataValueState}${href}`;
		else return `/${dataValueState}/${href}`;
	};

	//
	// D. Define context value

	const contextValue: EnvironmentContextState = {
		actions: {
			getNormalizedHref,
			set,
		},
		data: {
			href: dataHrefState,
			value: dataValueState,
		},
	};

	//
	// E. Render components

	return (
		<EnvironmentContext.Provider value={contextValue}>
			{children}
		</EnvironmentContext.Provider>
	);

	//
};
