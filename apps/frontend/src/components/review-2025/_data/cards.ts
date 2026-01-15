/* * */

import * as Icons from './icons';

/* * */

export const Review2025Badge = [
	'PAX_TOTAL',
	'RECORDES_DU',
	'KMS_TOTAL',
	'BRIDGES_TOTAL',
	'TRIPS_TOTAL',
	'LX_TOTAL',
	'RECORDES_SAB',
	'RECORDES_DOM',
	'GROWTH',
] as const;

export const Review2025BadgeToIcon: Record<typeof Review2025Badge[number], keyof typeof Icons> = {
	BRIDGES_TOTAL: 'BridgesTotalIcon',
	GROWTH: 'GrowthIcon',
	KMS_TOTAL: 'KmsTotalIcon',
	LX_TOTAL: 'LxTotalIcon',
	PAX_TOTAL: 'PaxTotalIcon',
	RECORDES_DOM: 'RecordesDomIcon',
	RECORDES_DU: 'RecordesDuIcon',
	RECORDES_SAB: 'RecordesSabIcon',
	TRIPS_TOTAL: 'TripsTotalIcon',
} as const;

type BadgeState = 'active' | 'hidden' | 'inactive';

export interface Review2025CardSchema {
	_group: string
	_group_title?: string
	area?: 1 | 2 | 3 | 4
	badges: {
		BRIDGES_TOTAL: BadgeState
		GROWTH: BadgeState
		KMS_TOTAL: BadgeState
		LX_TOTAL: BadgeState
		PAX_TOTAL: BadgeState
		RECORDES_DOM: BadgeState
		RECORDES_DU: BadgeState
		RECORDES_SAB: BadgeState
		TRIPS_TOTAL: BadgeState
	}
	color: string
	content: Review2025CardSchemaContentGroup[]
	description: string
	subtitle?: string
	title: string
}

export interface Review2025CardSchemaContentGroup {
	items: (Review2025CardSchemaContentItemBadge | Review2025CardSchemaContentItemLine)[]
	title?: string
}

export interface Review2025CardSchemaContentItemBadge {
	badge: typeof Review2025Badge[number]
	description: string
	type: 'badge'
	value: string
}

export interface Review2025CardSchemaContentItemLine {
	line_id: number
	type: 'lines'
}

/* * */

//
// Area Badges
const areaBadges: Record<typeof Review2025Badge[number], BadgeState> = {
	BRIDGES_TOTAL: 'inactive',
	GROWTH: 'inactive',
	KMS_TOTAL: 'inactive',
	LX_TOTAL: 'inactive',
	PAX_TOTAL: 'active',
	RECORDES_DOM: 'hidden',
	RECORDES_DU: 'active',
	RECORDES_SAB: 'hidden',
	TRIPS_TOTAL: 'active',
};

//
// Municipality Badges
const municipalityBadges: Record<typeof Review2025Badge[number], BadgeState> = {
	BRIDGES_TOTAL: 'inactive',
	GROWTH: 'active',
	KMS_TOTAL: 'active',
	LX_TOTAL: 'inactive',
	PAX_TOTAL: 'active',
	RECORDES_DOM: 'hidden',
	RECORDES_DU: 'inactive',
	RECORDES_SAB: 'hidden',
	TRIPS_TOTAL: 'inactive',
};

//
// Terminal Badges
const terminalBadges: Record<typeof Review2025Badge[number], BadgeState> = {
	BRIDGES_TOTAL: 'inactive',
	GROWTH: 'active',
	KMS_TOTAL: 'inactive',
	LX_TOTAL: 'inactive',
	PAX_TOTAL: 'active',
	RECORDES_DOM: 'hidden',
	RECORDES_DU: 'inactive',
	RECORDES_SAB: 'hidden',
	TRIPS_TOTAL: 'inactive',
};

/* * */

//
// AML Data
export const amlData: Review2025CardSchema[] = [
	//
	// Area Metropolitana de Lisboa

	{
		_group: 'área metropolitana de Lisboa',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'inactive',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'active',
		},
		color: '#c61d23',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '194 Milhões' },
					{ badge: 'KMS_TOTAL', description: 'total de quilómetros percorridos', type: 'badge', value: '90 Milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '5,8 Milhões' },
				],
			},
		],
		description: 'Em 2025, fomos 13,3% maiores que no ano passado!',
		title: 'área metropolitana de Lisboa',
	},

	//
	// Recordes

	{
		_group: 'área metropolitana de Lisboa',
		badges: {
			BRIDGES_TOTAL: 'hidden',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'hidden',
			PAX_TOTAL: 'inactive',
			RECORDES_DOM: 'active',
			RECORDES_DU: 'active',
			RECORDES_SAB: 'active',
			TRIPS_TOTAL: 'inactive',
		},
		color: '#c61d23',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num dia útil (15 de outubro)', type: 'badge', value: '763 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num sábado (31 de maio)', type: 'badge', value: '340,5 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)', type: 'badge', value: '310,3 mil' },
				],
			},
		],
		description: '',
		title: 'Recordes',
	},

	//
	// Curiosidades

	{
		_group: 'área metropolitana de Lisboa',
		badges: {
			BRIDGES_TOTAL: 'active',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'active',
			PAX_TOTAL: 'inactive',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '#bb3e96',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados para Lisboa', type: 'badge', value: '69,8 milhões' },
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados sobre o Tejo', type: 'badge', value: '12,2 milhões' },
				],
			},
		],
		description: '',
		title: 'curiosidades',
	},
];

