'use client';

/* * */

import { availableFormats, DEFAULT_LOCALE_CODE, defaultLocale, enabledLocales, getMatchingLocale, LOCALE_STORAGE_KEY } from '@/i18n/config';
import { useLocalStorage } from '@mantine/hooks';
import { NextIntlClientProvider } from 'next-intl';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useEffect, useMemo } from 'react';

/* * */

interface LocaleContextState {
	actions: {
		setCurrentLocale: (localeCode: string) => void
	}
	data: {
		current_locale: string
	}
}

/* * */

const LocaleContext = createContext<LocaleContextState | undefined>(undefined);

export function useLocaleContext() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocaleContext must be used within a LocaleContextProvider');
	}
	return context;
}

/* * */

export const LocaleContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [currentLocale, setCurrentLocale] = useLocalStorage<string>({ defaultValue: DEFAULT_LOCALE_CODE, key: LOCALE_STORAGE_KEY });

	const [currentLocaleQueryParam, setCurrentLocaleQueryParam] = useQueryState(LOCALE_STORAGE_KEY);

	const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	//
	// B. Transform data

	const currentLocaleMessages = useMemo(() => {
		const matchingLocale = enabledLocales.find(item => item._id === currentLocale || item.alias.includes(currentLocale));
		if (matchingLocale) return matchingLocale.messages;
		else return defaultLocale.messages;
	}, [currentLocale]);

	//
	// C. Handle actions

	useEffect(() => {
		// Skip if window is undefined
		if (typeof window === 'undefined') return;
		// Set the HTML lang attribute
		document.documentElement.lang = currentLocale;
		console.log(`Set HTML lang attribute to: ${currentLocale}`);
		console.log(`Current time zone: ${document.documentElement.lang}`);
	}, [currentLocale]);

	useEffect(() => {
		// Ensure a valid locale is always set
		const matchingLocale = getMatchingLocale(currentLocale);
		// Exit if a match is found
		if (matchingLocale) return;
		// If no match is found, log a warning and set the default locale
		console.warn(`Invalid locale: ${currentLocale}. Setting to default locale: ${defaultLocale._id}`);
		setCurrentLocale(defaultLocale._id);
	}, [currentLocale]);

	useEffect(() => {
		// Exit if no query param is set
		if (!currentLocaleQueryParam) return;
		// Try to match the query param value with an enabled locale
		const matchingLocale = getMatchingLocale(currentLocaleQueryParam);
		// If no match is found, log a warning and set the locale to the default
		if (!matchingLocale) console.warn(`Invalid locale query param: ${currentLocaleQueryParam}`);
		// If a match is found, set the current locale to the query param value
		else setCurrentLocale(currentLocaleQueryParam);
		// Clear the query param to avoid infinite loop
		setCurrentLocaleQueryParam(null);
	}, [currentLocaleQueryParam]);

	//
	// D. Define context value

	const contextValue: LocaleContextState = {
		actions: {
			setCurrentLocale,
		},
		data: {
			current_locale: currentLocale,
		},
	};

	//
	// E. Render components

	return (
		<LocaleContext.Provider value={contextValue}>
			<NextIntlClientProvider
				formats={availableFormats}
				locale={currentLocale}
				messages={currentLocaleMessages}
				timeZone={currentTimeZone ?? 'Europe/Lisbon'}
			>
				{children}
			</NextIntlClientProvider>
		</LocaleContext.Provider>
	);

	//
};
