/* * */

import type { Field } from 'payload';

/* * */

export const linkFields: Field[] = [
	{
		admin: {
			components: {
				afterInput: ['@/components/LinkFieldPreview#LinkFieldPreview'] as const,
			},
			description: 'Aceita http://, https://, mailto: e tel:. Para links no meio de frase, use ferramenta de link inline no editor.',
		},
		label: 'URL',
		name: 'url',
		required: true,
		type: 'text',
		validate: (value) => {
			if (!value) {
				return 'URL é obrigatório';
			}
			if (!value.match(/^(https?:\/\/.+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+|tel:\+?[0-9()\-\s]+)$/i)) {
				return 'URL deve começar com http://, https://, mailto: ou tel:';
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
		},
		defaultValue: '#ffdd01',
		label: 'Cor de fundo do botão',
		name: 'buttonColor',
		type: 'text',
	},
	{
		admin: {
			components: {
				Field: '@/components/ButtonColorField#ButtonColorField',
			},
			condition: (_, siblingData) => siblingData?.isButton === true,
		},
		defaultValue: '#000000',
		label: 'Cor do texto do botão',
		name: 'buttonTextColor',
		type: 'text',
	},
	{
		defaultValue: false,
		label: 'Abrir em nova aba',
		name: 'newTab',
		type: 'checkbox',
	},
];
