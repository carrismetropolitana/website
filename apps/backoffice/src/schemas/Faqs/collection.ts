/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { MailtoAutoLinkFeature } from '@/lexical/mailto-autolink/feature.server';
import { EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { CollectionConfig } from 'payload';

/* * */

const faqAnswerEditor = lexicalEditor({
	features: ({ defaultFeatures }) => ([
		...defaultFeatures.filter(f => ['link', 'paragraph', 'toolbarInline', 'upload'].includes(f.key)),
		MailtoAutoLinkFeature(),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		EXPERIMENTAL_TableFeature(),
	]),
});

/* * */

export const Faqs: CollectionConfig = {

	access: {
		create: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	admin: {
		defaultColumns: ['question', 'answer', 'topic'],
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
	slug: 'faqs',
};
