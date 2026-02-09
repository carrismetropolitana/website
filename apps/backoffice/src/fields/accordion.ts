/* * */

import type { Field } from 'payload';

import { MentionFeature } from '@/lexical/mention/feature.server';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

export const accordionFields: Field[] = [
	{
		admin: {
			initCollapsed: false,
		},
		defaultValue: [],
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
