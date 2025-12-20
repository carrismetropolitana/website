import { type BeachPin, type Stop } from './types';

export const BEACH_PINS: BeachPin[] = [
	{
		accordionId: 'praia-albarquel',
		coordinates: [-8.9149, 38.5110],
		id: 'albarquel',
		lineIds: ['4474', '4414', '4415', '4471'],
		name: 'Praia de Albarquel',
	},
	{
		accordionId: 'praia-figueirinha',
		coordinates: [-8.9446, 38.4842],
		id: 'figueirinha',
		lineIds: ['4474'],
		name: 'Praia da Figueirinha',
	},
	{
		accordionId: 'praia-galapos-galapinhos',
		coordinates: [-8.963937155027402, 38.48453365691419],
		id: 'galapos',
		lineIds: ['4477'],
		name: 'Praia dos Galápos',
	},
	{
		accordionId: 'praia-creiro',
		coordinates: [-8.97758598072809, 38.48050625031089],
		id: 'creiro',
		lineIds: ['4470', '4477'],
		name: 'Praia do Creiro',
	},
];

// Stop configurations - positions are in SVG viewBox coordinates (1797.1 x 2210.35)
export const STOPS: Stop[] = [
	{
		accordionId: 'praia-albarquel',
		id: 1,
		name: 'Albarquel (N10-4)',
		position: { x: 1230, y: 950 }, // On the route near Albarquel
	},
	{
		accordionId: 'praia-albarquel',
		id: 2,
		name: 'Praia Albarquel',
		position: { x: 1195, y: 985 }, // Near Praia de Albarquel label
	},
	{
		accordionId: 'praia-figueirinha',
		id: 3,
		name: 'Outão X',
		position: { x: 1020, y: 1230 }, // Between Figueirinha and coast
	},
	{
		accordionId: 'praia-figueirinha',
		id: 4,
		name: 'Praia da Figueirinha',
		position: { x: 880, y: 1320 }, // Near Figueirinha on coast
	},
	{
		accordionId: 'praia-galapos-galapinhos',
		id: 5,
		name: 'Praia dos Galápos',
		position: { x: 814, y: 1315 }, // First stop near Galápos
	},
	{
		accordionId: 'praia-galapos-galapinhos',
		id: 6,
		name: 'Praia dos Galápos (acesso Pedonal)',
		position: { x: 740, y: 1312 }, // Second stop near Galápos
	},
	{
		accordionId: 'praia-galapos-galapinhos',
		id: 7,
		name: 'Frente Praia dos Galapinhos',
		position: { x: 680, y: 1316 }, // Near Galapinhos at bottom
	},
	{
		accordionId: 'praia-creiro',
		id: 8,
		name: 'Praia do Creiro (Parque de Estacionamento)',
		position: { x: 550, y: 1350 }, // Lower Creiro stop
	},
	{
		accordionId: 'praia-creiro',
		id: 9,
		name: 'Praia do Creiro',
		position: { x: 550, y: 1420 }, // Upper Creiro stop near label
	},
	{
		accordionId: 'praia-albarquel',
		id: 10,
		name: 'Setúbal (ITS)',
		position: { x: 1520, y: 740 }, // Top right area - Setúbal
	},
	{
		accordionId: 'praia-albarquel',
		id: 11,
		name: 'Setúbal (Centro Comercial)',
		position: { x: 1600, y: 620 }, // Far top right - Setúbal
	},
];
