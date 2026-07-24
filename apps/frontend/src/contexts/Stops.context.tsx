'use client';

/* * */

import { useFilterByAgencyIds } from '@/hooks/useFilterByAgencyIds';
import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { CARRIS_METROPOLITANA_AGENCY_IDS, getPublicVariable, type GoApiResponse } from '@carrismetropolitana/website-shared-settings';
import { type HubStop } from '@tmlmobilidade/go-types-public-info';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface StopsContextState {
	actions: {
		getStopById: (stopId: string) => HubStop | undefined
		getStopByIdGeoJsonFC: (stopId: string) => GeoJSON.FeatureCollection | undefined
	}
	data: {
		stops: HubStop[]
		stops_fc: GeoJSON.FeatureCollection<GeoJSON.Point, GeoJSON.GeoJsonProperties> | undefined
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const StopsContext = createContext<StopsContextState | undefined>(undefined);

export function useStopsContext() {
	const context = useContext(StopsContext);
	if (!context) {
		throw new Error('useStopsContext must be used within a StopsContextProvider');
	}
	return context;
}

/* * */

export const StopsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataStopsFCState, setDataStopsFCState] = useState<StopsContextState['data']['stops_fc']>();

	//
	// B. Fetch data

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<GoApiResponse<HubStop[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/stops`, { refreshInterval: 900000 }); // 15 minutes

	//
	// C. Filter data

	const stopAgencyIdsByLinePrefix = useMemo(() => {
		return new Map(CARRIS_METROPOLITANA_AGENCY_IDS.map(agencyId => [agencyId.slice(-1), agencyId]));
	}, []);

	const getStopAgencyIds = useCallback((stopData: HubStop) => {
		const normalizedStopData = stopData as HubStop & {
			agency_id?: string
			agency_ids?: string[]
			lines?: string[]
		};

		if (normalizedStopData.agency_ids?.length) return normalizedStopData.agency_ids;
		if (normalizedStopData.agency_id) return normalizedStopData.agency_id;

		const lineIds = stopData.line_ids || normalizedStopData.lines || [];
		return lineIds.flatMap((lineId) => {
			const agencyId = stopAgencyIdsByLinePrefix.get(lineId.at(0) ?? '');
			return agencyId ? [agencyId] : [];
		});
	}, [stopAgencyIdsByLinePrefix]);

	const filteredStopsData = useFilterByAgencyIds(allStopsData, { dataType: 'stop', getAgencyIds: getStopAgencyIds }).data;

	//
	// D. Transform data

	useEffect(() => {
		// Check if all data is available
		if (!filteredStopsData) return;
		// Transform data into GeoJSON FeatureCollection
		const collection = getBaseGeoJsonFeatureCollection();
		filteredStopsData.forEach((stop) => {
			const stopFC = transformStopDataIntoGeoJsonFeature(stop);
			if (stopFC) collection.features.push(stopFC);
		});
		// Set state value
		setDataStopsFCState(collection);
		//
	}, [filteredStopsData]);

	//
	// E. Handle actions

	const getStopById = (stopId: string): HubStop | undefined => {
		return filteredStopsData.find((stop) => {
			const id = stop._id ?? (stop as HubStop & { id?: number | string }).id;
			return id?.toString() === stopId;
		});
	};

	const getStopByIdGeoJsonFC = (stopId: string): GeoJSON.FeatureCollection | undefined => {
		const stop = getStopById(stopId);
		if (!stop) return;
		const collection = getBaseGeoJsonFeatureCollection();
		const stopFC = transformStopDataIntoGeoJsonFeature(stop);
		if (stopFC) collection.features.push(stopFC);
		return collection;
	};

	//
	// F. Define context value

	const contextValue: StopsContextState = {
		actions: {
			getStopById,
			getStopByIdGeoJsonFC,
		},
		data: {
			stops: filteredStopsData,
			stops_fc: dataStopsFCState,
		},
		flags: {
			is_loading: allStopsLoading,
		},
	};

	//
	// G. Render components

	return (
		<StopsContext.Provider value={contextValue}>
			{children}
		</StopsContext.Provider>
	);

	//
};

/* * */

export function transformStopDataIntoGeoJsonFeature(stopData: HubStop): GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> | undefined {
	const legacyStopData = stopData as HubStop & {
		id?: number | string
		lat?: number
		lon?: number
		long_name?: string
	};
	const id = stopData._id ?? legacyStopData.id;
	const lat = stopData.latitude ?? legacyStopData.lat;
	const lon = stopData.longitude ?? legacyStopData.lon;
	if (lat === undefined || lon === undefined) return;

	const feature: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties> = {
		geometry: {
			coordinates: [lon, lat],
			type: 'Point',
		},
		properties: {
			current_status: stopData.lifecycle_status,
			id: id?.toString(),
			lat,
			lon,
			long_name: stopData.name,
		},
		type: 'Feature',
	};

	// Filter out falsy properties
	Object.keys(feature.properties).forEach((key) => {
		if (feature.properties[key as keyof typeof feature.properties] === undefined || feature.properties[key as keyof typeof feature.properties] === null) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete feature.properties[key as keyof typeof feature.properties];
		}
	});

	return feature;
}
