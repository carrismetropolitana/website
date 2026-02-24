/* * */

import type { Block } from 'payload';

import { lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

export const ThreeColumnsTextBlock: Block = {
	fields: [
		{
			editor: lexicalEditor({ features: ({ defaultFeatures }) => defaultFeatures }),
			label: 'Coluna esquerda',
			name: 'leftColumn',
			required: true,
			type: 'richText',
		},
		{
			editor: lexicalEditor({ features: ({ defaultFeatures }) => defaultFeatures }),
			label: 'Coluna centro',
			name: 'centerColumn',
			required: true,
			type: 'richText',
		},
		{
			editor: lexicalEditor({ features: ({ defaultFeatures }) => defaultFeatures }),
			label: 'Coluna direita',
			name: 'rightColumn',
			required: true,
			type: 'richText',
		},
	],
	labels: {
		plural: 'Três colunas (texto)',
		singular: 'Três colunas (texto)',
	},
	slug: 'three-columns-text',
};
