/* * */

import type { Block, Field } from 'payload';

/* * */

export const CardBlock: Block = {
	fields: [
		{
			admin: {
				components: {
					Field: '@/components/ButtonColorField#ButtonColorField',
				},
			},
			defaultValue: '#ffdd01',
			label: 'Cor da borda',
			name: 'borderColor',
			type: 'text',
		},
		{
			admin: {
				components: {
					Field: '@/components/ButtonColorField#ButtonColorField',
				},
			},
			defaultValue: '#ffdd01',
			label: 'Cor primária',
			name: 'primaryColor',
			type: 'text',
		},
		{
			admin: {
				components: {
					Field: '@/components/ButtonColorField#ButtonColorField',
				},
			},
			defaultValue: '#000000',
			label: 'Cor do título e número',
			name: 'titleColor',
			type: 'text',
		},
		{
			admin: {
				components: {
					Field: '@/components/ButtonColorField#ButtonColorField',
				},
			},
			defaultValue: '#000000',
			label: 'Cor da descrição',
			name: 'textColor',
			type: 'text',
		},
		{
			admin: {
				initCollapsed: false,
			},
			defaultValue: [],
			fields: [
				{
					label: 'Título do cartão',
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					label: 'Número (ex: 25m)',
					name: 'number',
					required: true,
					type: 'text',
				},
				{
					label: 'Imagem (opcional)',
					name: 'image',
					relationTo: 'media',
					type: 'relationship',
				},
				{
					label: 'Texto no conteúdo',
					name: 'description',
					type: 'textarea',
				},
			] as Field[],
			label: 'Cartões para stack',
			minRows: 1,
			name: 'cards',
			type: 'array',
		},
	],
	labels: {
		plural: 'Card',
		singular: 'Card',
	},
	slug: 'card',
};
