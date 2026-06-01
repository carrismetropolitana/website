/* * */

import type { CollectionConfig } from 'payload';

import { partnershipField, specialSeriesField, themeField } from '@/fields/content-classification';
import { publishedAtField } from '@/fields/published-at';
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
						description: 'Breve descrição sobre o autor.',
					},
					label: 'Biografia',
					name: 'bio',
					type: 'textarea',
				},
				{
					admin: {
						description: 'Se este vídeo foi produzido por um especialista, marque esta opção para permitir filtros e destaques de conteúdos especializados.',
						position: 'sidebar',
					},
					defaultValue: false,
					label: 'Vídeo produzido por um especialista',
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
			label: 'Autor',
			name: 'author',
			type: 'group',
		},
		themeField,
		specialSeriesField,
		partnershipField,
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
			admin: {
				description:
					'Conteúdo do vídeo em formato Markdown. Exemplo:\n## Descrição do Vídeo\n\nTexto introdutório...\n\n### Destaques do Vídeo\n- Ponto 1\n- Ponto 2',
			},
			label: 'Conteúdo (Markdown)',
			name: 'content',
			required: true,
			type: 'textarea',
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
		plural: 'Vídeos',
		singular: 'Vídeo',
	},

	slug: 'videos',

	timestamps: false,
};
