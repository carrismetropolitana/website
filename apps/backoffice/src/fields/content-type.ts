/* * */

import type { Field } from 'payload';

/* * */

export const contentTypeField: Field = {
	admin: {
		position: 'sidebar',
	},
	index: true,
	label: 'Tipo',
	name: 'type',
	relationTo: 'content-types',
	required: true,
	type: 'relationship',
};
