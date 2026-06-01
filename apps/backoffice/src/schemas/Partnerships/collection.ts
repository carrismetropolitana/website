/* * */

import type { CollectionConfig } from 'payload';

import { slugify } from '@/utils/slugify';

/* * */

export const Partnerships: CollectionConfig = {
	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: () => true,
		update: ({ req: { user } }) => Boolean(user),
	},

	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		useAsTitle: 'title',
	},

	fields: [
		{
			label: 'Título',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			admin: {
				description: 'URL única para esta parceria. Será gerada automaticamente do título se deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			required: true,
			type: 'text',
			unique: true,
		},
		{
			label: 'Descrição',
			name: 'description',
			type: 'textarea',
		},
	],

	hooks: {
		beforeValidate: [
			async ({ data }) => {
				if (data.title && !data.slug) {
					data.slug = slugify(data.title);
				}
				if (data.slug) {
					data.slug = slugify(data.slug);
				}
			},
		],
	},

	labels: {
		plural: 'Parcerias',
		singular: 'Parceria',
	},

	slug: 'partnerships',

	timestamps: true,
};
