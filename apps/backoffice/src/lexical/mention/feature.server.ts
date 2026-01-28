// src/lexical/mentions/feature.server.ts
import { createServerFeature } from '@payloadcms/richtext-lexical';

import { MentionNode } from './MentionNode';

export const MentionFeature = createServerFeature({
	feature: () => ({
		ClientFeature: '@/lexical/mention/feature.client#MentionFeatureClient',
		nodes: [{ node: MentionNode }],
	}),
	key: 'mentions',
});
