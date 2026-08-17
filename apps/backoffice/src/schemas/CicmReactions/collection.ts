import type { CollectionConfig } from 'payload';

const contentTypes = [
	{ label: 'Artigo', value: 'article' },
	{ label: 'Vídeo', value: 'video' },
	{ label: 'Entrevista', value: 'interview' },
	{ label: 'Caso de estudo', value: 'case-study' },
];

export const CicmReactions: CollectionConfig = {
	access: {
		create: ({ req: { user } }) => Boolean(user),
		delete: ({ req: { user } }) => Boolean(user),
		read: ({ req: { user } }) => Boolean(user),
		update: ({ req: { user } }) => Boolean(user),
	},
	admin: {
		defaultColumns: ['contentType', 'contentId', 'createdAt'],
		group: 'CICM',
		useAsTitle: 'contentId',
	},
	fields: [
		{
			label: 'Tipo de conteúdo',
			name: 'contentType',
			options: contentTypes,
			required: true,
			type: 'select',
		},
		{
			label: 'ID do conteúdo',
			name: 'contentId',
			required: true,
			type: 'text',
		},
		{
			admin: { readOnly: true },
			label: 'Hash do visitante',
			name: 'visitorHash',
			required: true,
			type: 'text',
		},
	],
	indexes: [
		{
			fields: ['visitorHash', 'contentType', 'contentId'],
			unique: true,
		},
	],
	labels: {
		plural: 'Reações CICM',
		singular: 'Reação CICM',
	},
	slug: 'cicm-reactions',
	timestamps: true,
};
