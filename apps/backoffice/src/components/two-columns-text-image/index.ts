/* * */

import type { Block } from 'payload';

/* * */

export const TwoColumnsTextImageBlock: Block = {
	fields: [
		{
			label: 'Texto',
			name: 'text',
			required: true,
			type: 'richText',
		},
		{
			filterOptions: () => ({
				mimeType: {
					in: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
				},
			}),
			label: 'Imagem',
			name: 'image',
			relationTo: 'media',
			required: true,
			type: 'relationship',
		},
		{
			defaultValue: 'right',
			label: 'Posição da imagem',
			name: 'imagePosition',
			options: [
				{ label: 'Esquerda', value: 'left' },
				{ label: 'Direita', value: 'right' },
			],
			type: 'radio',
		},
	],
	labels: {
		plural: 'Duas colunas (texto + imagem)',
		singular: 'Duas colunas (texto + imagem)',
	},
	slug: 'two-columns-text-image',
};
