/* * */

import type { Block } from 'payload';

/* * */

export const TwoColumnsTextBlock: Block = {
	fields: [
		{
			label: 'Coluna esquerda',
			name: 'leftColumn',
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
		plural: 'Duas colunas (texto)',
		singular: 'Duas colunas (texto)',
	},
	slug: 'two-columns-text',
};
