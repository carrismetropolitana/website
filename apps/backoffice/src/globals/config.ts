import { isAdmin } from '@/access/roles';
import { type GlobalConfig } from 'payload';

export const Settings: GlobalConfig = {
	access: {
		read: () => true,
		update: ({ req }) => isAdmin(req.user),
	},
	admin: {
		hidden: ({ user }) => !isAdmin(user),
	},
	fields: [
		{
			name: 'lightModeIcon',
			relationTo: 'media',
			type: 'upload',
		},
		{
			name: 'lightModeLogo',
			relationTo: 'media',
			type: 'upload',
		},
		{
			name: 'darkModeIcon',
			relationTo: 'media',
			type: 'upload',
		},
		{
			name: 'darkModeLogo',
			relationTo: 'media',
			type: 'upload',
		},
	],
	slug: 'settings',
};
