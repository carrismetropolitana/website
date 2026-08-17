/* * */

import type { Field } from 'payload';

/* * */

export const publishedAtField: Field = {

	admin: {
		date: {
			displayFormat: 'yyyy-MM-dd HH:mm',
			pickerAppearance: 'dayAndTime',
		},
		position: 'sidebar',
	},

	hooks: {
		beforeChange: [
			({ previousValue, value }) => {
				if (!value && !previousValue) return new Date();
				if (!value && previousValue) return previousValue;
				return value;
			},
		],
	},

	label: 'Data de Publicação',

	name: 'publishedAt',

	required: true,

	type: 'date',
};

export const hiddenPublishedAtField: Field = {
	...publishedAtField,
	admin: {
		...publishedAtField.admin,
		hidden: true,
	},
};
