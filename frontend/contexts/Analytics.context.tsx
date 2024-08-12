'use client';

/* * */

import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { DateTime } from 'luxon';
import { createContext, useContext, useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

import pjson from '../package.json';

/* * */

const DECISION_EXPIRATION_IN_DAYS_YES = 365;
const DECISION_EXPIRATION_IN_DAYS_NO = 10;

const LOCAL_STORAGE_KEYS = {
	decision_date: 'analytics|decision_date',
	is_enabled: 'analytics|is_enabled',
};

/* * */

interface AnalyticsContextState {
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		capture: (key: any, properties?: Record<any, any>) => Promise<void>
		disable: () => void
		enable: () => void
		reset: () => void
	}
	flags: {
		is_enabled: 'no' | 'yes' | null
		should_ask: boolean
	}
}

/* * */

const AnalyticsContext = createContext<AnalyticsContextState | undefined>(undefined);

export function useAnalyticsContext() {
	const context = useContext(AnalyticsContext);
	if (!context) {
		throw new Error('useAnalyticsContext must be used within a AnalyticsContextProvider');
	}
	return context;
}

/* * */

export const AnalyticsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [flagIsEnabledState, setFlagIsEnabledState] = useState<AnalyticsContextState['flags']['is_enabled']>(null);
	const [flagShouldAskState, setFlagShouldAskState] = useState<boolean>(false);

	//
	// B. Fetch data

	useEffect(() => {
		// Get decision value from local storage
		if (typeof window === 'undefined') return;
		const isEnabledLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.is_enabled);
		const decisionDateLocal = localStorage.getItem(LOCAL_STORAGE_KEYS.decision_date);
		// Check if the stored value is known
		if (isEnabledLocal !== 'yes' && isEnabledLocal !== 'no' && isEnabledLocal !== null) {
			console.log('here1');
			reset();
			return;
		}
		// Check if stored date is in a valid format
		const decisionDateData = decisionDateLocal ? DateTime.fromFormat(decisionDateLocal, 'yyyyMMdd') : null;
		if (!decisionDateData?.isValid) {
			reset();
			return;
		};
		// Check if stored decision date has not expired
		const daysSinceLastDecision = DateTime.now().diff(decisionDateData, 'days');
		const yesDecisionIsExpired = flagIsEnabledState === 'yes' && daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_YES;
		const noDecisionIsExpired = flagIsEnabledState === 'no' && daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_NO;
		if (yesDecisionIsExpired || noDecisionIsExpired) {
			reset();
			return;
		}
		// Set local state
		setFlagIsEnabledState(isEnabledLocal);
		setFlagShouldAskState(false);
	});

	//
	// C. Handle actions

	const enable = () => {
		// Set local state and save decision to local storage
		setFlagIsEnabledState('yes');
		localStorage.setItem(LOCAL_STORAGE_KEYS.is_enabled, 'yes');
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
	};

	const disable = () => {
		// Set local state and save decision to local storage
		setFlagIsEnabledState('no');
		localStorage.setItem(LOCAL_STORAGE_KEYS.is_enabled, 'no');
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
	};

	const reset = () => {
		// Set local state and save decision to local storage
		setFlagIsEnabledState(null);
		setFlagShouldAskState(true);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.is_enabled);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.decision_date);
	};

	const capture = async (key, properties = {}) => {
		try {
			return;
			// Only capture anonymous analytics if user has allowed it
			// eslint-disable-next-line no-unreachable
			if (!flagIsEnabledState) return;
			// Parse user-agent string
			const parsedUserAgent = window.navigator.userAgent ? new UAParser(window.navigator.userAgent).getResult() : null;
			// Fetch all the other properties
			await fetch('https://stats.carrismetropolitana.pt/collector/usage/website', {
				body: JSON.stringify({
					//
					app_version: pjson.version,
					device_locale: navigator.language,
					device_screen_height: document.documentElement.clientHeight,
					device_screen_orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
					device_screen_width: document.documentElement.clientWidth,
					//
					device_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					//
					event_key: key,
					event_properties: properties,
					//
					fingerprint: await getCurrentBrowserFingerPrint(),
					//
					ip_address: null, // Server side
					//
					referer: document.referrer,
					//
					ua: parsedUserAgent?.ua,
					ua_browser_name: parsedUserAgent?.browser?.name,
					ua_browser_version: parsedUserAgent?.browser?.version,
					ua_cpu_architecture: parsedUserAgent?.cpu?.architecture,
					ua_device_model: parsedUserAgent?.device?.model,
					ua_device_type: parsedUserAgent?.device?.type,
					ua_device_vendor: parsedUserAgent?.device?.vendor,
					ua_engine_name: parsedUserAgent?.engine?.name,
					ua_engine_version: parsedUserAgent?.engine?.version,
					ua_os_name: parsedUserAgent?.os?.name,
					ua_os_version: parsedUserAgent?.os?.version,
					//
				}),
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				method: 'POST',
			});
		}
		// eslint-disable-next-line no-unreachable
		catch (error) {
			console.log(error);
		}
	};

	//
	// D. Define context value

	const contextValue: AnalyticsContextState = {
		actions: {
			capture,
			disable,
			enable,
			reset,
		},
		flags: {
			is_enabled: flagIsEnabledState,
			should_ask: flagShouldAskState,
		},
	};

	//
	// E. Render components

	return (
		<AnalyticsContext.Provider value={contextValue}>
			{children}
		</AnalyticsContext.Provider>
	);

	//
};
