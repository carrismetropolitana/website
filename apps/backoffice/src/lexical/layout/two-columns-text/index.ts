/* * */

import type { Block } from 'payload';

import { lexicalEditorConfig } from '@/configs/lexical-editor-config';

/* * */

export const TwoColumnsTextBlock: Block = {
	fields: [
		{
			editor: lexicalEditorConfig,
			label: 'Coluna esquerda',
			name: 'leftColumn',
			required: true,
			type: 'richText',
		},
		{
			editor: lexicalEditorConfig,
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
