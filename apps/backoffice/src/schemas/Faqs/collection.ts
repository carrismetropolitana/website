/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';

/* * */

const faqAnswerEditor = lexicalEditor({
	features: ({ defaultFeatures }) => ([
		...defaultFeatures.filter(f => ['paragraph', 'toolbarInline', 'upload'].includes(f.key)),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		EXPERIMENTAL_TableFeature(),
	]),
});

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
			label: 'Question',
			localized: true,
			name: 'question',
			type: 'textarea',
		},
		{
			editor: faqAnswerEditor,
			label: 'Answer',
			localized: true,
			name: 'answer',
			type: 'richText',
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
