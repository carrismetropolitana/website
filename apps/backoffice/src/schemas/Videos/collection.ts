/* * */

import type { CollectionConfig } from 'payload';

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { slugify } from '@/utils/slugify';

/* * */

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
				description: 'Legenda que aparecerá em relação a thumbnail, será utilizada para acessibilidade e para leitores de tela.',
			},
			label: 'Legenda da Thumbnail',
			maxLength: 200,
			name: 'thumbnailCaptions',
			type: 'text',
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
