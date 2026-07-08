'use client';

/* * */

import { getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { CARRIS_METROPOLITANA_AGENCY_IDS, getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { HubStop } from '@tmlmobilidade/go-types-public-info';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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

	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<HubStop[]>(`${getPublicVariable('api_url')}/stops`, { refreshInterval: 900000 }); // 15 minutes
	const filteredStopsData = useMemo(() => {
		const allowedOperatorDigits = new Set(CARRIS_METROPOLITANA_AGENCY_IDS.map(agencyId => agencyId.slice(-1)));
		return (allStopsData ?? []).filter((stopData) => {
			const lineIds = stopData.line_ids || (stopData as HubStop & { lines?: string[] }).lines || [];
			return lineIds.some(lineId => allowedOperatorDigits.has(lineId.at(0) ?? ''));
		});
	}, [allStopsData]);

	//
	// C. Transform data

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
	// D. Handle actions

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
	// E. Define context value

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
	// F. Render components

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
