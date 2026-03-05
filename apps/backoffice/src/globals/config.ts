import { type GlobalConfig } from 'payload';

export const Settings: GlobalConfig = {
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
