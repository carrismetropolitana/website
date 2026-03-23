/* * */

import { type GlobalConfig } from 'payload';

/* * */

export const GeneralStatus: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
				components: {
					RowLabel: '@/components/GeneralStatusMessageLabel/index#GeneralStatusMessageLabel',
				},
				initCollapsed: true,
			},
			fields: [
				{
					defaultValue: false,
					label: 'Is Debug',
					name: 'is_debug',
					type: 'checkbox',
				},
				{
					defaultValue: false,
					label: 'Is Enabled',
					name: 'is_enabled',
					type: 'checkbox',
				},
				{
					fields: [
						{
							label: 'Title',
							name: 'title',
							type: 'text',
						},
						{
							label: 'More Info URL (optional)',
							name: 'more_info_url',
							type: 'text',
						},
					],
					type: 'row',
				},
				{
					fields: [
						{
							defaultValue: 'info',
							label: 'Severity',
							name: 'severity',
							options: [
								{ label: 'OK', value: 'ok' },
								{ label: 'Info', value: 'info' },
								{ label: 'Warning', value: 'warning' },
								{ label: 'Danger', value: 'danger' },
							],
							type: 'select',
						},
						{
							label: 'Start Date (optional)',
							name: 'start_date',
							type: 'date',
						},
						{
							label: 'End Date (optional)',
							name: 'end_date',
							type: 'date',
						},
					],
					type: 'row',
				},
			],
			name: 'messages',
			type: 'array',
		},
	],

	label: {
		plural: 'General Status',
		singular: 'General Status Message',
	},

	slug: 'general-status',

};
