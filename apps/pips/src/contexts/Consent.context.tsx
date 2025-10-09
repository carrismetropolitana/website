'use client';

/* * */

import { expireAllCookies } from '@/utils/expire-all-cookies.util';
import { DateTime } from 'luxon';
import { createContext, useContext, useEffect, useState } from 'react';

/* * */

const DECISION_EXPIRATION_IN_DAYS_YES = 365;
const DECISION_EXPIRATION_IN_DAYS_NO = 10;

const LOCAL_STORAGE_KEYS = {
	decision_date: 'consent|decision_date',
	enabled_analytics: 'consent|enabled_analytics',
	enabled_functional: 'consent|enabled_functional',
};

/* * */

type AvailableConsentOption = 'analytics' | 'functional';

/* * */

interface ConsentContextState {
	actions: {
		ask: () => void
		disable: (options: AvailableConsentOption[]) => void
		enable: (options: AvailableConsentOption[]) => void
		reset: () => void
	}
	data: {
		ask_for_consent: boolean
		enabled_analytics: boolean
		enabled_functional: boolean
		init_status: boolean
	}
}

/* * */

const ConsentContext = createContext<ConsentContextState | undefined>(undefined);

export function useConsentContext() {
	const context = useContext(ConsentContext);
	if (!context) {
		throw new Error('useConsentContext must be used within a ConsentContextProvider');
	}
	return context;
}

/* * */

export const ConsentContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataEnabledAnalyticsState, setDataEnabledAnalyticsState] = useState<ConsentContextState['data']['enabled_analytics']>(false);
	const [dataEnabledFunctionalState, setDataEnabledFunctionalState] = useState<ConsentContextState['data']['enabled_functional']>(false);

	const [consentSystemInitStatus, setConsentSystemInitStatus] = useState<boolean>(false);
	const [localStorageDecisionDateValue, setLocalStorageDecisionDateValue] = useState<null | string>(null);
	const [localStorageEnabledAnalyticsValue, setLocalStorageEnabledAnalyticsValue] = useState<null | string>(null);
	const [localStorageEnabledFunctionalValue, setLocalStorageEnabledFunctionalValue] = useState<null | string>(null);

	const [askForConsent, setAskForConsent] = useState<boolean>(false);

	//
	// B. Fetch data

	useEffect(() => {
		// Get previously stored decision values from local storage
		// on a regular interval to accomodate changes made in other tabs.
		const interval = setInterval(() => {
			if (typeof localStorage === 'undefined') return;
			const decisionDate = localStorage.getItem(LOCAL_STORAGE_KEYS.decision_date);
			const enabledAnalytics = localStorage.getItem(LOCAL_STORAGE_KEYS.enabled_analytics);
			const enabledFunctional = localStorage.getItem(LOCAL_STORAGE_KEYS.enabled_functional);
			setLocalStorageDecisionDateValue(decisionDate);
			setLocalStorageEnabledAnalyticsValue(enabledAnalytics);
			setLocalStorageEnabledFunctionalValue(enabledFunctional);
			setConsentSystemInitStatus(true);
		}, 1000);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		//

		//
		// Ensure the consent system has been initialized
		// before proceeding with the consent validation.

		if (!consentSystemInitStatus) return;

		//
		// In order to validate proper consent,
		// we need to perform a series of checks to each stored value.
		// If any of the checks fail, we reset the consent state.
		// First check if any of the stored values are missing.

		if (!localStorageDecisionDateValue || !localStorageEnabledAnalyticsValue || !localStorageEnabledFunctionalValue) {
			reset();
			return;
		}

		if (localStorageEnabledAnalyticsValue !== 'yes' && localStorageEnabledAnalyticsValue !== 'no') {
			reset();
			return;
		}

		if (localStorageEnabledFunctionalValue !== 'yes' && localStorageEnabledFunctionalValue !== 'no') {
			reset();
			return;
		}

		//
		// Next, check if the stored date is in a valid format.

		const decisionDateData = DateTime.fromFormat(localStorageDecisionDateValue, 'yyyyMMdd');

		if (!decisionDateData.isValid) {
			reset();
			return;
		}

		//
		// Next, check if the stored decision date has not expired.

		const daysSinceLastDecision = DateTime.now().diff(decisionDateData, 'days');

		const yesDecisionIsExpired = daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_YES;
		if ((localStorageEnabledAnalyticsValue === 'yes' && yesDecisionIsExpired) || (localStorageEnabledFunctionalValue === 'yes' && yesDecisionIsExpired)) {
			reset();
			return;
		}

		const noDecisionIsExpired = daysSinceLastDecision.days > DECISION_EXPIRATION_IN_DAYS_NO;
		if ((localStorageEnabledAnalyticsValue === 'no' && noDecisionIsExpired) || (localStorageEnabledFunctionalValue === 'no' && noDecisionIsExpired)) {
			reset();
			return;
		}

		//
		// Finally, set the local state.

		setDataEnabledAnalyticsState(localStorageEnabledAnalyticsValue === 'yes');
		setDataEnabledFunctionalState(localStorageEnabledFunctionalValue === 'yes');
		setAskForConsent(false);

		//
	}, [consentSystemInitStatus, localStorageDecisionDateValue, localStorageEnabledAnalyticsValue, localStorageEnabledFunctionalValue]);

	//
	// C. Handle actions

	const ask = () => {
		setAskForConsent(true);
	};

	const disable = (options: AvailableConsentOption[]) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
		if (options.includes('analytics')) localStorage.setItem(LOCAL_STORAGE_KEYS.enabled_analytics, 'no');
		if (options.includes('functional')) localStorage.setItem(LOCAL_STORAGE_KEYS.enabled_functional, 'no');
	};

	const enable = (options: AvailableConsentOption[]) => {
		localStorage.setItem(LOCAL_STORAGE_KEYS.decision_date, DateTime.now().toFormat('yyyyMMdd'));
		if (options.includes('analytics')) localStorage.setItem(LOCAL_STORAGE_KEYS.enabled_analytics, 'yes');
		if (options.includes('functional')) localStorage.setItem(LOCAL_STORAGE_KEYS.enabled_functional, 'yes');
	};

	const reset = () => {
		// Clear local storage
		localStorage.removeItem(LOCAL_STORAGE_KEYS.decision_date);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.enabled_analytics);
		localStorage.removeItem(LOCAL_STORAGE_KEYS.enabled_functional);
		// Clear cookies
		expireAllCookies();
		// Reset local state
		setAskForConsent(true);
	};

	//
	// D. Define context value

	const contextValue: ConsentContextState = {
		actions: {
			ask,
			disable,
			enable,
			reset,
		},
		data: {
			ask_for_consent: askForConsent,
			enabled_analytics: dataEnabledAnalyticsState,
			enabled_functional: dataEnabledFunctionalState,
			init_status: consentSystemInitStatus,
		},
	};

	//
	// E. Render components

	return (
		<ConsentContext.Provider value={contextValue}>
			{children}
		</ConsentContext.Provider>
	);

	//
};
