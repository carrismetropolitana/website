/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Users: CollectionConfig = {

	admin: {
		useAsTitle: 'email',
	},

	auth: {
		useAPIKey: true,
	},

	fields: [
		{
			label: 'Name',
			name: 'name',
			type: 'text',
		},
		{
			label: 'Email',
			name: 'email',
			type: 'text',
		},
	],

	slug: 'users',

};
