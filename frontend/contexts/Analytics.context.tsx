'use client';

/* * */

import { type Ampli, ampli } from '@/amplitude';
import { useConsentContext } from '@/contexts/Consent.context';
import pjson from '@/package.json';
import { expireAllCookies } from '@/utils/expire-all-cookies.util';
import { createContext, useContext, useEffect } from 'react';

/* * */

interface AnalyticsContextState {
	actions: {
		capture: (callback: (instance: Ampli) => void) => void
		captureWithDelay: (callback: (instance: Ampli) => void) => void
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

	const consentContext = useConsentContext();

	//
	// B. Handle actions

	useEffect(() => {
		if (consentContext.data.init_status && consentContext.data.enabled_analytics && !ampli?.isLoaded) {
			ampli.load({ client: { configuration: { appVersion: pjson.version, autocapture: false } }, environment: 'default' });
			ampli.client.setOptOut(false);
		}
		else if (consentContext.data.init_status && ampli?.isLoaded) {
			ampli.client.setOptOut(true);
			expireAllCookies();
		}
	}, [consentContext.data.init_status, consentContext.data.enabled_analytics, ampli?.isLoaded]);

	useEffect(() => {
		// Capture a ping event every minute
		const interval = setInterval(() => {
			if (typeof window !== 'undefined' && ampli?.isLoaded) {
				capture(() => ampli.ping({
					app_version: pjson.version,
					current_page: window.location.pathname,
				}));
			}
		}, 60000);
		return () => clearInterval(interval);
	});

	const capture = (callback: (instance: Ampli) => void) => {
		if (consentContext.data.enabled_analytics && ampli?.isLoaded) {
			if (typeof window !== 'undefined' && typeof document !== 'undefined') {
				const defaultProps = {
					app_version: pjson.version,
					event_date: new Date().toISOString(),
					page_domain: window.location.hostname,
					page_location: window.location.href,
					page_referer: document.referrer || window.location.origin,
					page_title: document.title,
				};

				const wrappedAmpli = new Proxy(ampli, {
					// Target is ampli and props is the event name
					get(target, prop) {
						if (typeof target[prop] === 'function') {
							return (eventProps = {}) => target[prop]({ ...defaultProps, ...eventProps });
						}
					},
				});

				callback(wrappedAmpli);
			};
		}
	};

	const captureWithDelay = (() => {
		let timeout: NodeJS.Timeout | null = null;

		return (callback: (instance: Ampli) => void) => {
			if (!consentContext.data.enabled_analytics || !ampli?.isLoaded) return;

			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				callback(ampli);
				timeout = null;
			}, 1000);
		};
	})();

	//
	// C. Define context value

	const contextValue: AnalyticsContextState = {
		actions: {
			capture,
			captureWithDelay,
		},
	};

	//
	// D. Render components

	return (
		<AnalyticsContext.Provider value={contextValue}>
			{children}
		</AnalyticsContext.Provider>
	);

	//
};
