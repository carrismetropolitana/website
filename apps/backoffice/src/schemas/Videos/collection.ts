/* * */

import type { CollectionConfig } from 'payload';

import { hiddenPublishedAtField } from '@/fields/published-at';
import { specialSeriesField } from '@/fields/special-series';
import { subjectField } from '@/fields/subject';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

const chapterTimecodePattern = /^\d{2}:\d{2}(?::\d{2})?$/;

export const Videos: CollectionConfig = {
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
		group: 'CICM',
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
					'URL única para este vídeo. Será gerada automaticamente a partir do título se deixado em branco.',
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
				description:
					'Resumo curto do vídeo que poderá ser enviado para leitores de tela, ou seções onde uma decrição for necessária.',
			},
			label: 'Descrição',
			maxLength: 500,
			name: 'description',
			required: false,
			type: 'textarea',
		},
		{
			admin: {
				description: 'Legenda que aparecerá em relação a thumbnail, será utilizada para acessibilidade e para leitores de tela.',
			},
			label: 'Legenda da Thumbnail',
			maxLength: 200,
			name: 'thumbnailCaptions',
			type: 'text',
		},
		{
			hasMany: true,
			label: 'Autores',
			name: 'authors',
			relationTo: 'authors',
			type: 'relationship',
		},
		subjectField,
		specialSeriesField,
		{
			admin: {
				description: 'Tempo estimado de visualização em minutos.',
				position: 'sidebar',
			},
			defaultValue: 5,
			label: 'Tempo de Visualização (min)',
			min: 1,
			name: 'readTime',
			required: true,
			type: 'number',
		},
		{
			admin: {
				position: 'sidebar',
			},
			filterOptions: {
				mimeType: {
					in: ['video/mp4', 'video/avi', 'video/webm', 'video/mov'],
				},
			},
			label: 'Arquivo de vídeo.',
			name: 'video',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			label: 'Conteúdo',
			name: 'content',
			required: true,
			type: 'richText',
		},
		{
			admin: {
				description: 'Capítulos apresentados no leitor de vídeo.',
			},
			fields: [
				{
					admin: {
						description: 'Formato MM:SS ou HH:MM:SS. Ex.: 02:15 ou 01:02:15.',
					},
					label: 'Tempo Inicial',
					name: 'startTime',
					required: true,
					type: 'text',
					validate: (value) => {
						if (!value) return 'O tempo inicial é obrigatório.';
						return chapterTimecodePattern.test(value) || 'Utilize MM:SS ou HH:MM:SS.';
					},
				},
				{
					label: 'Título do Capítulo',
					name: 'title',
					required: true,
					type: 'text',
				},
			],
			label: 'Capítulos',
			labels: {
				plural: 'Capítulos',
				singular: 'Capítulo',
			},
			name: 'chapters',
			type: 'array',
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
			label: 'Imagem de Destaque que deve aparecer como prévia antes do carregamento do vídeo.',
			name: 'thumbnail',
			relationTo: 'media',
			required: true,
			type: 'upload',
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
		hiddenPublishedAtField,
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
		plural: 'Vídeos',
		singular: 'Vídeo',
	},

	slug: 'videos',

	timestamps: false,
};
