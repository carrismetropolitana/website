/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';
import { type CollectionConfig } from 'payload';

/* * */

export const KnowledgeBase: CollectionConfig = {

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
		defaultColumns: ['title', 'status', 'contentType', 'publishDate'],
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
				description: 'URL única para este item. Será gerada automaticamente do título se deixado em branco.',
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
			defaultValue: 'file',
			label: 'Tipo de Conteúdo',
			name: 'contentType',
			options: [
				{
					label: 'Link',
					value: 'link',
				},
				{
					label: 'Arquivo',
					value: 'file',
				},
			],
			required: true,
			type: 'select',
		},
		{
			admin: {
				condition: ({ contentType }) => contentType === 'link',
			},
			label: 'URL',
			name: 'link',
			type: 'text',
			validate: (value, { data }) => {
				if (data.contentType === 'link' && !value) {
					return 'URL é obrigatória quando o tipo de conteúdo é "Link"';
				}
				if (data.contentType === 'link' && value && !value.match(/^https?:\/\/.+/)) {
					return 'URL deve começar com http:// ou https://';
				}
				return true;
			},
		},
		{
			admin: {
				condition: ({ contentType }) => contentType === 'file',
			},
			label: 'Arquivo',
			name: 'file',
			relationTo: 'media',
			type: 'relationship',
			validate: (value, { data }) => {
				if (data.contentType === 'file' && !value) {
					return 'Arquivo é obrigatório quando o tipo de conteúdo é "Arquivo"';
				}
				return true;
			},
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
			label: 'Tópico/Categoria',
			name: 'topic',
			options: [
				{
					label: 'Documentação',
					value: 'Documentação',
				},
				{
					label: 'Recursos',
					value: 'Recursos',
				},
				{
					label: 'Open Data',
					value: 'Open Data',
				},
				{
					label: 'Sustentabilidade',
					value: 'Sustentabilidade',
				},
				{
					label: 'Imprensa',
					value: 'Imprensa',
				},
				{
					label: 'Tecnologia',
					value: 'Tecnologia',
				},
				{
					label: 'Outro',
					value: 'Outro',
				},
			],
			required: true,
			type: 'select',
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
		plural: 'Base de Conhecimento',
		singular: 'Item da Base de Conhecimento',
	},

	slug: 'knowledge-base',

	timestamps: false,

};
