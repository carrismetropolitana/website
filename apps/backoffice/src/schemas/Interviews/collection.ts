/* * */

import type { CollectionConfig } from 'payload';

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

export const Interviews: CollectionConfig = {
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
		defaultColumns: ['title', 'status', 'type', 'publishDate'],
		useAsTitle: 'title',
	},

	fields: [
		{
			label: 'Título',
			maxLength: 200,
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			admin: {
				description:
					'URL única para esta entrevista. Será gerada automaticamente do título se deixado em branco.',
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
				description: 'Resumo curto da entrevista que aparece na listagem e no início da página.',
			},
			label: 'Descrição',
			maxLength: 500,
			name: 'description',
			required: true,
			type: 'textarea',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Tipo',
			name: 'type',
			options: [
				{
					label: 'Tecnologia',
					value: 'tecnologia',
				},
				{
					label: 'Operação',
					value: 'operacao',
				},
				{
					label: 'Sustentabilidade',
					value: 'sustentabilidade',
				},
				{
					label: 'Comunicação',
					value: 'comunicacao',
				},
			],
			required: true,
			type: 'select',
		},
		{
			fields: [
				{
					label: 'Foto',
					name: 'picture',
					relationTo: 'media',
					type: 'upload',
				},
				{
					label: 'Nome',
					name: 'name',
					required: true,
					type: 'text',
				},
				{
					label: 'Cargo/Função',
					name: 'role',
					required: true,
					type: 'text',
				},
			],
			label: 'Convidado',
			name: 'guest',
			type: 'group',
		},
		{
			fields: [
				{
					label: 'Foto',
					name: 'picture',
					relationTo: 'media',
					type: 'upload',
				},
				{
					label: 'Nome',
					name: 'name',
					required: true,
					type: 'text',
				},
				{
					label: 'Cargo/Função',
					name: 'role',
					required: true,
					type: 'text',
				},
				{
					admin: {
						description: 'Breve descrição sobre o host.',
					},
					label: 'Biografia',
					name: 'bio',
					type: 'textarea',
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
			label: 'Host',
			name: 'host',
			type: 'group',
		},
		{
			admin: {
				description: 'Ficheiro de áudio da entrevista (upload direto).',
			},
			label: 'Ficheiro de Áudio',
			name: 'audioFile',
			relationTo: 'media',
			type: 'upload',
		},
		{
			admin: {
				description: 'URL externa do ficheiro de áudio. Usado se não houver upload direto.',
			},
			label: 'URL do Áudio (externo)',
			name: 'audioUrl',
			type: 'text',
		},
		{
			admin: {
				description: 'Duração do áudio em segundos.',
				position: 'sidebar',
			},
			label: 'Duração (segundos)',
			min: 1,
			name: 'audioDuration',
			type: 'number',
		},
		{
			admin: {
				description: 'Tempo estimado de leitura em minutos.',
				position: 'sidebar',
			},
			defaultValue: 5,
			label: 'Tempo de Leitura (min)',
			min: 1,
			name: 'readTime',
			required: true,
			type: 'number',
		},
		{
			admin: {
				description:
					'Transcrição da entrevista em formato Markdown. Suporta títulos (##), listas, links, citações e muito mais.',
			},
			label: 'Transcrição (Markdown)',
			name: 'transcript',
			type: 'textarea',
		},
		{
			admin: {
				description: 'Ficheiro PDF com a transcrição completa da entrevista.',
				position: 'sidebar',
			},
			label: 'PDF da Transcrição',
			name: 'transcriptPdf',
			relationTo: 'media',
			type: 'upload',
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
			required: true,
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
					type: 'upload',
				},
			],
			label: 'SEO',
			name: 'seo',
			type: 'group',
		},
		publishedAtField,
		updatedAtField,
	],

	hooks: {
		beforeChange: [
			async ({ data }) => {
				if (data.status === 'published' && !data.publishDate) {
					data.publishDate = new Date();
				}
			},
		],
		beforeValidate: [
			async ({ data }) => {
				if (data.title && !data.slug) {
					data.slug = slugify(data.title);
				}
				if (data.slug) {
					data.slug = slugify(data.slug);
				}
			},
		],
	},

	labels: {
		plural: 'Entrevistas',
		singular: 'Entrevista',
	},

	slug: 'interviews',

	timestamps: false,
};
