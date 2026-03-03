/* * */

import type { Field } from 'payload';

/* * */

export const galleryFields: Field[] = [
	{
		admin: {
			components: {
				afterInput: ['@/components/GalleryFieldPreview#GalleryFieldPreview'] as const,
			},
			description: 'As imagens selecionadas serão exibidas aqui.',
		},
		filterOptions: () => ({
			mimeType: {
				in: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
			},
		}),
		hasMany: true,
		label: 'Imagens',
		name: 'images',
		relationTo: 'media',
		required: true,
		type: 'relationship',
	},
	{
		label: 'Título da galeria (opcional)',
		name: 'title',
		required: false,
		type: 'text',
	},
];
