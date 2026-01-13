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

type BadgeState = 'active' | 'hidden' | 'inactive';

export interface Review2025CardSchema {
	_group: string
	_group_title?: string
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
	title: string
}

export interface Review2025CardSchemaContentGroup {
	items: (Review2025CardContentGroupBadgeItem | Review2025CardSchemaContentGroupLines)[]
	title?: string
}

export interface Review2025CardContentGroupBadgeItem {
	badge: typeof Review2025Badge[number]
	description: string
	type: 'badge'
	value: string
}

export interface Review2025CardSchemaContentGroupLines {
	line_id: string
	line_name: string
	type: 'lines'
}

/* * */

export const allCardsData: Review2025CardSchema[] = [

	//
	// Group: "AML"
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
		color: 'c61d23',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '194 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de quilómetros percorridos',
						type: 'badge',
						value: '90 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '5,8 Milhões',
					},
				],
			},
		],
		description: '',
		title: 'área metropolitana de Lisboa',
	},
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
		color: 'c61d23',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num dia útil (15 de outubro)',
						type: 'badge',
						value: '763 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num sábado (31 de maio)',
						type: 'badge',
						value: '340,5 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)',
						type: 'badge',
						value: '310,3 mil',
					},
				],
			},
		],
		description: '',
		title: 'Recordes',
	},
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
		color: 'bb3e96',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados para Lisboa',
						type: 'badge',
						value: '69,8 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados sobre o Tejo',
						type: 'badge',
						value: '12,2 milhões',
					},
				],
			},
		],
		description: '',
		title: 'curiosidades',
	},
	{
		_group: 'por áreas',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'active',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'active',
		},
		color: '3d85c6',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '66,1 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '1,9 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num dia útil (8 de outubro)',
						type: 'badge',
						value: '258,4 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num sábado (31 de maio)',
						type: 'badge',
						value: '117,3 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num domingo / feriado (19 de junho)',
						type: 'badge',
						value: '101,3 mil',
					},
				],
			},
		],
		description: '',
		title: 'área 1',
	},
	{
		_group: 'por áreas',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'active',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'active',
		},
		color: '3d85c6',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '63,4 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '1,6 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num dia útil (15 de outubro)',
						type: 'badge',
						value: '254,8 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num sábado (11 de outubro)',
						type: 'badge',
						value: '108,4 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)',
						type: 'badge',
						value: '92,6 mil',
					},
				],
			},
		],
		description: '',
		title: 'área 2',
	},
	{
		_group: 'por áreas',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'active',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'active',
		},
		color: '3d85c6',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '41,7 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '1,3 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num dia útil (30 de setembro)',
						type: 'badge',
						value: '162,5 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num sábado (31 de maio)',
						type: 'badge',
						value: '81,1 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)',
						type: 'badge',
						value: '74,2 mil',
					},
				],
			},
		],
		description: '',
		title: 'área 3',
	},
	{
		_group: 'por áreas',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'inactive',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'active',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'active',
		},
		color: '3d85c6',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '22,6 Milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '815,3 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num dia útil (10 de outubro)',
						type: 'badge',
						value: '91,6 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num sábado (9 de agosto)',
						type: 'badge',
						value: '44,3 mil',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'recorde de passageiros transportados num domingo / feriado (15 de agosto)',
						type: 'badge',
						value: '42,2 mil',
					},
				],
			},
		],
		description: '',
		title: 'área 4',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '15,5 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '11%',
					},
					{
						line_id: '1715',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1721',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1709',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Amadora',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '2,8 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '19%',
					},
					{
						line_id: '1601',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1625',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1622',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Cascais',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '20,4 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '10%',
					},
					{
						line_id: '1715',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2711',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2790',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Lisboa',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '12,7 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '10%',
					},
					{
						line_id: '1715',
						line_name: 'Linha 1715',
						type: 'lines',
					},
					{
						line_id: '1601',
						line_name: 'Linha 1601',
						type: 'lines',
					},
					{
						line_id: '1502',
						line_name: 'Linha 1502',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Oeiras',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '30,4 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '13%',
					},
					{
						line_id: '1715',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1721',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1709',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Sintra',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '23,5 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '7%',
					},
					{
						line_id: '2711',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2790',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2730',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Loures',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '3,1 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '9%',
					},
					{
						line_id: '2750',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2740',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2754',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Mafra',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '16,3 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '8%',
					},
					{
						line_id: '2769',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '1709',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2772',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Odivelas',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '9 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '14%',
					},
					{
						line_id: '2790',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2303',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '2704',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Vila Franca de Xira',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '19,5 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '11%',
					},
					{
						line_id: '3508',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3022',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3013',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Almada',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '17,3 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '12%',
					},
					{
						line_id: '3508',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3512',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3620',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Seixal',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '2,7 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '8%',
					},
					{
						line_id: '3620',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3536',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3721',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Sesimbra',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '1,3 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '9%',
					},
					{
						line_id: '4600',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4512',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4705',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Alcochete',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '1,6 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '14%',
					},
					{
						line_id: '4600',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '3620',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4602',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Barreiro',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '3,2 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '23%',
					},
					{
						line_id: '4600',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4701',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4602',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Moita',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '3,3 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '17%',
					},
					{
						line_id: '4600',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4701',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4512',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Montijo',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '1,8 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '26%',
					},
					{
						line_id: '4512',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4562',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4710',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Palmela',
	},
	{
		_group: 'por município',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'active',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: '0c807e',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '8,4 milhões',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'total de viagens realizadas',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '16%',
					},
					{
						line_id: '4512',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4720',
						line_name: '',
						type: 'lines',
					},
					{
						line_id: '4426',
						line_name: '',
						type: 'lines',
					},
				],
			},
		],
		description: '',
		title: 'Setúbal',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '36%',
					},
				],
			},
		],
		description: '',
		title: 'Agualva-Cacém (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '27%',
					},
				],
			},
		],
		description: '',
		title: 'Portela de Sintra (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '23%',
					},
				],
			},
		],
		description: '',
		title: 'Gare do Oriente (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '20%',
					},
				],
			},
		],
		description: '',
		title: 'Pragal (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '16%',
					},
				],
			},
		],
		description: '',
		title: 'Amadora (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '11%',
					},
				],
			},
		],
		description: '',
		title: 'Cacilhas (Cais Fluvial)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '10%',
					},
				],
			},
		],
		description: '',
		title: 'Campo Grande (Metro)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '9%',
					},
				],
			},
		],
		description: '',
		title: 'Fogueteiro (Estação)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '7%',
					},
				],
			},
		],
		description: '',
		title: 'Odivelas (Metro)',
	},
	{
		_group: 'por terminal',
		badges: {
			BRIDGES_TOTAL: 'inactive',
			GROWTH: 'active',
			KMS_TOTAL: 'inactive',
			LX_TOTAL: 'inactive',
			PAX_TOTAL: 'active',
			RECORDES_DOM: 'hidden',
			RECORDES_DU: 'inactive',
			RECORDES_SAB: 'hidden',
			TRIPS_TOTAL: 'inactive',
		},
		color: 'fdb71a',
		content: [
			{
				items: [
					{
						badge: 'PAX_TOTAL',
						description: 'total de passageiros transportados',
						type: 'badge',
						value: '',
					},
					{
						badge: 'PAX_TOTAL',
						description: 'percentagem de crescimento face a 2024',
						type: 'badge',
						value: '7%',
					},
				],
			},
		],
		description: '',
		title: 'Pontinha (Metro)',
	},
];
