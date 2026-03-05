'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface QuoteProps {
	children: LexicalNode[]
}

/* * */

export function Quote({ children }: QuoteProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<blockquote>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</blockquote>
	);

	//
}
