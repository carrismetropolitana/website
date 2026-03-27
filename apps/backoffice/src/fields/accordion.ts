/* * */

import type { Field } from 'payload';

import { lexicalEditorConfig } from '@/configs/lexical-editor-config';

/* * */

export const accordionFields: Field[] = [
	{
		admin: {
			initCollapsed: false,
		},
		defaultValue: [],
		fields: [
			{
				label: 'Título',
				name: 'title',
				required: true,
				type: 'text',
			},
			{
				editor: lexicalEditorConfig,
				label: 'Conteúdo',
				name: 'content',
				required: true,
				type: 'richText',
			},
		],
		label: 'Accordion',
		name: 'accordion',
		type: 'array',
	},
];
