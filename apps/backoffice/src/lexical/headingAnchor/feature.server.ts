/* * */

import type { HeadingAnchorFeatureProps } from './types';

import { CustomHeadingNode } from '@/lexical/headingAnchor/CustomHeadingNode';
import { createServerFeature } from '@payloadcms/richtext-lexical';
import { HeadingNode } from '@payloadcms/richtext-lexical/lexical/rich-text';

/* * */

export const HeadingAnchorFeature = createServerFeature<HeadingAnchorFeatureProps, HeadingAnchorFeatureProps, HeadingAnchorFeatureProps>({
	feature: ({ props }) => ({
		ClientFeature: '@/lexical/headingAnchor/feature.client#HeadingAnchorFeatureClient',
		clientFeatureProps: props ?? {},
		nodes: [
			{ node: { replace: HeadingNode, with: (node: HeadingNode) => new CustomHeadingNode(node.__tag), withKlass: CustomHeadingNode } },
			{ node: CustomHeadingNode },
		],
	}),
	key: 'headingAnchor',
});
