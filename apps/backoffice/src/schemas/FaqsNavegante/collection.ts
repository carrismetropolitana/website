/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { CollectionConfig } from 'payload';

/* * */

export const FaqsNavegante: CollectionConfig = {

	access: {
		create: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	admin: {
		defaultColumns: ['question', 'answer'],
		useAsTitle: 'question',
	},
	fields: [
		{
			label: 'Question',
			localized: true,
			name: 'question',
			type: 'textarea',
		},
		{
			label: 'Answer',
			localized: true,
			name: 'answer',
			type: 'textarea',
		},
		publishedAtField,
		updatedAtField,
	],
	labels: {
		plural: 'Faqs Navegante',
		singular: 'Faq Navegante',
	},
	slug: 'faqs-navegante',
};
