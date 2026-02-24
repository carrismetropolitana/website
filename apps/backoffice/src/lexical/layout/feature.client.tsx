'use client';
/* * */

import {
	createClientFeature,
	INSERT_BLOCK_COMMAND,
} from '@payloadcms/richtext-lexical/client';
import { IconColumns2, IconColumns3, IconPhoto } from '@tabler/icons-react';

/* * */

const layoutBlocks = [
	{
		Icon: IconColumns2,
		key: 'block-two-columns-text',
		keywords: ['duas colunas', 'two columns', 'colunas', 'columns'],
		label: 'Duas colunas (texto)',
		slug: 'two-columns-text',
	},
	{
		Icon: IconPhoto,
		key: 'block-two-columns-text-image',
		keywords: ['duas colunas', 'imagem', 'texto imagem', 'two columns image'],
		label: 'Duas colunas (texto + imagem)',
		slug: 'two-columns-text-image',
	},
	{
		Icon: IconColumns3,
		key: 'block-three-columns-text',
		keywords: ['três colunas', 'three columns', 'colunas', 'columns'],
		label: 'Três colunas (texto)',
		slug: 'three-columns-text',
	},
];

/* * */

export const LayoutFeatureClient = createClientFeature({
	slashMenu: {
		groups: [
			{
				items: layoutBlocks.map(({ Icon, key, keywords, label, slug }) => ({
					Icon,
					key,
					keywords: [...keywords],
					label,
					onSelect: ({ editor }) => {
						editor.dispatchCommand(INSERT_BLOCK_COMMAND, {
							blockName: '',
							blockType: slug,
						});
					},
				})),
				key: 'layout',
				label: 'Layout',
			},
		],
	},
});
