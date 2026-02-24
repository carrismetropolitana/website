/* * */

import type { Block } from 'payload';

/* * */

export const SpacerBlock: Block = {
	fields: [
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
	],
	labels: {
		plural: 'Espaçadores',
		singular: 'Espaçador',
	},
	slug: 'spacer',
};
