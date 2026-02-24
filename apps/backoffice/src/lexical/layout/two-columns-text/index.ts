/* * */

import type { Block } from 'payload';

import { lexicalEditorConfigColumn } from '@/configs/lexical-editor-config-layout';

/* * */

export const TwoColumnsTextBlock: Block = {
	fields: [
		{
			editor: lexicalEditorConfigColumn,
			label: 'Coluna esquerda',
			name: 'leftColumn',
			required: true,
			type: 'richText',
		},
		{
			editor: lexicalEditorConfigColumn,
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
