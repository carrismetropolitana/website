/* * */

import { featuredImageField } from '@/fields/featured-image';
import { isUnlistedField } from '@/fields/is-unlisted';
import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { CollectionConfig } from 'payload';

/* * */

export const Projects: CollectionConfig = {

	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: () => true,
		update: ({ req: { user } }) => Boolean(user),
	},

	fields: [
		{
			label: 'Title',
			localized: true,
			name: 'title',
			type: 'text',
		},
		{
			label: 'Project URL',
			name: 'more_info_url',
			type: 'text',
		},
		{
			label: 'Description',
			localized: true,
			name: 'description',
			type: 'textarea',
		},
		{
			fields: [
				{
					label: 'Keyword',
					name: 'value',
					type: 'text',
				},
			],
			label: 'Keywords',
			name: 'keywords',
			type: 'array',
		},
		isUnlistedField,
		publishedAtField,
		updatedAtField,
		featuredImageField,
	],
	labels: {
		plural: 'Projetos',
		singular: 'Projeto',
	},
	orderable: true,
	slug: 'projects',
	versions: {
		drafts: {
			autosave: {
				interval: 500,
			},
		},
	},

};
