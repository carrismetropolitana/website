'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { hasLineMentionNode } from '@/utils/hasLineMetion';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface ParagraphProps {
	children: LexicalNode[]
}

/* * */

export function Paragraph({ children }: ParagraphProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const hasMention = children.some(child => hasLineMentionNode(child));
	const Tag = hasMention ? 'div' : 'p';
	const style = hasMention ? { marginBottom: '1em' } : undefined;

	//
	// B. Render components

	return (
		<Tag style={style}>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</Tag>
	);

	//
}
