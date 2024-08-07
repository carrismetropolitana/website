'use client';

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types.js';

import { DateTime } from 'luxon';
import { useLocale } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsContextState {
	actions: {
		getSimplifiedAlertById: (alert_id: string) => SimplifiedAlert | null
		updateFilterByDate: (value: string) => void
		updateFilterByMunicipality: (value: string) => void
	}
	counters: {
		by_date: {
			open: number
		}
	}
	data: {
		filtered: Alert[]
		raw: Alert[]
	}
	filters: {
		by_date: string
		by_line: null | string
		by_municipality: null | string
	}
	flags: {
		is_loading: boolean
	}
}

const initialContextState = {
	actions: {
		getSimplifiedAlertById: () => null,
		updateFilterByDate: () => { /**/ },
		updateFilterByMunicipality: () => { /**/ },
	},
	counters: {
		by_date: {
			open: 0,
		},
	},
	data: {
		filtered: [],
		raw: [],
	},
	filters: {
		by_date: 'current',
		by_line: null,
		by_municipality: null,
	},
	flags: {
		is_loading: true,
	},
};

const AlertsContext = createContext<AlertsContextState>(initialContextState);

export function useAlertsContext() {
	return useContext(AlertsContext);
}

/* * */

export const AlertsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();

	//
	// B. Setup state

	const [dataFilteredState, setDataFilteredState] = useState<Alert[]>([]);
	const [filtersState, setFiltersState] = useState<AlertsContextState['filters']>(initialContextState.filters);

	//
	// C. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');

	//
	// D. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: Alert[] = allAlertsData || [];

		//
		// Filter by_date
		const nowInUnixSeconds = DateTime.now().startOf('day').toSeconds();
		const oneWeekFromNowInUnixSeconds = DateTime.now().plus({ week: 1 }).endOf('day').toSeconds();

		filterResult = filterResult.filter((item) => {
			const alertStartDate = item.activePeriod[0].start || -Infinity;
			const alertEndDate = item.activePeriod[0].end || +Infinity;
			//
			if (filtersState.by_date === 'current') {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDate <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return true;
				}
				return false;
			}
			else {
				// If the alert start date is before one week from now, and if the end date is after or equal to today
				// then the alert is considered 'current'.
				if (alertStartDate <= oneWeekFromNowInUnixSeconds && alertEndDate >= nowInUnixSeconds) {
					return false;
				}
				return true;
			}
		});

		//
		// Filter by municipality_id
		if (filtersState.by_municipality) {
			filterResult = filterResult.filter((alert) => {
				return true; // alert.municipality_id === filtersState.by_municipality;
			});
		}

		//
		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredAlerts = applyFiltersToData();
		setDataFilteredState(filteredAlerts);
	}, [allAlertsData, filtersState]);

	// useEffect(() => {
	// 	if (!allAlertsData) return;
	// 	if (allAlertsData?.filter((item => item.current_status === 'open')).length === 0) {
	// 		setFiltersState(prev => ({ ...prev, by_date: 'all' }));
	// 	}
	// }, []);

	//
	// E. Handle actions

	const updateFilterByDate = (value: string) => {
		setFiltersState(prev => ({ ...prev, by_date: value }));
	};

	const updateFilterByMunicipality = (value?: string) => {
		setFiltersState(prev => ({ ...prev, by_municipality: value || null }));
	};

	const getSimplifiedAlertById = (alert_id: string): SimplifiedAlert | null => {
		//
		if (alert_id === 'CarrisMetropolitanaGTFSAlerts-21676') {
			console.log('getSimplifiedAlertById', alert_id);
		}
		//
		if (!allAlertsData) return null;
		// Find the alert by ID
		const alertData = allAlertsData.find(item => item._id === alert_id);
		if (!alertData) return null;
		// Find the localized header text
		let localizedHeaderText: string;
		const headerTextLocaleMatch = alertData.headerText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!headerTextLocaleMatch) localizedHeaderText = alertData.headerText.translation[0].text;
		else localizedHeaderText = headerTextLocaleMatch.text;
		// Find the localized description text
		let localizedDescriptionText: string;
		const descriptionTextLocaleMatch = alertData.descriptionText.translation.find(item => item.language === currentLocale.split('-')[0]);
		if (!descriptionTextLocaleMatch) localizedDescriptionText = alertData.descriptionText.translation[0].text;
		else localizedDescriptionText = descriptionTextLocaleMatch.text;
		// Find the localized image URL
		let localizedImageUrl: null | string;
		if (!alertData.image || !alertData.image.localizedImage?.length) return null;
		const imageLocaleMatch = alertData.image.localizedImage.find(item => item.language === currentLocale.split('-')[0]);
		if (!imageLocaleMatch) localizedImageUrl = alertData.image.localizedImage[0].url.length > 0 ? alertData.image.localizedImage[0].url : null;
		else localizedImageUrl = imageLocaleMatch.url.length > 0 ? imageLocaleMatch.url : null;
		// Start date
		const startDate = alertData.activePeriod[0].start ? alertData.activePeriod[0].start : -Infinity;
		const startDateObject = DateTime.fromSeconds(startDate).toJSDate();
		// End date
		const endDate = alertData.activePeriod[0].end ? alertData.activePeriod[0].end : +Infinity;
		const endDateObject = DateTime.fromSeconds(endDate).toJSDate();
		//
		return {
			_id: alert_id,
			cause: alertData.cause,
			description: localizedDescriptionText,
			effect: alertData.effect,
			end_date: endDateObject,
			image_url: localizedImageUrl,
			locale: currentLocale,
			start_date: startDateObject,
			title: localizedHeaderText,
			url: null,
		};
		//
	};

	//
	// F. Render components

	return (
		<AlertsContext.Provider value={{
			actions: {
				getSimplifiedAlertById,
				updateFilterByDate,
				updateFilterByMunicipality,
			},
			counters: {
				by_date: {
					open: 0, // allAlertsData?.filter((item => item.current_status === 'open')).length || 0,
				},
			},
			data: {
				filtered: dataFilteredState,
				raw: allAlertsData || [],
			},
			filters: filtersState,
			flags: {
				is_loading: allAlertsLoading,
			},
		}}
		>
			{children}
		</AlertsContext.Provider>
	);

	//
};
