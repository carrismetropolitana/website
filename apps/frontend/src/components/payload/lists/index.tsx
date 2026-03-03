'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface ListProps {
	children: LexicalNode[]
	listType?: 'bullet' | 'number'
}

/* * */

export function List({ children, listType = 'bullet' }: ListProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const ListTag = listType === 'number' ? 'ol' : 'ul';

	//
	// B. Render components

	return (
		<ListTag>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</ListTag>
	);

	//
}
