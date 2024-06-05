'use client';

/* * */

import parseDateToString from '@/services/parseDateToString';
import parseStringToDate from '@/services/parseStringToDate';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UAParser } from 'ua-parser-js';

import pjson from '../package.json';

/* * */

// 1.
// DEFAULT OPTIONS

const LOCAL_STORAGE_ENABLED_KEY = 'anonymous_analytics_enabled';
const LOCAL_STORAGE_VALIDITY_IN_DAYS = 365; // days

/* * */

// A.
// CREATE CONTEXT

const AppAnalyticsContext = createContext(null);

/* * */

// B.
// SETUP CUSTOM HOOKS

export function useAppAnalyticsContext() {
	return useContext(AppAnalyticsContext);
}

/* * */

// C.
// SETUP PROVIDER

export function AppAnalyticsContextProvider({ children }) {
	//

	//
	// A. Setup local state

	const [isCaptureEnabled, setIsCaptureEnabled] = useState();

	//
	// B. Retrieve authorization from local storage

	useEffect(() => {
		// Retrieve authorization value from local storage
		const savedAuthorizationString = localStorage.getItem(LOCAL_STORAGE_ENABLED_KEY);
		// If no authorization is found then disable capture and exit
		if (!savedAuthorizationString) {
			setIsCaptureEnabled(false);
			return;
		}
		// If an authorization value is found then check if it is still valid
		const savedAuthorizationDate = parseStringToDate(savedAuthorizationString);
		const maximumValidAuthorizationDate = (new Date()).setDate((new Date()).getDate() - LOCAL_STORAGE_VALIDITY_IN_DAYS);
		const isAuthorizationStillValid = savedAuthorizationDate > maximumValidAuthorizationDate;
		// If an authorization value is found then check if it is still valid
		setIsCaptureEnabled(isAuthorizationStillValid ? true : false);
		//
	}, []);

	//
	// C. Enable or Disable capture

	const enableCapture = useCallback(() => {
		// Set local state and save decision to local storage
		setIsCaptureEnabled(true);
		localStorage.setItem(LOCAL_STORAGE_ENABLED_KEY, parseDateToString(new Date()));
	}, []);

	const disableCapture = useCallback(() => {
		// Set local state and clear local storage
		setIsCaptureEnabled(false);
		localStorage.clear();
	}, []);

	//
	// D. Capture events

	const captureEvent = useCallback(
		async (key, properties = {}) => {
			try {
				// Only capture anonymous analytics if user has allowed it
				return;
				if (!isCaptureEnabled) return;
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
			catch (error) {
				console.log(error);
			}
		},
		[isCaptureEnabled],
	);

	//
	// E. Setup context object

	const contextObject = useMemo(
		() => ({
			capture: captureEvent,
			disable: disableCapture,
			enable: enableCapture,
			enabled: isCaptureEnabled,
		}),
		[isCaptureEnabled, enableCapture, captureEvent, disableCapture],
	);

	//
	// F. Return provider

	return <AppAnalyticsContext.Provider value={contextObject}>{children}</AppAnalyticsContext.Provider>;

	//
}
