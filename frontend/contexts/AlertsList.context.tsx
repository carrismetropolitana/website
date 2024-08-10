'use client';

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types.js';

import { DateTime } from 'luxon';
import { useLocale } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsListContextState {
	actions: {
		getSimplifiedAlertById: (alert_id: string) => SimplifiedAlert | null
		updateFilterByDate: (value: string) => void
		updateFilterByMunicipality: (value: string) => void
	}
	counters: {
		by_date: {
			future: number
		}
	}
	data: {
		filtered: Alert[]
		raw: Alert[]
	}
	filters: {
		by_date: 'current' | 'future'
		by_line: null | string
		by_municipality: null | string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const AlertsListContext = createContext<AlertsListContextState | undefined>(undefined);

export function useAlertsListContext() {
	const context = useContext(AlertsListContext);
	if (!context) {
		throw new Error('useAlertsListContext must be used within a AlertsListContextProvider');
	}
	return context;
}

/* * */

export const AlertsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();

	const [dataFilteredState, setDataFilteredState] = useState<Alert[]>([]);

	const [filterByDateState, setFilterByDateState] = useState <AlertsListContextState['filters']['by_date']>('current');
	const [filterByLineState, setFilterByLineState] = useState <AlertsListContextState['filters']['by_line']>(null);
	const [filterByMunicipalityState, setFilterByMunicipalityState] = useState <AlertsListContextState['filters']['by_municipality']>(null);

	//
	// B. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>('https://api.carrismetropolitana.pt/v2/alerts');

	//
	// C. Transform data

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
			if (filterByDateState === 'current') {
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
		if (filterByMunicipalityState) {
			filterResult = filterResult.filter(() => {
				return true; // alert.municipality_id === filterByMunicipalityState;
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
	}, [allAlertsData, filterByDateState, filterByMunicipalityState]);

	//
	// D. Handle actions

	const updateFilterByDate = (value: AlertsListContextState['filters']['by_date']) => {
		setFilterByDateState(value);
	};

	const updateFilterByLine = (value: AlertsListContextState['filters']['by_line']) => {
		setFilterByLineState(value || null);
	};

	const updateFilterByMunicipality = (value: AlertsListContextState['filters']['by_municipality']) => {
		setFilterByMunicipalityState(value || null);
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
	// E. Define context value

	const contextValue: AlertsListContextState = {
		actions: {
			getSimplifiedAlertById,
			updateFilterByDate,
			updateFilterByMunicipality,
		},
		counters: {
			by_date: {
				future: 0, // allAlertsData?.filter((item => item.current_status === 'open')).length || 0,
			},
		},
		data: {
			filtered: dataFilteredState,
			raw: allAlertsData || [],
		},
		filters: {
			by_date: filterByDateState,
			by_line: filterByLineState,
			by_municipality: filterByMunicipalityState,
		},
		flags: {
			is_loading: allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<AlertsListContext.Provider value={contextValue}>
			{children}
		</AlertsListContext.Provider>
	);

	//
};
