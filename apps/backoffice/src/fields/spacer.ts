/* * */

import type { Field } from 'payload';

/* * */

export const spacerFields: Field[] = [
	{
		admin: {
			description: 'Altura do espaço em pixels (px)',
		},
		defaultValue: 32,
		label: 'Altura',
		max: 512,
		min: 8,
		name: 'height',
		required: true,
		type: 'number',
	},
];
