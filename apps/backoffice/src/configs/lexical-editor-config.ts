/* * */

import { BackgroundColorFeature } from '@/lexical/backgroundColor/feature.server';
import { HeadingAnchorFeature } from '@/lexical/headingAnchor/feature.server';
import { MentionFeature } from '@/lexical/mention/feature.server';
import { BlocksFeature, EXPERIMENTAL_TableFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block, BlockSlug } from 'payload';

/* * */

export const BLOCKS_MAIN = ['spacer', 'accordion', 'gallery', 'link', 'video', 'surface', 'section', 'three-columns-text', 'two-columns-text', 'two-columns-text-image'] as const;
export const LAYOUT_BLOCK_SLUGS = ['surface', 'section', 'three-columns-text', 'two-columns-text', 'two-columns-text-image'] as const;
export const BLOCKS_COLUMN = BLOCKS_MAIN.filter((b): b is (typeof BLOCKS_MAIN)[number] => !(LAYOUT_BLOCK_SLUGS as readonly string[]).includes(b)) as (typeof BLOCKS_MAIN)[number][];

/* * */

interface CreateLexicalFeaturesProps {
	blocks?: readonly string[]
	includeBlocksFeature?: boolean
}

/* * */

export function createLexicalFeatures({ blocks, includeBlocksFeature = true }: CreateLexicalFeaturesProps) {
	//

	//
	// A. Configure features

	return ({ defaultFeatures }) => ([
		...defaultFeatures.filter(f => f.key !== 'heading'),
		HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
		HeadingAnchorFeature(),
		...(includeBlocksFeature && blocks
			? [BlocksFeature({ blocks: [...blocks] as unknown as (Block | BlockSlug)[] })]
			: []),
		BackgroundColorFeature(),
		EXPERIMENTAL_TableFeature(),
		MentionFeature(),
	]);

	//
}

export function createLexicalConfig(blocks: readonly string[]) {
	//

	//
	// A. Create lexical editor config

	return lexicalEditor({
		features: createLexicalFeatures({ blocks }),
	});

	//
}

export const lexicalEditorConfigColumn = lexicalEditor({
	features: createLexicalFeatures({ includeBlocksFeature: false }),
});

export const lexicalEditorConfig = createLexicalConfig(BLOCKS_MAIN);
