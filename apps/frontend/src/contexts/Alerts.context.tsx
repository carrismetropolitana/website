'use client';

/* * */

import { type Alert, type SimplifiedAlert } from '@/types/alerts.types';
import convertToSimplifiedAlert from '@/utils/convertToSimplifiedAlert';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useLocale } from 'next-intl';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

// import { useAnalyticsContext } from './Analytics.context';

/* * */

interface AlertsContextState {
	actions: {
		getSimplifiedAlertById: (alertId: string) => null | SimplifiedAlert
		getSimplifiedAlertsByLineId: (lineId: string) => SimplifiedAlert[]
		getSimplifiedAlertsByStopId: (stopId: string) => SimplifiedAlert[]
	}
	data: {
		alerts: Alert[]
		featureCollection: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>
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
	// const analyticsContext = useAnalyticsContext();

	const [dataSimplifiedState, setDataSimplifiedState] = useState<SimplifiedAlert[]>([]);
	const [dataFeatureCollectionState, setDataFeatureCollectionState] = useState<GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties>>(null);

	//
	// B. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<Alert[], Error>(`${getPublicVariable('api_url')}/alerts`, { refreshInterval: 180000 }); // 3 minutes

	//
	// C. Transform data

	useEffect(() => {
		// if (!allAlertsData) return;
		const allSimplifiedAlerts = allAlertsData?.map(alert => convertToSimplifiedAlert(alert, currentLocale));
		setDataSimplifiedState(allSimplifiedAlerts || []);
		// THE CORRECT SPELLING IS REFERRER
		// analyticsContext.actions.capture(ampli => ampli.captureAlertsReferer({ page_referrer: document.referrer }));
	}, [allAlertsData]);

	// Transform data into geojson
	useEffect(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		dataSimplifiedState.forEach((alert) => {
			const alertFC = transformAlertDataIntoGeoJsonFeature(alert);
			if (alertFC) collection.features.push(alertFC);
		});

		setDataFeatureCollectionState(collection);
	}, [dataSimplifiedState]);

	//
	// D. Handle actions

	const getSimplifiedAlertById = (alertId: string): null | SimplifiedAlert => {
		return dataSimplifiedState.find(item => item.alert_id.toLowerCase() === alertId.toLowerCase()) || null;
	};

	const getSimplifiedAlertsByLineId = (lineId: string): SimplifiedAlert[] => {
		// TODO: Update this to use informed_entity.lineId instead of routeId
		// This is a temporary solution to filter by lineId until the API is updated
		return dataSimplifiedState.filter((simplifiedAlert) => {
			// Include this element if any informed_entity...
			return simplifiedAlert.informed_entity.some((informedEntity) => {
				// ...has a routeId that starts with the lineId
				return informedEntity.route_id?.startsWith(lineId);
			});
		});
	};

	const getSimplifiedAlertsByStopId = (stopId: string): SimplifiedAlert[] => {
		return dataSimplifiedState.filter(simplifiedAlert => simplifiedAlert.informed_entity.some(informedEntity => informedEntity.stop_id === stopId));
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
			alerts: allAlertsData || [],
			featureCollection: dataFeatureCollectionState,
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

/* * */

export function transformAlertDataIntoGeoJsonFeature(alertData: SimplifiedAlert): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> {
	if (!alertData.coordinates) return null;
	return {
		geometry: {
			coordinates: [alertData.coordinates[1], alertData.coordinates[0]],
			type: 'Point',
		},
		properties: {
			cause: alertData.cause,
			effect: alertData.effect,
			id: alertData.alert_id,
		},
		type: 'Feature',
	};
}
