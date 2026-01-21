'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';

import { MentionNode } from './MentionNode';
import { MentionPlugin } from './MentionPlugin';

export const MentionFeatureClient = createClientFeature(() => ({
	nodes: [MentionNode],
	plugins: [
		{
			Component: MentionPlugin,
			position: 'normal',
		},
	],
}));
