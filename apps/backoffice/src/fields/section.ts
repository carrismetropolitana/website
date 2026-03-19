/* * */

import type { Field } from 'payload';

import { lexicalEditorConfig } from '@/configs/lexical-editor-config';

/* * */

export const sectionFields: Field[] = [
	{
		defaultValue: false,
		label: 'Com Espaçamento Entre Elementos',
		name: 'withGap',
		type: 'checkbox',
	},
	{
		defaultValue: false,
		label: 'Com Divisor Inferior',
		name: 'withBottomDivider',
		type: 'checkbox',
	},
	{
		defaultValue: 'none',
		label: 'Padding',
		name: 'withPadding',
		options: [
			{ label: 'Sem padding', value: 'none' },
			{ label: 'Desktop', value: 'desktop' },
			{ label: 'Mobile', value: 'mobile' },
			{ label: 'Desktop + Mobile', value: 'all' },
		],
		type: 'select',
	},
	{
		editor: lexicalEditorConfig,
		label: 'Conteúdo',
		name: 'content',
		required: true,
		type: 'richText',
	},
];
