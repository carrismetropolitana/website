/* * */

import type { Block } from 'payload';

/* * */

export const ThreeColumnsTextBlock: Block = {
	fields: [
		{
			label: 'Coluna esquerda',
			name: 'leftColumn',
			required: true,
			type: 'richText',
		},
		{
			label: 'Coluna centro',
			name: 'centerColumn',
			required: true,
			type: 'richText',
		},
		{
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
