/* * */

import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, BlockSlug } from 'payload';

/* * */

export const BLOCKS_MAIN = [
	'spacer',
	'accordion',
	'gallery',
	'link',
	'video',
	'three-columns-text',
	'two-columns-text',
	'two-columns-text-image',
] as const;

export const LAYOUT_BLOCK_SLUGS = ['three-columns-text', 'two-columns-text', 'two-columns-text-image'] as const;

export const BLOCKS_COLUMN = BLOCKS_MAIN.filter(
	(b): b is (typeof BLOCKS_MAIN)[number] => !(LAYOUT_BLOCK_SLUGS as readonly string[]).includes(b),
);

export function createLexicalConfig(blocks: readonly string[]) {
	return lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures.filter(f => f.key !== 'heading'),
			HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
			HeadingAnchorFeature(),
			BlocksFeature({ blocks: [...blocks] as (Block | BlockSlug)[] as Block[] }),
			BackgroundColorFeature(),
			EXPERIMENTAL_TableFeature(),
			MentionFeature(),
		],
	});
}

export const lexicalEditorConfig = createLexicalConfig(BLOCKS_MAIN);
