'use client';

import React from 'react';

import { MapLayers } from './';

export interface MapContainerProps {
	onPinClick?: (beachId: string) => void
	selectedAccordionId?: string
	selectedLineId?: null | string
	style?: React.CSSProperties
}

// Zoom configuration for specific beaches
const BEACH_ZOOM_CONFIG = {
	'praia-galapos-galapinhos': {
		// Center point for the zoom (coordinates in the SVG viewBox)
		centerX: 850,
		centerY: 1450,
		// Zoom level (1 = no zoom, > 1 = zoomed in)
		scale: 1.5,
	},
} as const;

export function MapContainer({
	onPinClick,
	selectedAccordionId,
	selectedLineId,
	style,
}: MapContainerProps) {
	// Calculate transform based on selected beach
	const getTransformStyle = React.useCallback(() => {
		if (!selectedAccordionId || !(selectedAccordionId in BEACH_ZOOM_CONFIG)) {
			return {};
		}

		const config = BEACH_ZOOM_CONFIG[selectedAccordionId as keyof typeof BEACH_ZOOM_CONFIG];
		const { centerX, centerY, scale } = config;

		// Calculate the transform origin as percentage of the map
		// SVG viewBox is 1797.1 x 2210.35
		const originX = (centerX / 1797.1) * 100;
		const originY = (centerY / 2210.35) * 100;

		return {
			transform: `scale(${scale})`,
			transformOrigin: `${originX}% ${originY}%`,
			transition: 'transform 0.5s ease-in-out, transform-origin 0.5s ease-in-out',
		};
	}, [selectedAccordionId]);

	const wrapperStyle: React.CSSProperties = {
		height: '100%',
		overflow: 'hidden',
		position: 'relative',
		userSelect: 'none',
		width: '100%',
		...style,
	};

	const imageStyle: React.CSSProperties = {
		display: 'block',
		height: '100%',
		left: 0,
		position: 'absolute',
		top: 0,
		width: '100%',
		...getTransformStyle(),
	};

	return (
		<div style={wrapperStyle}>
			<MapLayers
				onPinClick={onPinClick}
				selectedAccordionId={selectedAccordionId}
				selectedLineId={selectedLineId}
				style={imageStyle}
			/>
		</div>
	);
}
