'use client';

/* * */

import pjson from '#/package.json';
import { type Ampli, ampli } from '@/amplitude';
import { useConsentContext } from '@/contexts/Consent.context';
import { GoogleTagManager } from '@next/third-parties/google';
import { createContext, useContext, useEffect } from 'react';

/* * */

interface DefaultEventProps {
	app_version: string
	domain: string
	locale: string
	pathname: string
	referrer?: string
	referring_domain?: string
}

interface AnalyticsContextState {
	actions: {
		capture: (callback: (instance: Ampli, props: DefaultEventProps) => void) => void
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
			capture((instance, props) => instance.sessionStarted(props));
		}
		else if (consentContext.data.init_status && ampli?.isLoaded) {
			ampli.client.setOptOut(true);
		}
	}, [consentContext.data.init_status, consentContext.data.enabled_analytics, ampli?.isLoaded]);

	const capture = (callback: (instance: Ampli, props: DefaultEventProps) => void) => {
		// Skip if analytics is disabled or Ampli is not loaded
		if (!consentContext.data.enabled_analytics || !ampli?.isLoaded) return;
		// Skip if window or document are not available
		if (typeof window === 'undefined' && typeof document === 'undefined') return;
		// Setup default properties for all events
		const defaultProps: DefaultEventProps = {
			app_version: pjson.version,
			domain: window.location.hostname,
			locale: document.documentElement.lang,
			pathname: window.location.pathname,
			referrer: document.referrer,
			referring_domain: document.referrer ? new URL(document.referrer).hostname : '',
		};
		// Execute the callback with the default event properties
		// callback(ampli, defaultProps);
	};

	const captureWithDelay = (() => {
		let timeout: NodeJS.Timeout | null = null;
		return (callback: (instance: Ampli) => void) => {
			if (!consentContext.data.enabled_analytics || !ampli?.isLoaded) return;
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				// callback(ampli);
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
			{consentContext.data.enabled_analytics && <GoogleTagManager gtmId="AW-17080796220" />}
			{children}
		</AnalyticsContext.Provider>
	);

	//
};
