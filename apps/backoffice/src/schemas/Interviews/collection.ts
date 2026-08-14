/* * */

import type { CollectionConfig } from 'payload';

import { publishedAtField } from '@/fields/published-at';
import { specialSeriesField } from '@/fields/special-series';
import { subjectField } from '@/fields/subject';
import { updatedAtField } from '@/fields/updated-at';
import { ensureDefaultInterviewAuthor } from '@/utils/default-interview-author';
import { slugify } from '@/utils/slugify';

/* * */

interface InterviewBranchData {
	audioFile?: unknown
	audioUrl?: unknown
	contentFormat?: 'audio' | 'transcript'
	transcription?: unknown[]
}

const AUDIO_MIME_TYPES = [
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
] as const;

function getMediaMimeType(value: unknown): string | undefined {
	if (!value || typeof value !== 'object' || !('mimeType' in value)) return undefined;
	return typeof value.mimeType === 'string' ? value.mimeType : undefined;
}

function getMediaId(value: unknown): number | string | undefined {
	if (typeof value === 'number' || typeof value === 'string') return value;
	if (!value || typeof value !== 'object' || !('id' in value)) return undefined;
	return typeof value.id === 'number' || typeof value.id === 'string' ? value.id : undefined;
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
			admin: {
				description: 'Por predefinição, é usado o autor Equipa Carris Metropolitana. Selecione outro autor para o substituir.',
			},
			hasMany: true,
			label: 'Autores',
			name: 'authors',
			relationTo: 'authors',
			type: 'relationship',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.contentFormat === 'audio',
				description: 'Ficheiro de áudio da entrevista (upload direto).',
				position: 'sidebar',
			},
			filterOptions: {
				mimeType: {
					in: [...AUDIO_MIME_TYPES],
				},
			},
			label: 'Ficheiro de Áudio',
			name: 'audioFile',
			relationTo: 'media',
			type: 'upload',
			validate: async (value, { data, req }) => {
				const branchData = data as InterviewBranchData;
				if (branchData.contentFormat !== 'audio') return true;
				if (!value) {
					if (branchData.audioUrl) return true;
					return 'Adicione um ficheiro de áudio ou uma URL externa.';
				}

				let mimeType = getMediaMimeType(value);
				const mediaId = getMediaId(value);

				if (!mimeType && mediaId) {
					try {
						const media = await req.payload.findByID({
							collection: 'media',
							id: mediaId,
							req,
						});
						mimeType = media.mimeType ?? undefined;
					}
					catch {
						return 'Não foi possível validar o ficheiro de áudio selecionado.';
					}
				}

				if (mimeType && AUDIO_MIME_TYPES.includes(mimeType as (typeof AUDIO_MIME_TYPES)[number])) {
					return true;
				}

				if (!mimeType) return 'Não foi possível validar o tipo do ficheiro de áudio.';
				return 'Selecione um ficheiro num formato de áudio suportado.';
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
				components: {
					beforeInput: ['@/components/TranscriptBulkImport#TranscriptBulkImport'],
				},
				description:
					'Cada entrada é uma fala. Em áudio, início e fim sincronizam o destaque com o leitor.',
			},
			fields: [
				{
					label: 'Orador',
					name: 'speaker',
					options: [
						{ label: 'Entrevistador', value: 'host' },
						{ label: 'Convidado', value: 'guest' },
					],
					required: true,
					type: 'select',
				},
				{
					admin: { description: 'Sobrescreve o nome do orador, quando necessário.' },
					label: 'Nome apresentado',
					name: 'speakerName',
					type: 'text',
				},
				{
					admin: {
						components: {
							afterInput: ['@/components/AutoFillTranscriptStartTime#AutoFillTranscriptStartTime'],
						},
						description: 'Segundo em que esta fala começa no áudio. Opcional em entrevistas escritas.',
					},
					label: 'Início da fala (segundos)',
					min: 0,
					name: 'startTime',
					type: 'number',
				},
				{
					admin: {
						description: 'Segundo em que esta fala termina no áudio. Opcional em entrevistas escritas.',
					},
					label: 'Fim da fala (segundos)',
					min: 0,
					name: 'endTime',
					type: 'number',
					validate: (value, { siblingData }) => {
						if (value === undefined || value === null) return true;
						if (typeof siblingData?.startTime !== 'number') return true;
						return value >= siblingData.startTime || 'O fim deve ser igual ou posterior ao início.';
					},
				},
				{
					label: 'Texto',
					name: 'text',
					required: true,
					type: 'textarea',
				},
			],
			label: 'Transcrição',
			minRows: 1,
			name: 'transcription',
			type: 'array',
		},
		{
			admin: {
				description: 'Ficheiro PDF com a transcrição completa.',
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

				if (data.contentFormat === 'audio') {
					data.readTime = null;
				}

				if (data.contentFormat === 'transcript') {
					data.audioFile = null;
					data.audioUrl = null;
					data.audioDuration = null;
				}
			},
		],
		beforeValidate: [
			async ({ data, operation, req }) => {
				if (data.title && !data.slug) {
					data.slug = slugify(data.title);
				}
				if (data.slug) {
					data.slug = slugify(data.slug);
				}

				if (operation !== 'create' || (Array.isArray(data.authors) && data.authors.length > 0)) {
					return;
				}

				const equipaCarris = await ensureDefaultInterviewAuthor(req.payload);
				data.authors = [equipaCarris.id];
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
