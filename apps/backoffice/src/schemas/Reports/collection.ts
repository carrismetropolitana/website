/* * */

import type { CollectionConfig } from 'payload';

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

const reportTypeOptions = [
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
];

const keyFindingIconOptions = [
	{
		label: 'Passageiros',
		value: 'users',
	},
	{
		label: 'Linhas / Rotas',
		value: 'route',
	},
	{
		label: 'Frota',
		value: 'fleet',
	},
	{
		label: 'Energia',
		value: 'energy',
	},
	{
		label: 'Crescimento',
		value: 'growth',
	},
	{
		label: 'Sustentabilidade',
		value: 'sustainability',
	},
	{
		label: 'Comunicação',
		value: 'communication',
	},
	{
		label: 'Tecnologia',
		value: 'technology',
	},
];

/* * */

export const Reports: CollectionConfig = {
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
					'URL única para este relatório. Será gerada automaticamente do título se deixado em branco.',
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
					'Resumo curto do relatório que aparece na listagem e no início da página.',
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
			options: reportTypeOptions,
			required: true,
			type: 'select',
		},
		{
			admin: {
				description: 'Tempo estimado de leitura em minutos.',
				position: 'sidebar',
			},
			defaultValue: 12,
			label: 'Tempo de Leitura (min)',
			min: 1,
			name: 'readTime',
			required: true,
			type: 'number',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Imagem de Destaque',
			name: 'heroImage',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			admin: {
				description: 'Legenda que aparece sobre a imagem de destaque.',
			},
			label: 'Legenda da Imagem',
			maxLength: 200,
			name: 'heroImageCaption',
			type: 'text',
		},
		{
			admin: {
				description: 'Ficheiro PDF disponível para download na página do relatório.',
				position: 'sidebar',
			},
			label: 'PDF do Relatório',
			name: 'reportPdf',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			admin: {
				description: 'Ano ou edição destacada no bloco principal do relatório.',
			},
			defaultValue: () => new Date().getFullYear(),
			label: 'Ano do Relatório',
			name: 'reportYear',
			required: true,
			type: 'number',
		},
		{
			fields: [
				{
					label: 'Autor',
					name: 'author',
					required: true,
					type: 'text',
				},
				{
					label: 'Categoria',
					name: 'category',
					required: true,
					type: 'text',
				},
				{
					label: 'Período',
					name: 'period',
					required: true,
					type: 'text',
				},
				{
					defaultValue: 'Português',
					label: 'Idioma',
					name: 'language',
					required: true,
					type: 'text',
				},
			],
			label: 'Detalhes da Publicação',
			name: 'publicationDetails',
			type: 'group',
		},
		{
			fields: [
				{
					label: 'Título',
					maxLength: 120,
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					label: 'Descrição',
					name: 'description',
					required: true,
					type: 'textarea',
				},
			],
			label: 'Resumo Executivo',
			name: 'executiveSummary',
			type: 'group',
		},
		{
			admin: {
				description: 'Bloco de contexto ou objetivos destacado abaixo do resumo executivo.',
			},
			fields: [
				{
					defaultValue: 'Contexto e Objetivos',
					label: 'Título',
					maxLength: 120,
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					admin: {
						description:
							'Conteúdo em Markdown. Suporta títulos, listas, links, citações e outros elementos renderizados no frontend.',
					},
					label: 'Descrição (Markdown)',
					name: 'description',
					required: true,
					type: 'textarea',
				},
			],
			label: 'Bloco em Destaque',
			name: 'featuredSummary',
			type: 'group',
		},
		{
			fields: [
				{
					label: 'Valor',
					maxLength: 80,
					name: 'value',
					required: true,
					type: 'text',
				},
				{
					label: 'Título',
					maxLength: 120,
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					label: 'Descrição',
					maxLength: 200,
					name: 'description',
					type: 'text',
				},
			],
			label: 'Principais Destaques',
			labels: {
				plural: 'Destaques',
				singular: 'Destaque',
			},
			minRows: 1,
			name: 'highlights',
			type: 'array',
		},
		{
			fields: [
				{
					label: 'Valor',
					maxLength: 80,
					name: 'value',
					required: true,
					type: 'text',
				},
				{
					label: 'Descrição',
					maxLength: 160,
					name: 'label',
					required: true,
					type: 'text',
				},
				{
					admin: {
						description:
							'A cor do ícone é herdada automaticamente do tipo do relatório.',
					},
					defaultValue: 'growth',
					label: 'Ícone',
					name: 'icon',
					options: keyFindingIconOptions,
					required: true,
					type: 'select',
				},
			],
			label: 'Principais Conclusões',
			labels: {
				plural: 'Conclusões',
				singular: 'Conclusão',
			},
			minRows: 1,
			name: 'keyFindings',
			type: 'array',
		},
		{
			admin: {
				description: 'Metodologia do relatório em formato Markdown.',
			},
			label: 'Metodologia (Markdown)',
			name: 'methodology',
			type: 'textarea',
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
		plural: 'Relatórios',
		singular: 'Relatório',
	},

	slug: 'reports',

	timestamps: false,
};
