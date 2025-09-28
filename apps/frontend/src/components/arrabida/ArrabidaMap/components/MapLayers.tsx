'use client';

import React from 'react';

import { BEACH_PINS } from '../constants';

export interface MapLayersProps extends React.ComponentProps<'div'> {
	onPinClick?: (beachId: string) => void
	selectedAccordionId?: string
	selectedLineId?: null | string
}

// Mapping accordion IDs to their respective legenda images
const LEGENDA_MAP = {
	'praia-albarquel': 'Mapa365_Legenda-Albarquel',
	'praia-creiro': 'Mapa365_Legenda-Creiro',
	'praia-figueirinha': 'Mapa365_Legenda-Figueirinha',
	'praia-galapos-galapinhos': 'Mapa365_Legenda-Galaposetc',
} as const;

// Generate array of stop numbers (1-11 based on the assets)
const STOP_NUMBERS = Array.from({ length: 11 }, (_, i) => i + 1);

export function MapLayers({ onPinClick, selectedAccordionId, selectedLineId, style, ...props }: MapLayersProps) {
	const handlePinClick = (beachId: string) => {
		const pin = BEACH_PINS.find(p => p.id === beachId);
		if (pin) {
			onPinClick?.(pin.accordionId);
		}
	};

	const beachPins = [
		{ accordionId: 'praia-albarquel', id: 'albarquel', name: 'Praia de Albarquel', x: 1200, y: 300 },
		{ accordionId: 'praia-figueirinha', id: 'figueirinha', name: 'Praia da Figueirinha', x: 800, y: 600 },
		{ accordionId: 'praia-galapos-galapinhos', id: 'galapos', name: 'Praia dos Galápos', x: 600, y: 1000 },
		{ accordionId: 'praia-creiro', id: 'creiro', name: 'Praia do Creiro', x: 400, y: 800 },
	];

	const layerStyle: React.CSSProperties = {
		height: '100%',
		left: 0,
		pointerEvents: 'none',
		position: 'absolute',
		top: 0,
		width: '100%',
		...style,
	};

	return (
		<div style={layerStyle} {...props}>
			{/* Base map layer */}
			<img
				alt="Mapa base da Arrábida"
				src="/assets/arrabidas/Mapa365_Base.png"
				style={{
					height: '100%',
					left: 0,
					objectFit: 'contain',
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 1,
				}}
			/>

			{/* Base legenda layer - only show when no specific selection */}
			{!selectedAccordionId && !selectedLineId && (
				<img
					alt="Legenda base"
					src="/assets/arrabidas/Mapa365_Legenda.svg"
					style={{
						height: '100%',
						left: 0,
						objectFit: 'contain',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 2,
					}}
				/>
			)}

			{/* All stops layer - only show when no specific selection */}
			{!selectedAccordionId && !selectedLineId && STOP_NUMBERS.map(stopNumber => (
				<img
					key={`stop-${stopNumber}`}
					alt={`Paragem ${stopNumber}`}
					src={`/assets/arrabidas/stops/Mapa365_Paragem_${stopNumber}.svg`}
					style={{
						height: '100%',
						left: 0,
						objectFit: 'contain',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 3,
					}}
				/>
			))}

			{/* All pins image - show when nothing is selected */}
			{!selectedAccordionId && !selectedLineId && (
				<img
					alt="Todas as paragens"
					src="/assets/arrabidas/Mapa365_ParagensOff.svg"
					style={{
						height: '100%',
						left: 0,
						objectFit: 'contain',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 4,
					}}
				/>
			)}

			{/* Interactive pin areas - show when nothing is selected */}
			{!selectedAccordionId && !selectedLineId && beachPins.map(pin => (
				<div
					key={`pin-area-${pin.id}`}
					onClick={() => handlePinClick(pin.id)}
					style={{
						cursor: 'pointer',
						height: '50px',
						left: `${(pin.x / 1798) * 100}%`,
						position: 'absolute',
						top: `${(pin.y / 1312) * 100}%`,
						transform: 'translate(-50%, -50%)',
						width: '50px',
						zIndex: 15,
					}}
					title={pin.name}
				/>
			))}

			{/* Location-specific legenda overlay - show when accordion is selected */}
			{selectedAccordionId && LEGENDA_MAP[selectedAccordionId as keyof typeof LEGENDA_MAP] && (
				<img
					alt={`Legenda para ${selectedAccordionId}`}
					src={`/assets/arrabidas/legenda/${LEGENDA_MAP[selectedAccordionId as keyof typeof LEGENDA_MAP]}.svg`}
					style={{
						height: '100%',
						left: 0,
						objectFit: 'contain',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 10,
					}}
				/>
			)}

			{/* Selected location stops - show only stops for selected location */}
			{selectedAccordionId && (() => {
				const selectedBeach = BEACH_PINS.find(beach => beach.accordionId === selectedAccordionId);
				if (!selectedBeach) return null;
				
				// Map accordion IDs to their respective stop numbers
				const locationStops = {
					'praia-albarquel': [1, 2, 3, 4], // Adjust these numbers based on actual stops for each location
					'praia-figueirinha': [5, 6],
					'praia-creiro': [7, 8, 9],
					'praia-galapos-galapinhos': [10, 11],
				};
				
				const stops = locationStops[selectedAccordionId as keyof typeof locationStops] || [];
				
				return stops.map(stopNumber => (
					<img
						key={`selected-stop-${stopNumber}`}
						alt={`Paragem ${stopNumber}`}
						src={`/assets/arrabidas/stops/Mapa365_Paragem_${stopNumber}.svg`}
						style={{
							height: '100%',
							left: 0,
							objectFit: 'contain',
							position: 'absolute',
							top: 0,
							width: '100%',
							zIndex: 11,
						}}
					/>
				));
			})()}

			{/* Line overlay - show when line is selected */}
			{selectedLineId && (
				<img
					alt={`Linha ${selectedLineId}`}
					src={`/assets/arrabidas/lines/Mapa365_${selectedLineId}.svg`}
					style={{
						height: '100%',
						left: 0,
						objectFit: 'contain',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 12,
					}}
				/>
			)}

			{/* Interactive pins overlay - only show when something is selected */}
			{(selectedAccordionId || selectedLineId) && (
				<svg
					viewBox="0 0 1798 1312"
					style={{
						height: '100%',
						left: 0,
						pointerEvents: 'auto',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 20,
					}}
				>
					{beachPins
						.filter(pin => selectedAccordionId ? pin.accordionId === selectedAccordionId : true)
						.map(pin => (
							<circle
								key={pin.id}
								cx={pin.x}
								cy={pin.y}
								fill="transparent"
								onClick={() => handlePinClick(pin.id)}
								r={25}
								style={{ cursor: 'pointer' }}
							>
								<title>{pin.name}</title>
							</circle>
						))}
				</svg>
			)}
		</div>
	);
}
