/* * */

import type { Field } from 'payload';

import { lexicalEditorConfig } from '@/configs/lexical-editor-config';

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
		defaultValue: false,
		label: 'Usar imagem de fundo',
		name: 'hasBackgroundImage',
		type: 'checkbox',
	},
	{
		admin: {
			condition: (_, siblingData) => siblingData?.hasBackgroundImage === true,
		},
		filterOptions: () => ({
			mimeType: {
				in: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
			},
		}),
		label: 'Imagem de fundo',
		name: 'backgroundImage',
		relationTo: 'media',
		required: false,
		type: 'relationship',
	},
	{
		admin: {
			condition: (_, siblingData) => siblingData?.hasBackgroundImage === true,
		},
		defaultValue: false,
		label: 'Aplicar overlay escuro',
		name: 'backgroundOverlay',
		type: 'checkbox',
	},
	{
		editor: lexicalEditorConfig,
		label: 'Conteúdo',
		name: 'content',
		required: false,
		type: 'richText',
	},
];
