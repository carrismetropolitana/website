/* * */

import type { Field } from 'payload';

/* * */

export const themeOptions = [
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

export const themeField: Field = {
	admin: {
		position: 'sidebar',
	},
	label: 'Tema',
	name: 'type',
	options: themeOptions,
	required: true,
	type: 'select',
};

export const optionalThemeField: Field = {
	...themeField,
	required: false,
};

export const specialSeriesField: Field = {
	admin: {
		description: 'Opcional. Use quando este conteúdo fizer parte de uma Série Especial.',
		position: 'sidebar',
	},
	index: true,
	label: 'Série Especial',
	name: 'specialSeries',
	relationTo: 'special-series',
	type: 'relationship',
};

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
