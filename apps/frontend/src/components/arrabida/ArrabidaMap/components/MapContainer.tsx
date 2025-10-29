'use client';

import React from 'react';

import { MapLayers } from './';

export interface MapContainerProps {
	onPinClick?: (beachId: string) => void
	selectedAccordionId?: string
	selectedLineId?: null | string
	style?: React.CSSProperties
}

export function MapContainer({
	onPinClick,
	selectedAccordionId,
	selectedLineId,
	style,
}: MapContainerProps) {
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
