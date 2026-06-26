'use client';

import { normalizeAlertReferenceId } from '@/utils/alerts';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { CARRIS_METROPOLITANA_AGENCY_IDS, getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { HubAlert } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface AlertsContextState {
	actions: {
		getAlertById: (alertId: string) => HubAlert | null
		getAlertsByLineId: (lineId: string) => HubAlert[]
		getAlertsByStopId: (stopId: string) => HubAlert[]
	}
	data: {
		alerts: HubAlert[]
		fc: GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>
	}
	flags: {
		error: Error | undefined
		isLoading: boolean
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

export function AlertsContextProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Fetch data

	const { data: allAlertsData, isLoading: allAlertsLoading } = useSWR<{ data: HubAlert[] }>(`${getPublicVariable('go_api_url')}/alerts`, { refreshInterval: 180000 }); // 3 minutes
	const filteredAlertsData = useMemo(() => {
		const allowedAgencyIds = new Set<string>(CARRIS_METROPOLITANA_AGENCY_IDS);
		return (allAlertsData?.data ?? []).filter((alertData) => {
			if (allowedAgencyIds.has(String(alertData.agency_id))) return true;
			return alertData.references.some((reference) => {
				const referenceIds = [reference.parent_id, ...reference.child_ids];
				return referenceIds.some(referenceId => CARRIS_METROPOLITANA_AGENCY_IDS.some(agencyId => String(referenceId).trim().startsWith(`[${agencyId}]`)));
			});
		});
	}, [allAlertsData?.data]);

	//
	// B. Transform data

	const dataFeatureCollectionState = useMemo(() => {
		const collection = getBaseGeoJsonFeatureCollection();
		filteredAlertsData.forEach((item) => {
			const alertFC = transformAlertDataIntoGeoJsonFeature(item);
			if (alertFC) collection.features.push(alertFC);
		});
		return collection;
	}, [filteredAlertsData]);

	//
	// C. Handle actions

	const getAlertById = (alertId: string): HubAlert | null => {
		return filteredAlertsData.find(item => item._id === alertId) || null;
	};

	const getAlertsByLineId = (lineId: string): HubAlert[] => {
		const normalizedLineId = normalizeAlertReferenceId(lineId);
		return filteredAlertsData.filter((item) => {
			if (item.reference_type === 'lines') return item.references.some(reference => normalizeAlertReferenceId(reference.parent_id) === normalizedLineId);
			if (item.reference_type === 'stops') return item.references.some(reference => reference.child_ids.some(childId => normalizeAlertReferenceId(childId) === normalizedLineId));
			return false;
		});
	};

	const getAlertsByStopId = (stopId: string): HubAlert[] => {
		const normalizedStopId = normalizeAlertReferenceId(stopId);
		return filteredAlertsData.filter((item) => {
			if (item.reference_type === 'stops') return item.references.some(reference => normalizeAlertReferenceId(reference.parent_id) === normalizedStopId);
			if (item.reference_type === 'lines') return item.references.some(reference => reference.child_ids.some(childId => normalizeAlertReferenceId(childId) === normalizedStopId));
			return false;
		});
	};

	//
	// D. Define context value

	const contextValue: AlertsContextState = {
		actions: {
			getAlertById,
			getAlertsByLineId,
			getAlertsByStopId,
		},
		data: {
			alerts: filteredAlertsData,
			fc: dataFeatureCollectionState,
		},
		flags: {
			error: undefined,
			isLoading: allAlertsLoading,
		},
	};

	//
	// E. Render components

	return (
		<AlertsContext.Provider value={contextValue}>
			{children}
		</AlertsContext.Provider>
	);
};

/* * */

export function transformAlertDataIntoGeoJsonFeature(alertData: HubAlert): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> {
	// Skip alerts without coordinates
	if (!alertData.coordinates?.length) return null;
	// Transform alert data into a GeoJSON feature
	return {
		geometry: {
			coordinates: [alertData.coordinates[1], alertData.coordinates[0]],
			type: 'Point',
		},
		properties: {
			_id: alertData._id,
			cause: alertData.cause,
			description: alertData.description,
			effect: alertData.effect,
			id: alertData._id,
			title: alertData.title,
		},
		type: 'Feature',
	};
}
