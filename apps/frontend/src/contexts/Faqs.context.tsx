'use client';

/* * */

import { useLocaleContext } from '@/contexts/Locale.context';
import { DEFAULT_LOCALE_CODE, getMatchingLocale } from '@/i18n/config';
import { FaqTopicGroup } from '@/types/faq.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface FaqsContextState {
	data: {
		raw: FaqTopicGroup[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const FaqsContext = createContext<FaqsContextState | null>(null);

export function useFaqsContext() {
	const context = useContext(FaqsContext);
	if (!context) {
		throw new Error('useFaqsContext must be used within a FaqsContextProvider');
	}
	return context;
}

/* * */

export const FaqsContextProvider = ({ children }) => {
	//

	const localeContext = useLocaleContext();
	const currentLocale = localeContext.data.current_locale;

	//
	// B. Fetch data

	const matchingLocale = getMatchingLocale(currentLocale) ?? getMatchingLocale(DEFAULT_LOCALE_CODE);
	const normalizedLocaleCode = matchingLocale?._id ?? DEFAULT_LOCALE_CODE;
	const payloadLocale = normalizedLocaleCode === 'en' ? 'en' : 'pt-PT';
	const faqsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/faqs?locale=${payloadLocale}`;
	const { data: allFaqsData, isLoading: allFaqsLoading } = useSWR<FaqTopicGroup[], Error>(faqsApiUrl, { refreshInterval: 900000 }); // 15 minutes

	//
	// E. Define context value

	const contextValue: FaqsContextState = {
		data: {
			raw: allFaqsData || [],
		},
		flags: {
			is_loading: allFaqsLoading,
		},
	};

	//
	// F. Render components

	return (
		<FaqsContext.Provider value={contextValue}>
			{children}
		</FaqsContext.Provider>
	);

	//
};
