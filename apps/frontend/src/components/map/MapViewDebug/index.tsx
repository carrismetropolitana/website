'use client';

/* * */

import type { Map as MapLibre } from 'maplibre-gl';

import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { useEffect, useMemo, useState } from 'react';

/* * */

interface Props {
	className?: string
}

/* * */

export function MapViewDebug({ className }: Props) {
	//
	// A. Setup variables
	const { data: { map } } = useMapOptionsContext();
	const [zoom, setZoom] = useState<number>(0);
	const [bearing, setBearing] = useState<number>(0);
	const [pitch, setPitch] = useState<number>(0);
	const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

	// Ensure we always operate on the underlying MapLibre map instance
	const maplibreMap: MapLibre | undefined = useMemo(() => {
		// Some environments expose MapRef with getMap(), others pass the Map instance directly
		const possibleMap = map as unknown as MapLibre | undefined | { getMap?: () => MapLibre };
		if (!possibleMap) return undefined;
		return (typeof (possibleMap as { getMap?: () => MapLibre }).getMap === 'function')
			? (possibleMap as { getMap: () => MapLibre }).getMap()
			: (possibleMap as MapLibre);
	}, [map]);

	//
	// B. Transform data
	useEffect(() => {
		if (!maplibreMap) return;

		const updateFromMap = () => {
			try {
				const currentCenter = maplibreMap.getCenter();
				setCenter({ lat: currentCenter.lat, lng: currentCenter.lng });
				setZoom(maplibreMap.getZoom());
				setBearing(maplibreMap.getBearing());
				setPitch(maplibreMap.getPitch());
			}
			catch {
				// ignore
			}
		};

		updateFromMap();
		maplibreMap.on('move', updateFromMap);
		maplibreMap.on('zoom', updateFromMap);
		maplibreMap.on('rotate', updateFromMap);
		maplibreMap.on('pitch', updateFromMap);

		return () => {
			try {
				maplibreMap.off('move', updateFromMap);
				maplibreMap.off('zoom', updateFromMap);
				maplibreMap.off('rotate', updateFromMap);
				maplibreMap.off('pitch', updateFromMap);
			}
			catch {
				// ignore
			}
		};
	}, [maplibreMap]);

	//
	// C. Render components
	if (!maplibreMap) return null;

	return (
		<div
			className={className}
			style={{
				background: 'rgba(0, 0, 0, 0.6)',
				borderRadius: 6,
				bottom: 8,
				color: '#ffffff',
				fontSize: 12,
				left: 8,
				lineHeight: 1.3,
				padding: '6px 8px',
				pointerEvents: 'none',
				position: 'absolute',
				zIndex: 1,
			}}
		>
			<div>Zoom: {zoom.toFixed(2)}</div>
			<div>Center: {center.lat.toFixed(5)}, {center.lng.toFixed(5)}</div>
			<div>Bearing: {bearing.toFixed(2)}°</div>
			<div>Pitch: {pitch.toFixed(2)}°</div>
		</div>
	);
}
