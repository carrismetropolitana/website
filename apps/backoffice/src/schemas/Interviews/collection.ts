/* * */

import type { CollectionConfig } from 'payload';

import { publishedAtField } from '@/fields/published-at';
import { specialSeriesField } from '@/fields/special-series';
import { subjectField } from '@/fields/subject';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

interface InterviewBranchData {
	audioFile?: unknown
	audioUrl?: unknown
	contentFormat?: 'audio' | 'transcript'
}

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
			defaultValue: 'transcript',
			label: 'Tipo de entrevista',
			name: 'contentFormat',
			options: [
				{
					label: 'Escrita',
					value: 'transcript',
				},
				{
					label: 'Audio',
					value: 'audio',
				},
			],
			required: true,
			type: 'select',
		},
		subjectField,
		specialSeriesField,
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
					type: 'text',
				},
				{
					label: 'Cargo/Função',
					name: 'role',
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
				condition: (_, siblingData) => siblingData?.contentFormat === 'audio',
				description: 'Ficheiro de áudio da entrevista (upload direto).',
				position: 'sidebar',
			},
			filterOptions: {
				mimeType: {
					in: [
						'audio/aac',
						'audio/flac',
						'audio/m4a',
						'audio/mp3',
						'audio/mp4',
						'audio/mpeg',
						'audio/ogg',
						'audio/wav',
						'audio/webm',
						'audio/x-m4a',
						'audio/x-wav',
					],
				},
			},
			label: 'Ficheiro de Áudio',
			name: 'audioFile',
			relationTo: 'media',
			type: 'upload',
			validate: (value, { data }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'audio') return true;
				if (value || branchData.audioUrl) return true;
				return 'Adicione um ficheiro de áudio ou uma URL externa.';
			},
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'audio',
				description: 'URL externa do ficheiro de áudio. Usado se não houver upload direto.',
			},
			label: 'URL do Áudio (externo)',
			name: 'audioUrl',
			type: 'text',
			validate: (value, { data }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'audio') return true;
				if (value || branchData.audioFile) return true;
				return 'Adicione uma URL externa ou faça upload de um ficheiro de áudio.';
			},
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'audio',
				description: 'Duração do áudio em segundos.',
				position: 'sidebar',
			},
			label: 'Duração (segundos)',
			min: 1,
			name: 'audioDuration',
			type: 'number',
			validate: (value, { data }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'audio') return true;
				if (value) return true;
				return 'A duração do áudio é obrigatória.';
			},
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'transcript',
				description: 'Tempo estimado de leitura em minutos.',
				position: 'sidebar',
			},
			defaultValue: 5,
			label: 'Tempo de Leitura da Escrita (min)',
			min: 1,
			name: 'readTime',
			type: 'number',
			validate: (value, { data }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'transcript') return true;
				if (value) return true;
				return 'O tempo de leitura é obrigatório para entrevistas escritas.';
			},
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'transcript',
			},
			label: 'Escrita',
			name: 'transcript',
			type: 'richText',
			validate: (value, { data }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'transcript') return true;
				if (value) return true;
				return 'O conteúdo da entrevista escrita é obrigatório.';
			},
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'transcript',
				description: 'Ficheiro PDF com a entrevista escrita completa.',
				position: 'sidebar',
			},
			label: 'PDF da Escrita',
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

				if (data.contentFormat === 'audio') {
					data.readTime = null;
					data.transcript = null;
					data.transcriptPdf = null;
				}

				if (data.contentFormat === 'transcript') {
					data.audioFile = null;
					data.audioUrl = null;
					data.audioDuration = null;
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
