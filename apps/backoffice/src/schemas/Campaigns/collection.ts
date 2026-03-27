/* * */

import type { CollectionConfig } from 'payload';

import { featuredImageField } from '@/fields/featured-image';
import { hasDefaultSurfaceField } from '@/fields/has-default-surface';
import { isUnlistedField } from '@/fields/is-unlisted';
import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

export const Campaigns: CollectionConfig = {
	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: () => true,
		update: ({ req: { user } }) => Boolean(user),
	},

	admin: {
		defaultColumns: ['title', 'status', 'updatedAt'],
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
				description: 'URL única para esta campanha. Será gerada automaticamente do título se deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			required: true,
			type: 'text',
			unique: true,
		},

		{
			label: 'Corpo da Campanha',
			name: 'body',
			required: true,
			type: 'richText',
		},

		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 'draft',
			label: 'Status',
			name: 'status',
			options: [
				{ label: 'Rascunho', value: 'draft' },
				{ label: 'Publicado', value: 'published' },
			],
			required: true,
			type: 'select',
		},
		isUnlistedField,
		hasDefaultSurfaceField,
		featuredImageField,
		publishedAtField,
		updatedAtField,

	],

	hooks: {
		beforeValidate: [
			async ({ data }) => {
				if (data.title && !data.slug) {
					data.slug = slugify(data.title);
				}
			},
		],
	},

	labels: {
		plural: 'Campanhas',
		singular: 'Campanha',
	},

	slug: 'campaigns',

	versions: {
		drafts: {
			autosave: {
				interval: 500,
			},
		},
	},
};
