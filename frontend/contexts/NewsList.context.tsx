'use client';

/* * */

import { NewsData } from '@/types/news.types';
import { DateTime } from 'luxon';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { useAnalyticsContext } from './Analytics.context';

/* * */

interface NewsListContextState {
	actions: {
		updateFilterByDate: (value: Date | null) => void
		updateFilterBySearch: (value: string) => void
	}
	data: {
		filtered: NewsData[]
		raw: NewsData[]
	}
	filters: {
		by_date: Date | null
		by_search: string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const NewsListContext = createContext<NewsListContextState | null>(null);

export function useNewsListContext() {
	const context = useContext(NewsListContext);
	if (!context) {
		throw new Error('useNewsListContext must be used within a NewsListContextProvider');
	}
	return context;
}

/* * */

export const NewsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFilteredState, setDataFilteredState] = useState<NewsData[]>([]);
	const [filterBySearch, setFilterBySearch] = useState<NewsListContextState['filters']['by_search']>('');
	const [filterByDate, setFilterByDate] = useState<NewsListContextState['filters']['by_date']>(null);

	const analyticsContext = useAnalyticsContext();

	//
	// B. Fetch data

	const { data: allNewsData, isLoading: allNewsLoading } = useSWR<NewsData[], Error>(`/api/news`, { refreshInterval: 30000 });

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: NewsData[] = allNewsData || [];

		//
		// Filter by news date

		if (filterBySearch) {
			filterResult = filterResult.filter((newsItem) => {
				const titleLowerCase = newsItem.title.toLowerCase();
				return titleLowerCase.includes(filterBySearch.toLowerCase());
			});
		}

		//
		// Filter by news title

		if (filterByDate) {
			filterResult = filterResult.filter((newsItem) => {
				const newsItemDate = DateTime.fromISO(newsItem.publish_date);
				return newsItemDate.hasSame(DateTime.fromJSDate(filterByDate), 'day');
			});
		}

		//
		// Save filter result to state

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredNews = applyFiltersToData();
		setDataFilteredState(filteredNews);
	}, [allNewsData, filterBySearch, filterByDate]);

	useEffect(() => {
		// analyticsContext.actions.capture(ampli => ampli.captureNewsReferer({ page_referer: document.referrer }));
	}, [allNewsData]);

	//
	// D. Handle actions

	const updateFilterBySearch = (value: NewsListContextState['filters']['by_search']) => {
		setFilterBySearch(value);
	};

	const updateFilterByDate = (value: NewsListContextState['filters']['by_date']) => {
		setFilterByDate(value);
	};

	//
	// E. Define context value

	const contextValue: NewsListContextState = {
		actions: {
			updateFilterByDate,
			updateFilterBySearch,
		},
		data: {
			filtered: dataFilteredState,
			raw: allNewsData || [],
		},
		filters: {
			by_date: filterByDate,
			by_search: filterBySearch,
		},
		flags: {
			is_loading: allNewsLoading,
		},
	};

	//
	// F. Render components

	return (
		<NewsListContext.Provider value={contextValue}>
			{children}
		</NewsListContext.Provider>
	);

	//
};
