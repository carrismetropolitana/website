'use client';

import { CampaignData } from '@/types/campaign.types';
/* * */

// import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { NewsData } from '@/types/news.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface CampaignsListContextState {
	actions: {
		updateFilterByDate: (value: null | string) => void
		updateFilterBySearch: (value: string) => void
	}
	data: {
		filtered: CampaignData[]
		raw: CampaignData[]
	}
	filters: {
		by_date: null | string
		by_search: string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const CampaignsListContext = createContext<CampaignsListContextState | null>(null);

export function useCampaignsListContext() {
	const context = useContext(CampaignsListContext);
	if (!context) {
		throw new Error('useCampaignsListContext must be used within a CampaignsListContextProvider');
	}
	return context;
}

/* * */

export const CampaignsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFilteredState, setDataFilteredState] = useState<CampaignData[]>([]);
	const [filterBySearch, setFilterBySearch] = useState<CampaignsListContextState['filters']['by_search']>('');
	const [filterByDate, setFilterByDate] = useState<CampaignsListContextState['filters']['by_date']>(null);

	// const analyticsContext = useAnalyticsContext();

	//
	// B. Fetch data

	const campaignsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns`;
	const { data: allCampaignsData, isLoading: allCampaignsLoading } = useSWR<CampaignData[], Error>(campaignsApiUrl, { refreshInterval: 900000 }); // 15 minutes

	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: CampaignData[] = allCampaignsData || [];

		//
		// Filter by news date

		if (filterBySearch) {
			filterResult = filterResult.filter((campaignItem) => {
				const titleLowerCase = campaignItem.title.toLowerCase();
				return titleLowerCase.includes(filterBySearch.toLowerCase());
			});
		}

		//
		// Filter by news title

		if (filterByDate) {
			filterResult = filterResult.filter((campaignItem) => {
				const campaignItemDate = DateTime.fromISO(campaignItem.updatedAt);
				return campaignItemDate.hasSame(DateTime.fromFormat(filterByDate, 'yyyy-MM-dd'), 'day');
			});
		}

		//
		// Save filter result to state

		return filterResult;

		//
	};

	useEffect(() => {
		const filteredCampaigns = applyFiltersToData();
		setDataFilteredState(filteredCampaigns);
	}, [allCampaignsData, filterBySearch, filterByDate]);

	//
	// D. Handle actions

	const updateFilterBySearch = (value: CampaignsListContextState['filters']['by_search']) => {
		setFilterBySearch(value);
	};

	const updateFilterByDate = (value: CampaignsListContextState['filters']['by_date']) => {
		setFilterByDate(value);
	};

	//
	// E. Define context value

	const contextValue: CampaignsListContextState = {
		actions: {
			updateFilterByDate,
			updateFilterBySearch,
		},
		data: {
			filtered: dataFilteredState,
			raw: allCampaignsData || [],
		},
		filters: {
			by_date: filterByDate,
			by_search: filterBySearch,
		},
		flags: {
			is_loading: allCampaignsLoading,
		},
	};

	//
	// F. Render components

	return (
		<CampaignsListContext.Provider value={contextValue}>
			{children}
		</CampaignsListContext.Provider>
	);

	//
};
