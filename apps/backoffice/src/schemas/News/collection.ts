/* * */

import { featuredImageField } from '@/fields/featured-image';
import { isFeaturedField } from '@/fields/is-featured';
import { isUnlistedField } from '@/fields/is-unlisted';
import { publishedAtField } from '@/fields/published-at';
import { topicsField } from '@/fields/topics';
import { updatedAtField } from '@/fields/updated-at';
import { type CollectionConfig } from 'payload';

/* * */

export const News: CollectionConfig = {
	access: {
		create: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
		read: () => true,
		update: ({ req }) => Boolean(req.user),

	},
	admin: {
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
			label: 'Resumo curto',
			name: 'summary',
			required: true,
			type: 'textarea',
		},
		{
			label: 'Corpo da Notícia',
			name: 'body',
			required: true,
			type: 'richText',
		},
		isFeaturedField,
		isUnlistedField,
		topicsField,
		featuredImageField,
		publishedAtField,
		updatedAtField,
	],
	labels: {
		plural: 'Notícias',
		singular: 'Notícia',
	},

	slug: 'news',

	timestamps: true,

	versions: {
		drafts: {
			autosave: {
				interval: 500,
			},
		},
	},

};
