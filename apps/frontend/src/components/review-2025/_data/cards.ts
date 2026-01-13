/* * */

import { OneOrTheOther } from '@tmlmobilidade/types';

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

export interface Review2025CardSchema {
	_group: string
	_group_title?: string
	_id: string
	active_badges: typeof Review2025Badge[number][]
	area: 1 | 2 | 3 | 4
	badges: typeof Review2025Badge[number][]
	color: string
	content: {
		content_group: Review2025CardSchemaContentGroup[]
		description: string
	}
	header: string
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
	// Group: "area_1"

	{
		_group: 'aml',
		_group_title: 'AML',
		_id: 'aml',
		active_badges: ['PAX_TOTAL', 'KMS_TOTAL', 'TRIPS_TOTAL'],
		area: 1,
		badges: ['PAX_TOTAL', 'RECORDES_DU', 'KMS_TOTAL', 'BRIDGES_TOTAL', 'TRIPS_TOTAL', 'LX_TOTAL', 'GROWTH'],
		color: '#FFDD00',
		content: {
			content_group: [
				{
					items: [
						{
							badge: 'PAX_TOTAL',
							description: 'total de passageiros transportados',
							type: 'badge',
							value: '194 Milhões',
						},
						{
							badge: 'KMS_TOTAL',
							description: 'total de quilómetros percorridos',
							type: 'badge',
							value: '100 Milhões',
						},
						{
							badge: 'TRIPS_TOTAL',
							description: 'total de viagens realizadas',
							type: 'badge',
							value: '7,3 Milhões',
						},
					],
				},
			],
			description: 'Total de viagens realizadas em 2025',
		},
		header: 'header',
	},
];
