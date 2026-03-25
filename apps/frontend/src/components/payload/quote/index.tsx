'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

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
