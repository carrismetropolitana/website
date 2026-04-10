/* * */

import { featuredImageField } from '@/fields/featured-image';
import { isUnlistedField } from '@/fields/is-unlisted';
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
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					fields: [
						{
							label: 'Title (used for accessibility)',
							name: 'title',
							type: 'text',
						},
						{
							label: 'Project URL',
							name: 'more_info_url',
							type: 'text',
						},
					],
					type: 'row',
				},
				isUnlistedField,
				featuredImageField,
			],
			name: 'projects',
			type: 'array',
		},
	],

	labels: {
		plural: 'Projetos',
		singular: 'Projeto',
	},

	slug: 'projects',

};
