'use client';

/* * */

import { MapView } from '@/components/map/MapView';
import { useUpdateSchoolFormContext } from '@/form/form';
import { type UpdateSchoolFormType } from '@/form/schema';
import { useEffect, useState } from 'react';
import { Layer, Source, useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

/* * */

interface Props {
	schoolId: string
}

/* * */

export function FormSectionLocationMap({ schoolId }: Props) {
	//

	//
	// A. Setup variables

	const { schoolInfoMap } = useMap();

	const form = useUpdateSchoolFormContext();

	const [isPositionCorrect, setIsPositionCorrect] = useState<UpdateSchoolFormType['location']['is_correct']>(null);

	//
	// B. Fetch data

	const { data: schoolData } = useSWR(`https://api.carrismetropolitana.pt/v2/facilities/schools/${schoolId}`);

	//
	// C. Transform data

	useEffect(() => {
		if (!schoolInfoMap || !schoolId || !schoolData || !schoolData.lat || !schoolData.lon) return;
		schoolInfoMap.flyTo({
			center: [schoolData.lon, schoolData.lat],
			speed: 0.5,
			zoom: 15,
		});
	}, [schoolInfoMap, schoolId, schoolData]);

	const schoolMarkerMapData: GeoJSON.FeatureCollection = {
		features: [{
			geometry: {
				coordinates: [schoolData.lon, schoolData.lat],
				type: 'Point',
			},
			properties: {},
			type: 'Feature',
		}],
		type: 'FeatureCollection',
	};

	const selectedCoordinatesMapData: GeoJSON.FeatureCollection = {
		features: [{
			geometry: {
				coordinates: [form.getValues().location.longitude, form.getValues().location.latitude],
				type: 'Point',
			},
			properties: {},
			type: 'Feature',
		}],
		type: 'FeatureCollection',
	};

	//
	// C. Handle actions

	form.watch('location.is_correct', (changeEvent) => {
		setIsPositionCorrect(changeEvent.value);
		if (!schoolInfoMap) return;
		// Captue map click
		const clickListener = (clickEvent) => {
			const isPositionCorrect = form.getValues().location?.is_correct;
			if (isPositionCorrect === 'almost' || isPositionCorrect === 'no') {
				const { lat, lng } = clickEvent.lngLat;
				form.setFieldValue('location.latitude', lat);
				form.setFieldValue('location.longitude', lng);
			}
		};
		// Setup the map click event
		schoolInfoMap.on('click', clickListener);
	});

	const handleMapMouseEnter = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'pointer';
		}
	};

	const handleMapMouseLeave = (event) => {
		if (event?.features[0].properties?.id) {
			schoolInfoMap.getCanvas().style.cursor = 'default';
		}
	};

	//
	// D. Render components

	return (
		<MapView
			id="schoolInfoMap"
			onMouseEnter={handleMapMouseEnter}
			onMouseLeave={handleMapMouseLeave}
			scale
			scrollZoom
			toolbar
		>

			{(isPositionCorrect === 'almost' || isPositionCorrect === 'no') && (
				<Source data={selectedCoordinatesMapData} generateId={true} id="selected-coordinates" type="geojson">
					<Layer
						id="selected-coordinates-pin"
						source="selected-coordinates"
						type="symbol"
						layout={{
							'icon-allow-overlap': true,
							'icon-anchor': 'bottom',
							'icon-ignore-placement': true,
							'icon-image': 'needle-pin',
							'icon-offset': [0, 5],
							'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 20, 0.35],
							'symbol-placement': 'point',
						}}
						paint={{
							'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
						}}
					/>
				</Source>
			)}

			<Source data={schoolMarkerMapData} generateId={true} id="school-marker" type="geojson">
				<Layer
					id="school-marker-img"
					source="school-markers"
					type="symbol"
					layout={{
						'icon-allow-overlap': true,
						'icon-anchor': 'bottom',
						'icon-ignore-placement': true,
						'icon-image': 'school-marker',
						'icon-offset': [0, 5],
						'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 20, 0.35],
						'symbol-placement': 'point',
					}}
					paint={{
						'icon-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 10, 1],
					}}
				/>
			</Source>

		</MapView>
	);

	//
}
