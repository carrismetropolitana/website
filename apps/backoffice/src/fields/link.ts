/* * */

import type { Field } from 'payload';

/* * */

export const linkFields: Field[] = [
	{
		admin: {
			components: {
				afterInput: ['@/components/LinkFieldPreview#LinkFieldPreview'] as const,
			},
			description: 'Deve começar com http:// ou https://',
		},
		label: 'URL',
		name: 'url',
		required: true,
		type: 'text',
		validate: (value) => {
			if (!value) {
				return 'URL é obrigatório';
			}
			if (!value.match(/^https?:\/\/.+/)) {
				return 'URL deve começar com http:// ou https://';
			}
			return true;
		},
	},
	{
		label: 'Texto do link (opcional)',
		name: 'text',
		required: false,
		type: 'text',
	},
	{
		defaultValue: false,
		label: 'Estilos de Botão?',
		name: 'isButton',
		type: 'checkbox',
	},
	{
		admin: {
			components: {
				Field: '@/components/ButtonColorField#ButtonColorField',
			},
		},
		defaultValue: '#ffdd01',
		label: 'Cor do botão',
		name: 'buttonColor',
		type: 'text',
	},
	{
		defaultValue: false,
		label: 'Abrir em nova aba',
		name: 'newTab',
		type: 'checkbox',
	},
];
