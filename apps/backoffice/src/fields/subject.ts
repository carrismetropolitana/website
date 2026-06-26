/* * */

import type { Field } from 'payload';

/* * */

export const subjectOptions = [
	{
		label: 'Comunicação',
		value: 'comunicacao',
	},
	{
		label: 'Tecnologia',
		value: 'tecnologia',
	},
	{
		label: 'Operação',
		value: 'operacao',
	},
	{
		label: 'Sustentabilidade',
		value: 'sustentabilidade',
	},
];

export const subjectField: Field = {
	admin: {
		position: 'sidebar',
	},
	label: 'Tema',
	name: 'type',
	options: subjectOptions,
	required: true,
	type: 'select',
};
