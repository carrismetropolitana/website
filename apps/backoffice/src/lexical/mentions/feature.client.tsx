'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import React from 'react';

import { MentionNode } from './MentionNode';
import { MentionPlugin } from './MentionPlugin';

const LineIcon: React.FC = () => (
	<span style={{ fontWeight: 800, lineHeight: 1 }}>L</span>
);

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
						Icon: LineIcon,
						key: 'line',
						keywords: ['linha', 'linhas', 'line', 'lines'],
						label: 'Insert line mention',
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
