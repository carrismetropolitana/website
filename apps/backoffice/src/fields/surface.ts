/* * */

import type { Field } from 'payload';

/* * */

export function createSurfaceFields(editor: unknown): Field[] {
	const richTextEditor = editor as Extract<Field, { type: 'richText' }>['editor'];

	return [
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
			editor: richTextEditor,
			label: 'Conteúdo',
			name: 'content',
			required: false,
			type: 'richText',
		},
	];
}