//
// Area Data
export const areaData: Review2025CardSchema[] = [
	{
		_group: 'por áreas',
		badges: areaBadges,
		color: '#3d85c6',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '66,1 Milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1,9 Milhões' },
				],
			},
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num dia útil (8 de outubro)', type: 'badge', value: '258,4 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num sábado (31 de maio)', type: 'badge', value: '117,3 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num domingo / feriado (19 de junho)', type: 'badge', value: '101,3 mil' },
				],
				title: 'Recordes',
			},
		],
		description: '',
		subtitle: '(Amadora, Cascais, Lisboa, Oeiras, Sintra)',
		title: 'área 1',
	},
	{
		_group: 'por áreas',
		badges: areaBadges,
		color: '#3d85c6',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '63,4 Milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1,6 Milhões' },
				],
			},
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num dia útil (15 de outubro)', type: 'badge', value: '254,8 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num sábado (11 de outubro)', type: 'badge', value: '108,4 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)', type: 'badge', value: '92,6 mil' },
				],
				title: 'Recordes',
			},
		],
		description: '',
		subtitle: '(Loures, Mafra, Odivelas, Vila Franca de Xira)',
		title: 'área 2',
	},
	{
		_group: 'por áreas',
		badges: areaBadges,
		color: '#3d85c6',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '41,7 Milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1,3 Milhões' },
				],
			},
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num dia útil (30 de setembro)', type: 'badge', value: '162,5 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num sábado (31 de maio)', type: 'badge', value: '81,1 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)', type: 'badge', value: '74,2 mil' },
				],
				title: 'Recordes',
			},
		],
		description: '',
		subtitle: '(Almada, Seixal, Sesimbra)',
		title: 'área 3',
	},
	{
		_group: 'por áreas',
		badges: areaBadges,
		color: '#3d85c6',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '22,6 Milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '815,3 mil' },
				],
			},
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num dia útil (10 de outubro)', type: 'badge', value: '91,6 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num sábado (9 de agosto)', type: 'badge', value: '44,3 mil' },
					{ badge: 'PAX_TOTAL', description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)', type: 'badge', value: '42,2 mil' },
				],
				title: 'Recordes',
			},
		],
		description: '',
		subtitle: '(Alcochete, Barreiro, Moita, Montijo, Palmela, Setúbal)',
		title: 'área 4',
	},
];

