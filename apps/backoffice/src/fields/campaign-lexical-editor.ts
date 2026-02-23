/* * */

import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

import { accordionFields } from './accordion';
import { galleryFields } from './gallery';
import { linkFields } from './link';
import { videoFields } from './video';

/* * */

/**
 * Lexical editor config for campaign layout blocks.
 * Matches the main editor features (heading, anchors, blocks, mentions, etc.).
 */
export const campaignLexicalEditor = lexicalEditor({
	features: ({ defaultFeatures }) => [
		...defaultFeatures.filter(f => f.key !== 'heading'),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		HeadingAnchorFeature(),
		BlocksFeature({
			blocks: [
				{ fields: accordionFields, slug: 'accordion' },
				{ fields: galleryFields, slug: 'gallery' },
				{ fields: linkFields, slug: 'link' },
				{ fields: videoFields, slug: 'video' },
			],
		}),
		BackgroundColorFeature(),
		EXPERIMENTAL_TableFeature(),
		MentionFeature(),
	],
});
