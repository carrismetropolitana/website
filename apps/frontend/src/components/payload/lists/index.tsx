'use client';
/* * */

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';
import { LexicalNode } from '@/types/lexical-node.types';

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
