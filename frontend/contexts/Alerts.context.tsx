'use client';

/* * */

import type { Alert, SimplifiedAlert } from '@/types/alerts.types.js';

import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { Routes } from '@/utils/routes';
import { useLocale } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsContextState {
	actions: {
		getSimplifiedAlertById: (alertId: string) => null | SimplifiedAlert
		getSimplifiedAlertsByLineId: (lineId: string) => SimplifiedAlert[]
		getSimplifiedAlertsByStopId: (stopId: string) => SimplifiedAlert[]
	}
	data: {
		raw: Alert[]
		simplified: SimplifiedAlert[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const AlertsContext = createContext<AlertsContextState | undefined>(undefined);

export function useAlertsContext() {
	const context = useContext(AlertsContext);
	if (!context) {
		throw new Error('useAlertsContext must be used within a AlertsContextProvider');
	}
	return context;
}

/* * */

export const AlertsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const currentLocale = useLocale();

	const [dataSimplifiedState, setDataSimplifiedState] = useState<SimplifiedAlert[]>([]);

	//
	// B. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>(`${Routes.API}/alerts`);

	//
	// C. Transform data

	useEffect(() => {
		if (!allAlertsData) return;
		const allSimplifiedAlerts = allAlertsData.map(alert => convertToSimplifiedAlert(alert, currentLocale));
		setDataSimplifiedState(allSimplifiedAlerts);
	}, [allAlertsData]);

	//
	// D. Handle actions

	const getSimplifiedAlertById = (alertId: string): null | SimplifiedAlert => {
		return dataSimplifiedState.find(item => item.alert_id === alertId) || null;
	};

	const getSimplifiedAlertsByLineId = (lineId: string): SimplifiedAlert[] => {
		// TODO: Update this to use informed_entity.lineId instead of routeId
		// This is a temporary solution to filter by lineId until the API is updated
		return dataSimplifiedState.filter((simplifiedAlert) => {
			// Include this element if any informed_entity...
			return simplifiedAlert.informed_entity.some((informedEntity) => {
				// ...has a routeId that starts with the lineId
				return informedEntity.routeId?.startsWith(lineId);
			});
		});
	};

	const getSimplifiedAlertsByStopId = (stopId: string): SimplifiedAlert[] => {
		return dataSimplifiedState.filter(simplifiedAlert => simplifiedAlert.informed_entity.some(informedEntity => informedEntity.stopId === stopId));
	};

	//
	// E. Define context value

	const contextValue: AlertsContextState = {
		actions: {
			getSimplifiedAlertById,
			getSimplifiedAlertsByLineId,
			getSimplifiedAlertsByStopId,
		},
		data: {
			raw: allAlertsData || [],
			simplified: dataSimplifiedState,
		},
		flags: {
			is_loading: allAlertsLoading,
		},
	};

	//
	// F. Render components

	return (
		<AlertsContext.Provider value={contextValue}>
			{children}
		</AlertsContext.Provider>
	);

	//
};
