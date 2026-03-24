/* * */

import type { Block } from 'payload';

import { lexicalEditorConfig } from '@/configs/lexical-editor-config';

/* * */

export const ThreeColumnsTextBlock: Block = {
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
			label: 'Coluna centro',
			name: 'centerColumn',
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
		plural: 'Três colunas',
		singular: 'Três colunas',
	},
	slug: 'three-columns-text',
};
