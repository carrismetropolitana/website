/* * */

import type { Field } from 'payload';

/* * */

export const isUnlistedField: Field = {
	admin: {
		position: 'sidebar',
	},
	label: 'Não Listado?',
	name: 'is_unlisted',
	type: 'checkbox',
};
