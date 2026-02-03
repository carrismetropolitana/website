/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Media: CollectionConfig = {
	access: {
		create: ({ req }) => Boolean(req.user),
		delete: ({ req }) => Boolean(req.user),
		read: () => true,
		update: ({ req }) => Boolean(req.user),
	},

	fields: [
		{
			name: 'alt',
			type: 'text',
		},
	],

	hooks: {
		beforeOperation: [
			({ collection, operation, req }) => {
				if ((operation === 'create' || operation === 'update') && req.file) {
					req.file.name = `${collection.slug}-${Date.now()}-${req.file.name.replace(/[^a-z0-9.]/gi, '_').slice(-30).toLowerCase()}`;
				}
			},
		],
	},

	labels: {
		plural: 'Multimédia',
		singular: 'Multimédia',
	},

	slug: 'media',

	upload: true,

};
