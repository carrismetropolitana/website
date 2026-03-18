/* * */

import type { Block } from 'payload';

import { lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

export const TwoColumnsTextBlock: Block = {
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
			label: 'Coluna direita',
			name: 'rightColumn',
			required: true,
			type: 'richText',
		},
	],
	labels: {
		plural: 'Duas colunas (texto)',
		singular: 'Duas colunas (texto)',
	},
	slug: 'two-columns-text',
};
