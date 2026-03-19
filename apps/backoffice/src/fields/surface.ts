/* * */

import type { Field } from 'payload';

import { lexicalEditorConfigColumn } from '@/configs/lexical-editor-config';

/* * */

export const surfaceFields: Field[] = [
	{
		defaultValue: false,
		label: 'Full Height',
		name: 'fullHeight',
		type: 'checkbox',
	},
	{
		defaultValue: false,
		label: 'Force Overflow',
		name: 'forceOverflow',
		type: 'checkbox',
	},
	{
		editor: lexicalEditorConfigColumn,
		label: 'Conteúdo',
		name: 'content',
		required: true,
		type: 'richText',
	},
];
