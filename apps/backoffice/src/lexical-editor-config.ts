/* * */

import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

/* * */

/** All block slugs available in the main editor. */
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

/** Layout block slugs – excluded from nested editors to avoid recursion. */
export const LAYOUT_BLOCK_SLUGS = ['three-columns-text', 'two-columns-text', 'two-columns-text-image'] as const;

/** Block slugs for nested editors (layout columns) – main blocks minus layout blocks. */
export const BLOCKS_COLUMN = BLOCKS_MAIN.filter(
	(b): b is (typeof BLOCKS_MAIN)[number] => !(LAYOUT_BLOCK_SLUGS as readonly string[]).includes(b),
);

export function createLexicalConfig(blocks: readonly string[]) {
	return lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures.filter(f => f.key !== 'heading'),
			HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
			HeadingAnchorFeature(),
			BlocksFeature({ blocks: [...blocks] }),
			BackgroundColorFeature(),
			EXPERIMENTAL_TableFeature(),
			MentionFeature(),
		],
	});
}

/** Main editor config – used by News, Campaigns, payload-config. */
export const lexicalEditorConfig = createLexicalConfig(BLOCKS_MAIN);
