'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface CodeProps {
	children: LexicalNode[]
}

/* * */

export function Code({ children }: CodeProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<pre>
			<code>
				{children.map((child, idx) => renderLexicalNode(child, idx))}
			</code>
		</pre>
	);

	//
}
