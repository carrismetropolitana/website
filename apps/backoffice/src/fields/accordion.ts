/* * */

import type { Field } from 'payload';

/* * */

export const accordionField: Field = {
	admin: {
		initCollapsed: false,
	},
	fields: [
		{
			label: 'Título',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Conteúdo',
			name: 'content',
			required: true,
			type: 'textarea',
		},
	],
	label: 'Accordion',
	name: 'accordion',
	type: 'array',
};
