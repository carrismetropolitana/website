'use client';

/* * */

import BlackHeader from '@/components/BlackHeader/BlackHeader';
import { GoBackButton } from '@/components/common/GoBackButton';
// import DownloadPDF from '@/components/DownloadPDF/DownloadPDF';
// import { NaveganteCardCallout } from '@/components/home/NaveganteCardCallout';
// import { PlannerCallout } from '@/components/home/PlannerCallout';
import { MapView } from '@/components/map/MapView';
import { MapViewSingleSchool } from '@/components/map/MapViewSingleSchool';
import { NoServiceMessage } from '@/components/NoServiceMessage/NoServiceMessage';
import SourceDisclaimer from '@/components/SourceDisclaimer/SourceDisclaimer';
import StopInfo from '@/components/StopInfo/StopInfo';
import Titles from '@/components/Titles/Titles';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { GoApiResponse } from '@carrismetropolitana/website-shared-types';
import { HubStop } from '@tmlmobilidade/go-types-public-info';
import * as turf from '@turf/turf';
import { useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function SchoolDetail({ schoolId }: Props) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();

	//
	// B. Fetch data

	const { data: allSchoolsData } = useSWR(`https://api.carrismetropolitana.pt/v2/facilities/schools`);
	const { data: allStopsData, isLoading: allStopsLoading } = useSWR<GoApiResponse<HubStop[]>, Error>(`${getPublicVariable('go_api_url')}/hub/api/v1/network/stops`, { refreshInterval: 900000 }); // 15 minutes

	//
	// C. Transform data

	const schoolData = useMemo(() => {
		if (!allSchoolsData?.length) return null;
		return allSchoolsData.find(item => item.id === schoolId) || null;
	}, [allSchoolsData, schoolId]);

	const schoolStopsAsGeojson = useMemo(() => {
		const geoJSON: GeoJSON.FeatureCollection = {
			features: [],
			type: 'FeatureCollection',
		};
		if (!schoolData?.stop_ids?.length || !allStopsData?.data?.length) return geoJSON;
		for (const [stopIndex, stopCode] of schoolData.stop_ids.entries()) {
			const stopData = allStopsData.data.find(stop => stop._id === stopCode);
			if (!stopData) continue;
			geoJSON.features.push({
				geometry: { coordinates: [stopData.longitude, stopData.latitude], type: 'Point' },
				properties: { index: stopIndex + 1 },
				type: 'Feature',
			});
		}
		return geoJSON;
	}, [allStopsData?.data, schoolData]);

	useEffect(() => {
		if (!schoolInfoMap || !schoolStopsAsGeojson?.features?.length) return;
		const boundingBox = turf.bbox(schoolStopsAsGeojson);
		// turf.bbox returns [minX, minY, maxX, maxY] => [north, south, east, west]
		const bounds: [[number, number], [number, number]] = [
			[boundingBox[0], boundingBox[1]],
			[boundingBox[2], boundingBox[3]],
		];

		schoolInfoMap.fitBounds(bounds, { duration: 2000, padding: 150 });
	}, [schoolInfoMap, schoolStopsAsGeojson]);

	const allStopsDataAsGeojson = useMemo(() => {
		const geoJSON: GeoJSON.FeatureCollection = {
			features: [],
			type: 'FeatureCollection',
		};
		if (allStopsData && !allStopsLoading) {
			for (const stop of allStopsData.data) {
				geoJSON.features.push({
					geometry: { coordinates: [stop.longitude, stop.latitude], type: 'Point' },
					properties: {},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allStopsData, allStopsLoading]);

	//
	// D. Render components

	return (
		schoolData && (
			<div className={styles.container}>
				<div className={styles.titles}>
					<Titles goHome={true} municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
				</div>

				<div style={{ height: 400 }}>
					<MapView
						glyphs="https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
						id="schoolInfoMap"
						navigation={true}
						scrollZoom={false}
						scale
						toolbar
					>

						<MapViewSingleSchool schoolData={schoolData} />

						<Source data={allStopsDataAsGeojson} id="allStops" type="geojson">
							<Layer id="allStops" paint={{ 'circle-color': '#ffdd01', 'circle-radius': 4, 'circle-stroke-color': '#000000', 'circle-stroke-width': 1 }} source="allStops" type="circle" />
						</Source>

						<Source data={schoolStopsAsGeojson} id="schoolStops" type="geojson">
							<Layer id="schoolStops" paint={{ 'circle-color': '#235fe1', 'circle-radius': 10, 'circle-stroke-color': '#000000', 'circle-stroke-width': 2 }} source="schoolStops" type="circle" />
							<Layer id="school-stops-labels" layout={{ 'text-anchor': 'center', 'text-field': ['get', 'index'], 'text-offset': [0, 0], 'text-size': 12 }} paint={{ 'text-color': '#ffffff' }} source="schoolStops" type="symbol" />
						</Source>

					</MapView>
				</div> <br />

				<div className={styles.gridWrapper}>
					<div className={styles.stopsWrapper}>
						<BlackHeader text={`Paragens que servem a instituição: ${schoolData.name}`} />
						{schoolData && schoolData.stop_ids?.length > 0
							? (
								<div className={styles.stopsList}>
									{schoolData.stop_ids.map((stopCode, stopIndex) => <StopInfo key={stopCode} index={stopIndex + 1} stop_id={stopCode} />)}
								</div>
							)
							: (
								<div className={styles.stopsList}>
									<NoServiceMessage municipality_id={schoolData.municipality_id} municipality_name={schoolData.municipality_name} />
								</div>
							)}
					</div>
					{/* <div className={styles.actionsWrapper}>
						<PlannerCallout />
						<NaveganteCardCallout />
					</div> */}
				</div>

				<GoBackButton to="/" />

				<SourceDisclaimer />

			</div>
		)

	);

	//
}
