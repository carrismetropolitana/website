'use client';
/* * */

import {
	createClientFeature,
	INSERT_BLOCK_COMMAND,
	slashMenuBasicGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { IconArrowAutofitHeight } from '@tabler/icons-react';

/* * */

function SpacerIcon() {
	return (
		<IconArrowAutofitHeight size={12} />
	);
}

/* * */

export const SpacerFeatureClient = createClientFeature({
	slashMenu: {
		groups: [
			slashMenuBasicGroupWithItems([
				{
					Icon: SpacerIcon,
					key: 'block-spacer',
					keywords: ['spacer', 'espaço', 'espaçador', 'space', 'margin'],
					label: 'Espaçador',
					onSelect: ({ editor }) => {
						editor.dispatchCommand(INSERT_BLOCK_COMMAND, {
							blockName: '',
							blockType: 'spacer',
						});
					},
				},
			]),
		],
	},
});