//
// Municipality Data
export const municipalityData: Review2025CardSchema[] = [
	{
		_group: 'por município',
		area: 1,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '15,5 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '835,6 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '11%' },
				],
			},
			{
				items: [
					{ line_id: 1715, type: 'lines' },
					{ line_id: 1721, type: 'lines' },
					{ line_id: 1709, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Amadora',
	},
	{
		_group: 'por município',
		area: 1,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2,8 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '308 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '19%' },
				],
			},
			{
				items: [
					{ line_id: 1601, type: 'lines' },
					{ line_id: 1625, type: 'lines' },
					{ line_id: 1622, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Cascais',
	},
	{
		_group: 'por município',
		area: 1,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '20,4 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1,8 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '10%' },
				],
			},
			{
				items: [
					{ line_id: 1715, type: 'lines' },
					{ line_id: 2711, type: 'lines' },
					{ line_id: 2790, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Lisboa',
	},
	{
		_group: 'por município',
		area: 1,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '12,7 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '778,2 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '10%' },
				],
			},
			{
				items: [
					{ line_id: 1715, type: 'lines' },
					{ line_id: 1601, type: 'lines' },
					{ line_id: 1502, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Oeiras',
	},
	{
		_group: 'por município',
		area: 1,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '30,4 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1,4 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '13%' },
				],
			},
			{
				items: [
					{ line_id: 1715, type: 'lines' },
					{ line_id: 1721, type: 'lines' },
					{ line_id: 1709, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Sintra',
	},
	{
		_group: 'por município',
		area: 2,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '23,5 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '1 Milhão' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '7%' },
				],
			},
			{
				items: [
					{ line_id: 2711, type: 'lines' },
					{ line_id: 2790, type: 'lines' },
					{ line_id: 2730, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Loures',
	},
	{
		_group: 'por município',
		area: 2,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '3,1 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '207,1 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '9%' },
				],
			},
			{
				items: [
					{ line_id: 2750, type: 'lines' },
					{ line_id: 2740, type: 'lines' },
					{ line_id: 2754, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Mafra',
	},
	{
		_group: 'por município',
		area: 2,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '16,3 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '756,3 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '8%' },
				],
			},
			{
				items: [
					{ line_id: 2769, type: 'lines' },
					{ line_id: 1709, type: 'lines' },
					{ line_id: 2772, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Odivelas',
	},
	{
		_group: 'por município',
		area: 2,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '9 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '373,6 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '14%' },
				],
			},
			{
				items: [
					{ line_id: 2790, type: 'lines' },
					{ line_id: 2303, type: 'lines' },
					{ line_id: 2704, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Vila Franca de Xira',
	},
	{
		_group: 'por município',
		area: 3,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '19,5 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '976,1 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '11%' },
				],
			},
			{
				items: [
					{ line_id: 3508, type: 'lines' },
					{ line_id: 3022, type: 'lines' },
					{ line_id: 3013, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Almada',
	},
	{
		_group: 'por município',
		area: 3,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '17,3 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '776,9 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '12%' },
				],
			},
			{
				items: [
					{ line_id: 3508, type: 'lines' },
					{ line_id: 3512, type: 'lines' },
					{ line_id: 3620, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Seixal',
	},
	{
		_group: 'por município',
		area: 3,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2,7 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '212,9 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '8%' },
				],
			},
			{
				items: [
					{ line_id: 3620, type: 'lines' },
					{ line_id: 3536, type: 'lines' },
					{ line_id: 3721, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Sesimbra',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,3 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '153,2 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '9%' },
				],
			},
			{
				items: [
					{ line_id: 4600, type: 'lines' },
					{ line_id: 4512, type: 'lines' },
					{ line_id: 4705, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Alcochete',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,6 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '173,1 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '14%' },
				],
			},
			{
				items: [
					{ line_id: 4600, type: 'lines' },
					{ line_id: 3620, type: 'lines' },
					{ line_id: 4602, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Barreiro',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '3,2 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '150,6 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '23%' },
				],
			},
			{
				items: [
					{ line_id: 4600, type: 'lines' },
					{ line_id: 4701, type: 'lines' },
					{ line_id: 4602, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Moita',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '3,3 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '227,7 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '17%' },
				],
			},
			{
				items: [
					{ line_id: 4600, type: 'lines' },
					{ line_id: 4701, type: 'lines' },
					{ line_id: 4512, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Montijo',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,8 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '200 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '26%' },
				],
			},
			{
				items: [
					{ line_id: 4512, type: 'lines' },
					{ line_id: 4562, type: 'lines' },
					{ line_id: 4710, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Palmela',
	},
	{
		_group: 'por município',
		area: 4,
		badges: municipalityBadges,
		color: '#0c807e',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '8,4 milhões' },
					{ badge: 'TRIPS_TOTAL', description: 'total de viagens realizadas', type: 'badge', value: '474,2 mil' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '16%' },
				],
			},
			{
				items: [
					{ line_id: 4512, type: 'lines' },
					{ line_id: 4720, type: 'lines' },
					{ line_id: 4426, type: 'lines' },
				],
				title: 'top 3 linhas',
			},
		],
		description: '',
		title: 'Setúbal',
	},
];

//
// Terminal Data
export const terminalsData: Review2025CardSchema[] = [
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2,6 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '36%' },
				],
			},
		],
		description: '',
		title: 'Agualva-Cacém (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,8 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '27%' },
				],
			},
		],
		description: '',
		title: 'Portela de Sintra (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '5,1 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '23%' },
				],
			},
		],
		description: '',
		title: 'Gare do Oriente (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,8 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '20%' },
				],
			},
		],
		description: '',
		title: 'Pragal (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '16%' },
				],
			},
		],
		description: '',
		title: 'Amadora (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '11%' },
				],
			},
		],
		description: '',
		title: 'Cacilhas (Cais Fluvial)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '4,5 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '10%' },
				],
			},
		],
		description: '',
		title: 'Campo Grande (Metro)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '1,5 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '9%' },
				],
			},
		],
		description: '',
		title: 'Fogueteiro (Estação)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2,5 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '7%' },
				],
			},
		],
		description: '',
		title: 'Odivelas (Metro)',
	},
	{
		_group: 'por terminal',
		badges: terminalBadges,
		color: '#fdb71a',
		content: [
			{
				items: [
					{ badge: 'PAX_TOTAL', description: 'total de passageiros transportados', type: 'badge', value: '2 Milhões' },
					{ badge: 'GROWTH', description: 'percentagem de crescimento face a 2024', type: 'badge', value: '7%' },
				],
			},
		],
		description: '',
		title: 'Pontinha (Metro)',
	},
];
