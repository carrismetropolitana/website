'use client';

/* * */

import { MapViewStylePathInteractiveLayerId } from '@/components/map/MapViewStylePath';
import { useMap } from '@vis.gl/react-maplibre';
import { useCallback, useState } from 'react';

/* * */

interface MapClickEvent {
	point: [number, number]
}

interface UseArrabidaMapInteractionsReturn {
	actions: {
		handleLayerClick: (event: MapClickEvent) => void
		handlePinClick: (beachId: string) => void
		setActiveWaypoint: (waypoint: null | { stop_id: string, stop_sequence: number }) => void
	}
	data: {
		activeWaypoint: null | { stop_id: string, stop_sequence: number }
	}
}

/* * */

export function useArrabidaMapInteractions(onPinClick?: (accordionId: string) => void): UseArrabidaMapInteractionsReturn {
	//

	//
	// A. Setup variables

	const { arrabidaMap } = useMap();
	const [activeWaypoint, setActiveWaypoint] = useState<null | { stop_id: string, stop_sequence: number }>(null);

	//
	// B. Handle actions

	const handlePinClick = useCallback((beachId: string) => {
		const BEACH_PINS = [
			{ accordionId: 'praia-albarquel', id: 'albarquel' },
			{ accordionId: 'praia-creiro', id: 'creiro' },
			{ accordionId: 'praia-figueirinha', id: 'figueirinha' },
			{ accordionId: 'praia-galapos-galapinhos', id: 'galapos' },
		];

		const beach = BEACH_PINS.find(pin => pin.id === beachId);
		if (beach && onPinClick) {
			onPinClick(beach.accordionId);
		}
	}, [onPinClick]);

	const handleLayerClick = useCallback((event: MapClickEvent) => {
		if (!arrabidaMap) return;
		const features = arrabidaMap.queryRenderedFeatures(event.point, { layers: [MapViewStylePathInteractiveLayerId] });
		if (!features.length) return;

		for (const feature of features) {
			if (feature.properties.id !== activeWaypoint?.stop_id) {
				setActiveWaypoint({
					stop_id: feature.properties.id,
					stop_sequence: feature.properties.sequence,
				});
				return;
			}
		}
	}, [arrabidaMap, activeWaypoint]);

	//
	// C. Return data

	return {
		actions: {
			handleLayerClick,
			handlePinClick,
			setActiveWaypoint,
		},
		data: {
			activeWaypoint,
		},
	};

	//
}
