/* * */

import type { Field } from 'payload';

/* * */

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
