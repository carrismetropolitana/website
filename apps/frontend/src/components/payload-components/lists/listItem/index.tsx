'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface ListItemProps {
	children: LexicalNode[]
}

/* * */

export function ListItem({ children }: ListItemProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	//
	// B. Render components

	return (
		<li>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</li>
	);

	//
}
