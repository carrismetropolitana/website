/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { CollectionConfig } from 'payload';

/* * */

export const Faqs: CollectionConfig = {

	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: () => true,
		update: ({ req: { user } }) => Boolean(user),
	},

	fields: [
		{
			label: 'Answer',
			localized: true,
			name: 'answer',
			type: 'richText',
		},
		{
			label: 'Question',
			localized: true,
			name: 'question',
			type: 'textarea',
		},
		{
			label: 'Topic',
			name: 'topic',
			relationTo: 'topics',
			type: 'relationship',
		},
		publishedAtField,
		updatedAtField,
	],
	labels: {
		plural: 'Faqs',
		singular: 'Faq',
	},
	orderable: true,
	slug: 'faqs',
};
