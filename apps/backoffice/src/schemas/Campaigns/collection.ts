/* * */

import { slugify } from '@/utils/slugify';
import { type CollectionConfig } from 'payload';

/* * */

import { ThreeColumnsTextBlock } from '@/components/three-columns-text';
import { TwoColumnsTextBlock } from '@/components/two-columns-text';
import { TwoColumnsTextImageBlock } from '@/components/two-columns-text-image';

/* * */

export const Campaigns: CollectionConfig = {
	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: ({ req: { user } }) => {
			if (user) return true;
			return { status: { equals: 'published' } };
		},
		update: ({ req: { user } }) => Boolean(user),
	},

	admin: {
		defaultColumns: ['title', 'status', 'updatedAt'],
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
				description: 'URL única para esta campanha. Será gerada automaticamente do título se deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			required: true,
			type: 'text',
			unique: true,
		},
		{
			blocks: [
				TwoColumnsTextBlock,
				TwoColumnsTextImageBlock,
				ThreeColumnsTextBlock,
			],
			label: 'Layout',
			name: 'layout',
			type: 'blocks',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 'draft',
			label: 'Status',
			name: 'status',
			options: [
				{ label: 'Rascunho', value: 'draft' },
				{ label: 'Publicado', value: 'published' },
			],
			required: true,
			type: 'select',
		},
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
		plural: 'Campanhas',
		singular: 'Campanha',
	},

	slug: 'campaigns',

	timestamps: true,
};
