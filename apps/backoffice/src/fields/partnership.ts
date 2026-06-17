/* * */

import type { Field } from 'payload';

/* * */

export const partnershipField: Field = {
	admin: {
		description: 'Opcional. Use quando este conteúdo fizer parte de uma parceria.',
		position: 'sidebar',
	},
	index: true,
	label: 'Parceria',
	name: 'partnership',
	relationTo: 'partnerships',
	type: 'relationship',
};
