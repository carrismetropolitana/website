'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

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
