/* * */

import type { Field } from 'payload';

/* * */

export const lineIdField: Field = {
	admin: {
		components: {
			Field: '@/components/LineSelectField/index#LineSelectField',
		},
		position: 'sidebar',
	},
	label: 'Linha',
	name: 'line_id',
	type: 'text',
};
