/* * */

import type { Block } from 'payload';

import { campaignLexicalEditor } from '@/fields/campaign-lexical-editor';

/* * */

export const ThreeColumnsTextBlock: Block = {
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
			label: 'Coluna centro',
			name: 'centerColumn',
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
		plural: 'Três colunas (texto)',
		singular: 'Três colunas (texto)',
	},
	slug: 'three-columns-text',
};
