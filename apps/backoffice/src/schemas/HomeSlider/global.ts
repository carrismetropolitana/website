/* * */

import { type GlobalConfig } from 'payload';

/* * */

function normalizeMoreInfoUrl(value: unknown): unknown {
	if (typeof value !== 'string') return value;

	const trimmedValue = value.trim();
	if (!trimmedValue) return '';

	const normalizedValue = /^https?:\/\//i.test(trimmedValue)
		? trimmedValue
		: `https://${trimmedValue.replace(/^\/+/, '')}`;

	try {
		const parsedUrl = new URL(normalizedValue);
		if (!parsedUrl.hostname.startsWith('www.') && parsedUrl.hostname.split('.').length === 2) {
			parsedUrl.hostname = `www.${parsedUrl.hostname}`;
		}
		return parsedUrl.toString();
	}
	catch {
		return normalizedValue;
	}
}

function validateMoreInfoUrl(value: unknown): string | true {
	if (value == null) return true;
	if (typeof value !== 'string') return 'URL inválido';

	const trimmedValue = value.trim();
	if (!trimmedValue) return true;

	return /^https?:\/\/\S+$/i.test(trimmedValue) ? true : 'URL deve começar com http:// ou https://';
}

/* * */

export const HomeSlider: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
				components: {
					RowLabel: '@/components/HomeSliderMessageLabel/index#HomeSliderMessageLabel',
				},
				initCollapsed: true,
			},
			fields: [
				{
					defaultValue: false,
					label: 'Is Enabled',
					name: 'is_enabled',
					type: 'checkbox',
				},
				{
					fields: [
						{
							label: 'Image',
							name: 'image',
							relationTo: 'media',
							type: 'upload',
						},
					],
					type: 'row',
				},
				{
					fields: [
						{
							label: 'Title (used for accessibility)',
							name: 'title',
							type: 'text',
						},
						{
							hooks: {
								beforeValidate: [
									({ value }) => normalizeMoreInfoUrl(value),
								],
							},
							label: 'More Info URL (optional)',
							name: 'more_info_url',
							type: 'text',
							validate: validateMoreInfoUrl,
						},
					],
					type: 'row',
				},
				{
					fields: [
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
			name: 'slides',
			type: 'array',
		},
	],

	label: {
		plural: 'Home Slider',
		singular: 'Home Slider Slide',
	},

	slug: 'home-slider',

};
