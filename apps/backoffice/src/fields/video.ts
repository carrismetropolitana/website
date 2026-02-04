/* * */

import type { Field } from 'payload';

/* * */

export const videoFields: Field[] = [
	{
		defaultValue: 'media',
		label: 'Origem do vídeo',
		name: 'source',
		options: [
			{
				label: 'Media',
				value: 'media',
			},
			{
				label: 'URL externa',
				value: 'external',
			},
		],
		type: 'radio',
	},
	{
		admin: {
			condition: (_, siblingData) => siblingData?.source === 'media',
		},
		filterOptions: () => ({
			mimeType: {
				equals: 'video/mp4',
			},
		}),
		label: 'Media (opcional)',
		name: 'video',
		relationTo: 'media',
		required: false,
		type: 'relationship',
	},
	{
		admin: {
			condition: (_, siblingData) => siblingData?.source === 'external',
		},
		label: 'URL do vídeo',
		name: 'videoUrl',
		required: false,
		type: 'text',
	},
	{
		label: 'Legenda (opcional)',
		name: 'caption',
		required: false,
		type: 'text',
	},
];
