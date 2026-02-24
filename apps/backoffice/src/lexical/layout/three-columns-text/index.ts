/* * */

import type { Block } from 'payload';

import { lexicalEditorConfigColumn } from '@/configs/lexical-editor-config-layout';

/* * */

export const ThreeColumnsTextBlock: Block = {
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
			label: 'Coluna centro',
			name: 'centerColumn',
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
		plural: 'Três colunas (texto)',
		singular: 'Três colunas (texto)',
	},
	slug: 'three-columns-text',
};
