'use client';

/* * */

import FrontendEncmGrid from '@/components/FrontendEncmGrid/FrontendEncmGrid';
import FrontendEncmInfo from '@/components/FrontendEncmInfo/FrontendEncmInfo';
import FrontendEncmMap from '@/components/FrontendEncmMap/FrontendEncmMap';
import FrontendEncmToolbar from '@/components/FrontendEncmToolbar/FrontendEncmToolbar';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Panel from '@/components/Panel/Panel';
import { useAppAnalyticsContext } from '@/contexts/AppAnalyticsContext';
import generateUUID from '@/services/generateUUID';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import useSWR from 'swr';

import styles from './FrontendEncm.module.css';

/* * */

export default function FrontendEncm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendEncm');

	const { frontendEncmMap } = useMap();

	const analyticsContext = useAppAnalyticsContext();

	const [selectedMapStyle, setSelectedMapStyle] = useState('map');

	const [selectedEncmId, setSelectedEncmId] = useState();
	const [selectedMapFeature, setSelectedMapFeature] = useState();

	//
	// B. Analytics

	useEffect(() => {
		analyticsContext.capture('view_encm_explorer');
	});

	//
	// C. Fetch data

	const { data: allEncmData, error: allEncmError, isLoading: allEncmLoading } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/encm', { refreshInterval: 30000 });

	//
	// D. Transform data

	const allEncmMapData = useMemo(() => {
		const geoJSON = {
			features: [],
			type: 'FeatureCollection',
		};
		if (allEncmData) {
			for (const encm of allEncmData) {
				geoJSON.features.push({
					geometry: {
						coordinates: [encm.lon, encm.lat],
						type: 'Point',
					},
					properties: {
						id: encm.id,
						lat: encm.lat,
						lon: encm.lon,
						mapid: `${encm.id}${generateUUID()}`,
						name: encm.name,
					},
					type: 'Feature',
				});
			}
		}
		return geoJSON;
	}, [allEncmData]);

	const selectedEncmMapData = useMemo(() => {
		if (allEncmData && selectedEncmId) {
			const selectedEncmData = allEncmData.find(item => item.id === selectedEncmId);
			if (selectedEncmData) {
				return {
					geometry: {
						coordinates: [selectedEncmData.lon, selectedEncmData.lat],
						type: 'Point',
					},
					properties: {
						address: selectedEncmData.address,
						id: selectedEncmData.id,
						locality: selectedEncmData.locality,
						name: selectedEncmData.name,
						postal_code: selectedEncmData.postal_code,
					},
					type: 'Feature',
				};
			}
			return null;
		}
	}, [allEncmData, selectedEncmId]);

	//
	// E. Handle actions

	const handleMapReCenter = () => {
		frontendEncmMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
	};

	const handleOpenInGoogleMaps = () => {
		const center = frontendEncmMap.getCenter();
		const zoom = frontendEncmMap.getZoom();
		const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
		window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
	};

	const handleSelectEncm = (encmId) => {
		// Only do something if feature is set
		if (encmId) {
			// Get all currently rendered features and mark all of them as unselected
			const encmMapFeature = allEncmMapData?.features.find(f => f.properties?.id === encmId);
			// Set default map zoom and speed levels
			const defaultSpeed = 4000;
			const defaultZoom = 17;
			const defaultZoomMargin = 3;
			// Check if selected encm is within rendered bounds
			const renderedFeatures = frontendEncmMap.queryRenderedFeatures({ layers: ['all-encm'] });
			const isEncmCurrentlyRendered = renderedFeatures.find(item => item.properties?.id === encmMapFeature.properties?.id);
			// Get map current zoom level
			const currentZoom = frontendEncmMap.getZoom();
			// If the encm is visible and the zoom is not too far back (plus a little margin)...
			if (isEncmCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
				// ...then simply ease to it.
				frontendEncmMap.easeTo({ center: encmMapFeature?.geometry?.coordinates, duration: defaultSpeed * 0.25, zoom: currentZoom });
			}
			else {
				// If the zoom is too far, or the desired encm is not visible, then fly to it
				frontendEncmMap.flyTo({ center: encmMapFeature?.geometry?.coordinates, duration: defaultSpeed, zoom: defaultZoom });
			}
			// Save the current feature to state and mark it as selected
			setSelectedMapFeature(encmMapFeature);
			// Save the current encm id
			setSelectedEncmId(encmId);
		}
	};

	//
	// F. Render components

	return (
		<Panel error={allEncmError} loading={allEncmLoading} title={t('title')} type="A">
			<FrontendEncmToolbar onMapRecenter={handleMapReCenter} onOpenInGoogleMaps={handleOpenInGoogleMaps} onSelectEncmId={handleSelectEncm} onSelectMapStyle={setSelectedMapStyle} selectedEncmId={selectedEncmId} selectedMapStyle={selectedMapStyle} />
			<Divider />
			<div className={styles.mapWrapper}>
				<FrontendEncmMap allEncmMapData={allEncmMapData} onSelectEncmId={handleSelectEncm} selectedEncmMapData={selectedEncmMapData} selectedMapFeature={selectedMapFeature} selectedMapStyle={selectedMapStyle} />
			</div>
			<Divider />
			<FrontendEncmInfo />
			<FrontendEncmGrid allEncmData={allEncmData} onSelectEncmId={handleSelectEncm} selectedEncmId={selectedEncmId} />
		</Panel>
	);

	//
}
