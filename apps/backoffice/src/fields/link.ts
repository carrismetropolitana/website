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
			condition: (_, siblingData) => siblingData?.isButton === true,
			description: 'Cor de fundo do botão (hex). Por omissão usa o amarelo da marca.',
		},
		defaultValue: '#ffdd01',
		label: 'Cor do botão',
		name: 'buttonColor',
		type: 'text',
		validate: (value) => {
			if (!value || !value.trim()) return true;
			if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value.trim())) {
				return 'Use um código de cor hexadecimal (#RGB ou #RRGGBB)';
			}
			return true;
		},
	},
	{
		defaultValue: false,
		label: 'Abrir em nova aba',
		name: 'newTab',
		type: 'checkbox',
	},
];
