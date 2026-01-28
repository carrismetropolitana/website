'use client';

import React from 'react';

import { BEACH_PINS, STOPS } from '../constants';

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

// Define interactive areas for each beach - includes all elements (icons, text, lines on map)
// Each beach can have multiple clickable polygons/rectangles
const BEACH_INTERACTIVE_AREAS = {
	'praia-albarquel': [
		// Beach icon and name area
		{ height: 200, width: 350, x: 860, y: 750 },
		// Line connection area (vertical line in legend)
		{ height: 170, width: 40, x: 1172, y: 823 },
		// Bus route line on map - upper section
		{ height: 80, width: 250, x: 1400, y: 570 },
		{ height: 120, width: 200, x: 1430, y: 620 },
		{ height: 200, width: 150, x: 1500, y: 610 },
		{ height: 80, width: 200, x: 1380, y: 820 },
		{ height: 120, width: 150, x: 1210, y: 940 },
		// Route continuing down
		{ height: 300, width: 120, x: 1000, y: 1000 },
		{ height: 100, width: 150, x: 890, y: 1280 },
	],
	'praia-creiro': [
		// Beach icon and name area
		{ height: 180, width: 380, x: 310, y: 1080 },
	],
	'praia-figueirinha': [
		// Beach icon and name area
		{ height: 180, width: 350, x: 520, y: 990 },
	],
	'praia-galapos-galapinhos': [
		// Galapos beach icon and name area (upper)
		{ height: 220, width: 380, x: 760, y: 1320 },
		// Line connection between beaches
		{ height: 165, width: 40, x: 744, y: 1335 },
		// Galapinhos beach icon and name area (lower)
		{ height: 230, width: 380, x: 690, y: 1580 },
		// Lower line connection
		{ height: 140, width: 40, x: 671, y: 1530 },
	],
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

	// Determine which beach legend to show
	// When hovering, show the hovered beach legend; otherwise show the selected beach legend
	const displayBeachId = hoveredBeachId || selectedAccordionId;

	// Determine which line to show
	// When hovering over a different beach, show the hovered beach's line (not the selected one)
	const displayLineId = React.useMemo(() => {
		// If hovering over a beach, show its line
		if (hoveredBeachId) {
			const beach = BEACH_PINS.find(b => b.accordionId === hoveredBeachId);
			return beach?.lineIds?.[0] || null;
		}
		// If a specific line is selected from accordion, use that
		if (selectedLineId) {
			return selectedLineId;
		}
		// Otherwise show the selected beach's default line
		if (selectedAccordionId) {
			const beach = BEACH_PINS.find(b => b.accordionId === selectedAccordionId);
			return beach?.lineIds?.[0] || null;
		}
		return null;
	}, [hoveredBeachId, selectedLineId, selectedAccordionId]);

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
			{displayLineId && (
				<img
					alt={`Linha ${displayLineId}`}
					src={`/assets/arrabidas/lines/Mapa365_${displayLineId}.svg`}
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

			{/* Interactive areas - covers all beach elements (icons, text, lines) */}
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
					zIndex: 10,
				}}
			>
				{Object.entries(BEACH_INTERACTIVE_AREAS).map(([beachId, areas]) =>
					areas.map((area, index) => (
						<rect
							key={`${beachId}-${index}`}
							fill="transparent"
							height={area.height}
							onMouseEnter={() => handlePinMouseEnter(beachId)}
							onMouseLeave={handlePinMouseLeave}
							style={{ cursor: 'pointer' }}
							width={area.width}
							x={area.x}
							y={area.y}
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								handlePinClick(beachId);
							}}
						>
							<title>{BEACH_PINS.find(b => b.accordionId === beachId)?.name || beachId}</title>
						</rect>
					)),
				)}
			</svg>

			{/* Stop markers - rendered as absolute images to match other layers */}
			{STOPS.map((stop) => {
				const stopSize = 35; // Small size for the cropped SVG stop icons
				// Calculate percentage positions based on SVG viewBox (1797.1 x 2210.35)
				const left = (stop.position.x / 1797.1) * 100;
				const top = (stop.position.y / 2210.35) * 100;
				const widthPercent = (stopSize / 1797.1) * 100;

				// Format stop ID with leading zero (1 -> 01, 11 -> 11)
				const formattedId = String(stop.id).padStart(2, '0');

				return (
					<img
						key={stop.id}
						alt={stop.name}
						src={`/assets/arrabidas/stops/${formattedId}.svg`}
						title={stop.name}
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							handlePinClick(stop.accordionId);
						}}
						// Add title for hover text
						style={{
							cursor: 'pointer',
							left: `${left}%`,
							pointerEvents: 'auto',
							position: 'absolute',
							top: `${top}%`,
							transform: 'translate(-50%, -50%)', // Center on coordinates
							visibility: 'visible', // Ensure visibility
							width: `${widthPercent}%`, // Scale relative to map size
							zIndex: 11, // Above interactive areas
						}}
					/>
				);
			})}
		</div>
	);
}
