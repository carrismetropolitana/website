/* * */

import type { CollectionConfig } from 'payload';

import { slugify } from '@/utils/slugify';

/* * */

export const Authors: CollectionConfig = {
	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => Boolean(user),
	},

	admin: {
		defaultColumns: ['name', 'role', 'expertAuthor', 'updatedAt'],
		group: 'CICM',
		useAsTitle: 'name',
	},

	fields: [
		{
			label: 'Nome',
			name: 'name',
			required: true,
			type: 'text',
		},
		{
			admin: {
				description: 'Identificador único do autor, gerado a partir do nome quando deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			required: true,
			type: 'text',
			unique: true,
		},
		{
			label: 'Cargo/Função',
			name: 'role',
			required: true,
			type: 'text',
		},
		{
			label: 'Biografia',
			name: 'bio',
			type: 'textarea',
		},
		{
			label: 'Foto',
			name: 'picture',
			relationTo: 'media',
			type: 'upload',
		},
		{
			defaultValue: false,
			label: 'Autor especialista',
			name: 'expertAuthor',
			required: true,
			type: 'checkbox',
		},
		{
			fields: [
				{
					label: 'LinkedIn',
					name: 'linkedin',
					type: 'text',
				},
				{
					label: 'X (Twitter)',
					name: 'twitter',
					type: 'text',
				},
				{
					label: 'Email',
					name: 'email',
					type: 'email',
				},
			],
			label: 'Redes Sociais',
			name: 'social',
			type: 'group',
		},
	],

	hooks: {
		beforeValidate: [
			async ({ data }) => {
				if (data.name && !data.slug) data.slug = slugify(data.name);
				if (data.slug) data.slug = slugify(data.slug);
			},
		],
	},

	labels: {
		plural: 'Autores',
		singular: 'Autor',
	},

	slug: 'authors',
};
