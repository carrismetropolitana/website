/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { revalidateNotesPages } from '@/utils/revalidate';
import { slugify } from '@/utils/slugify';
import { type CollectionConfig } from 'payload';

/* * */

export const Notes: CollectionConfig = {

	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: ({ req: { user } }) => {
			// If user is authenticated, return all records
			if (user) return true;
			// Otherwise, only return published records
			return { status: { equals: 'published' } };
		},
		update: ({ req: { user } }) => Boolean(user),
	},

	admin: {
		defaultColumns: ['title', 'status', 'publishDate'],
		useAsTitle: 'title',
	},

	fields: [
		{
			label: 'Título',
			maxLength: 120,
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			admin: {
				description: 'URL única para esta nota. Será gerada automaticamente do título se deixado em branco.',
			},
			index: true,
			label: 'Slug',
			name: 'slug',
			required: true,
			type: 'text',
			unique: true,
		},
		{
			admin: {
				description: 'Texto de destaque/resumo que aparece no início do artigo. Suporta HTML.',
			},
			label: 'Lead',
			name: 'lead',
			type: 'textarea',
		},
		{
			admin: {
				description: 'Conteúdo principal do artigo. Suporta HTML.',
			},
			label: 'Conteúdo',
			name: 'body',
			type: 'textarea',
		},
		{
			admin: {
				disabled: true,
				hidden: true,
			},
			defaultValue: 'file',
			label: 'Tipo de Conteúdo',
			name: 'contentType',
			type: 'text',
		},
		{
			label: 'Arquivo',
			name: 'file',
			relationTo: 'media',
			type: 'relationship',
		},
		{
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
				},
				position: 'sidebar',
			},
			defaultValue: () => new Date(),
			label: 'Data de Publicação',
			name: 'publishDate',
			type: 'date',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 'draft',
			label: 'Status',
			name: 'status',
			options: [
				{
					label: 'Rascunho',
					value: 'draft',
				},
				{
					label: 'Publicado',
					value: 'published',
				},
			],
			required: true,
			type: 'select',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Imagem de Destaque',
			name: 'heroImage',
			relationTo: 'media',
			type: 'relationship',
		},
		{
			admin: {
				position: 'sidebar',
			},
			hasMany: true,
			label: 'Tags',
			name: 'tags',
			type: 'text',
		},
		{
			fields: [
				{
					label: 'Título Meta',
					maxLength: 60,
					name: 'metaTitle',
					type: 'text',
				},
				{
					label: 'Descrição Meta',
					maxLength: 160,
					name: 'metaDescription',
					type: 'textarea',
				},
				{
					label: 'Imagem OG',
					name: 'ogImage',
					relationTo: 'media',
					type: 'relationship',
				},
			],
			label: 'SEO',
			name: 'seo',
			type: 'group',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Autores',
			name: 'authors',
			relationTo: 'users',
			type: 'relationship',
		},
		publishedAtField,
		updatedAtField,
	],

	hooks: {
		afterChange: [
			async ({ doc, previousDoc }) => {
				// Trigger revalidation when note is created, updated, or status changes
				if (doc.status === 'published' || previousDoc?.status === 'published') {
					await revalidateNotesPages(doc.slug);
				}
			},
		],
		beforeChange: [
			async ({ data }) => {
				// Set publishDate if publishing without date
				if (data.status === 'published' && !data.publishDate) {
					data.publishDate = new Date();
				}
			},
		],
		beforeValidate: [
			async ({ data }) => {
				// Auto-generate slug if empty
				if (data.title && !data.slug) {
					data.slug = slugify(data.title);
				}
			},
		],
	},

	labels: {
		plural: 'Notas de Imprensa',
		singular: 'Nota de Imprensa',
	},

	slug: 'notes',

	timestamps: false,

};
