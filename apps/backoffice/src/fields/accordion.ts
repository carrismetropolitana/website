/* * */

import type { Field } from 'payload';

import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { MentionFeature } from '@/lexical/mention/feature.server';

/* * */

export const accordionFields: Field[] = [
	{
		admin: {
			initCollapsed: false,
		},
		fields: [
			{
				label: 'Título',
				name: 'title',
				required: true,
				type: 'text',
			},
			{
				editor: lexicalEditor({
					features: ({ defaultFeatures }) => [
						...defaultFeatures,
						MentionFeature(),
					],
				}),
				label: 'Conteúdo',
				name: 'content',
				required: true,
				type: 'richText',
			},
		],
		label: 'Accordion',
		name: 'accordion',
		type: 'array',
	},
];
