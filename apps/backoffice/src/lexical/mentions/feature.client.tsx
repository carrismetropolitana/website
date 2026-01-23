'use client';
/* * */

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';

import { MentionNode } from './MentionNode';
import { MentionPlugin } from './MentionPlugin';

/* * */

export const MentionFeatureClient = createClientFeature(() => ({
	nodes: [MentionNode],
	plugins: [
		{
			Component: MentionPlugin,
			position: 'normal',
		},
	],
	slashMenu: {
		groups: [
			{
				items: [
					{
						Icon: () => <span style={{ fontWeight: 800, lineHeight: 1 }}>L</span>,
						key: 'line',
						keywords: ['linha', 'linhas', 'line', 'lines'],
						label: 'Line Mention',
						onSelect: ({ editor }) => {
							editor.update(() => {
								const selection = $getSelection();
								if (!$isRangeSelection(selection)) return;
								selection.insertText('line:');
							});
						},
					},
				],
				key: 'mentions',
				label: 'Mentions',
			},
		],
	},
}));

/* * */
