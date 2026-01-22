'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface HeadingProps {
	children: LexicalNode[]
	tag?: string
}

/* * */

export function Heading({ children, tag = 'h1' }: HeadingProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const HeadingTag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	//
	// B. Render components

	return (
		<HeadingTag>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</HeadingTag>
	);

	//
}
