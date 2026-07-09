/* * */

import { publishedAtField } from '@/fields/published-at';
import { updatedAtField } from '@/fields/updated-at';
import { CollectionConfig } from 'payload';

/* * */

export const FeedbackHub: CollectionConfig = {
	access: {
		create: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},
	admin: {
		defaultColumns: ['reasonType', 'reasonSubtype', 'question', 'answer'],
		group: 'Navegante®',
		useAsTitle: 'question',
	},
	fields: [
		{
			label: 'Reason Type',
			name: 'reasonType',
			options: [
				{
					label: 'Linhas',
					value: 'lines',
				},
				{
					label: 'Paragens',
					value: 'stops',
				},
			],
			required: true,
			type: 'select',
		},
		{
			admin: {
				condition: ({ reasonType }) => reasonType === 'lines',
			},
			label: 'Reason Subtype',
			name: 'reasonSubtype',
			options: [
				{
					label: 'Linha/Serviço',
					value: 'line-service',
				},
				{
					label: 'Veículo',
					value: 'vehicle',
				},
				{
					label: 'Condutor',
					value: 'driver',
				},
			],
			type: 'select',
			validate: (value, { data }) => {
				if (data?.reasonType === 'lines' && !value) return 'Subtipo é obrigatório quando o tipo é "Linhas".';
				return true;
			},
		},
		{
			label: 'Question',
			localized: true,
			name: 'question',
			type: 'textarea',
		},
		{
			label: 'Answer',
			localized: true,
			name: 'answer',
			type: 'textarea',
		},
		publishedAtField,
		updatedAtField,
	],
	hooks: {
		beforeChange: [
			({ data }) => {
				if (!data || !Object.prototype.hasOwnProperty.call(data, 'reasonType') || data.reasonType === 'lines') return data;
				return { ...data, reasonSubtype: null };
			},
		],
	},
	labels: {
		plural: 'Feedback Hub',
		singular: 'Feedback Hub',
	},
	slug: 'feedback-hub',
};
