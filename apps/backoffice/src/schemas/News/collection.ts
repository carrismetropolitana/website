/* * */

import { optionalThemeField, partnershipField, specialSeriesField } from '@/fields/content-classification';
import { featuredImageField } from '@/fields/featured-image';
import { isFeaturedField } from '@/fields/is-featured';
import { isUnlistedField } from '@/fields/is-unlisted';
import { publishedAtField } from '@/fields/published-at';
import { topicsField } from '@/fields/topics';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';
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
		defaultColumns: ['featured_image', 'title', 'publishedAt', '_status'],
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
				description: 'URL amigável para esta notícia. Será gerada automaticamente do título se deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			type: 'text',
			unique: true,
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
		optionalThemeField,
		specialSeriesField,
		partnershipField,
		isFeaturedField,
		isUnlistedField,
		topicsField,
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
