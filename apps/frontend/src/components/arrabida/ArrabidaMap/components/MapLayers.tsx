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

export function MapLayers({ onPinClick, selectedAccordionId, selectedLineId, style, ...props }: MapLayersProps) {
	const [hoveredBeachId, setHoveredBeachId] = React.useState<null | string>(null);

	const handlePinClick = (beachId: string) => {
		if (onPinClick) {
			onPinClick(beachId);
		}
	};

	const handlePinMouseEnter = (beachId: string) => {
		setHoveredBeachId(beachId);
	};

	const handlePinMouseLeave = () => {
		setHoveredBeachId(null);
	};

	// Define clickable pin areas with coordinates
	// These coordinates correspond to the pin locations in Mapa365_ParagensOff.svg
	const beachPins = [
		{ accordionId: 'praia-albarquel', id: 'albarquel', name: 'Praia de Albarquel', x: 944, y: 805 },
		{ accordionId: 'praia-figueirinha', id: 'figueirinha', name: 'Praia da Figueirinha', x: 659, y: 1072 },
		{ accordionId: 'praia-creiro', id: 'creiro', name: 'Praia do Creiro', x: 393, y: 1172 },
		{ accordionId: 'praia-galapos-galapinhos', id: 'galapos', name: 'Praia dos Galápos e Galapinhos', x: 1009, y: 1402 },
	];

	// Determine which beach to show (hovered pin takes priority over clicked accordion)
	const displayBeachId = hoveredBeachId || selectedAccordionId;

	// Get the line ID for the displayed beach
	const displayLineIdForBeach = React.useMemo(() => {
		if (displayBeachId) {
			const beach = BEACH_PINS.find(b => b.accordionId === displayBeachId);
			return beach?.lineIds?.[0] || null;
		}
		return null;
	}, [displayBeachId]);

	// Use provided lineId if available, otherwise use the one from displayBeachId
	const finalLineId = selectedLineId || displayLineIdForBeach;

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
					display: 'block',
					height: '100%',
					left: 0,
					objectFit: 'fill',
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 1,
				}}
			/>

			{/* Lines Off - always visible */}
			<img
				alt="Linhas desligadas"
				src="/assets/arrabidas/Mapa365_LinhasOff.svg"
				style={{
					display: 'block',
					height: '100%',
					left: 0,
					objectFit: 'fill',
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 2,
				}}
			/>

			{/* Paragens Off - always visible */}
			<img
				alt="Paragens desligadas"
				src="/assets/arrabidas/Mapa365_ParagensOff.svg"
				style={{
					display: 'block',
					height: '100%',
					left: 0,
					objectFit: 'fill',
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 3,
				}}
			/>

			{/* Selected or Hovered state: Show specific beach legend */}
			{displayBeachId && LEGENDA_MAP[displayBeachId as keyof typeof LEGENDA_MAP] && (
				<img
					alt={`Legenda para ${displayBeachId}`}
					src={`/assets/arrabidas/legenda/${LEGENDA_MAP[displayBeachId as keyof typeof LEGENDA_MAP]}.svg`}
					style={{
						display: 'block',
						height: '100%',
						left: 0,
						objectFit: 'fill',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 4,
					}}
				/>
			)}

			{/* Selected or Hovered state: Show specific line */}
			{finalLineId && (
				<img
					alt={`Linha ${finalLineId}`}
					src={`/assets/arrabidas/lines/Mapa365_${finalLineId}.svg`}
					style={{
						display: 'block',
						height: '100%',
						left: 0,
						objectFit: 'fill',
						position: 'absolute',
						top: 0,
						width: '100%',
						zIndex: 5,
					}}
				/>
			)}

			{/* Interactive pin areas - always present for clicks on ParagensOff */}
			<svg
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1797.1 2210.35"
				style={{
					height: '100%',
					left: 0,
					pointerEvents: 'auto',
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 100,
				}}
			>
				{beachPins.map(pin => (
					<circle
						key={pin.id}
						cx={pin.x}
						cy={pin.y}
						fill="transparent"
						onMouseEnter={() => handlePinMouseEnter(pin.accordionId)}
						onMouseLeave={handlePinMouseLeave}
						r={50}
						style={{ cursor: 'pointer' }}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							handlePinClick(pin.accordionId);
						}}
					>
						<title>{pin.name}</title>
					</circle>
				))}
			</svg>
		</div>
	);
}
