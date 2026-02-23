/* * */

import type { Block } from 'payload';

import { campaignLexicalEditor } from '@/fields/campaign-lexical-editor';

/* * */

export const TwoColumnsTextBlock: Block = {
	fields: [
		{
			editor: campaignLexicalEditor,
			label: 'Coluna esquerda',
			name: 'leftColumn',
			required: true,
			type: 'richText',
		},
		{
			editor: campaignLexicalEditor,
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
