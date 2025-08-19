'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import * as turf from '@turf/turf';
import { useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

/* * */

export function MapViewSchools({ allSchoolsData, onSelectSchool }) {
	//

	//
	// A. Setup variables

	const { selectSchoolMap } = useMap();

	//
	// B. Fetch data

	const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

	//
	// C. Transform data

	const allStopsDataAsGeojson = useMemo(() => {
		const geoJSON: GeoJSON.FeatureCollection = {
			features: [],
			type: 'FeatureCollection',
		};
		if (allStopsData) {
			for (const stop of allStopsData) {
				geoJSON.features.push({
					geometry: { coordinates: [stop.lon, stop.lat], type: 'Point' },
					properties: {},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allStopsData]);

	const allSchoolsDataAsGeojson = useMemo(() => {
		const geoJSON: GeoJSON.FeatureCollection = {
			features: [],
			type: 'FeatureCollection',
		};
		if (allSchoolsData) {
			for (const school of allSchoolsData) {
				geoJSON.features.push({
					geometry: { coordinates: [school.lon, school.lat], type: 'Point' },
					properties: { id: school.id },
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allSchoolsData]);

	useEffect(() => {
		if (!selectSchoolMap || !allSchoolsDataAsGeojson?.features?.length) return;
		const boundingBox = turf.bbox(allSchoolsDataAsGeojson);
		const bounds: [[number, number], [number, number]] = [
			[boundingBox[0], boundingBox[1]], // Southwest corner [lon, lat]
			[boundingBox[2], boundingBox[3]], // Northeast corner [lon, lat]
		];
		console.log(bounds);
		selectSchoolMap.fitBounds(bounds, { duration: 2000, padding: 50 });
	}, [selectSchoolMap, allSchoolsDataAsGeojson]);

	//
	// D. Handle actions

	function handleMapClick(event: { features?: { properties?: { id?: number } }[] }) {
		const feature = event.features && event.features[0];
		if (!feature || !feature.properties || feature.properties.id === null || feature.properties.id === undefined) return;
		onSelectSchool(feature.properties.id);
	}

	//
	// E. Render components

	if (!allSchoolsData || !allStopsData) {
		return;
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<MapView
				id="selectSchoolMap"
				interactiveLayerIds={['allSchools']}
				onClick={handleMapClick}
				scale
				scrollZoom
				toolbar
			>
				<>
					<Source data={allStopsDataAsGeojson} id="allStops" type="geojson">
						<Layer
							id="allStops"
							source="allStops"
							type="circle"
							paint={{
								'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
								'circle-radius': ['interpolate', ['linear'], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 20, 10]],
								'circle-stroke-color': '#000000',
								'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 9, 0.5, 26, 10],
							}}
						/>
					</Source>

					<Source data={allSchoolsDataAsGeojson} id="allSchools" type="geojson">
						<Layer
							id="allSchools"
							source="allSchools"
							type="symbol"
							layout={{
								'icon-allow-overlap': true,
								'icon-ignore-placement': true,
								'icon-image': 'school-marker',
								'icon-size': ['interpolate', ['linear'], ['zoom'], 9, 0.05, 100, 3],
							}}
							paint={{
								'icon-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
								'icon-opacity': ['case', ['boolean', ['feature-state', 'selected'], false], 1, 1],
							}}
						/>
					</Source>

				</>

			</MapView>
		</div>
	);

	//
}
