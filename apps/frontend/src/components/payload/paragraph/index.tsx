'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { hasLineMentionNode } from '@/utils/hasLineMetion';
import { parseStyleString } from '@/utils/parseStyleString';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

interface ParagraphProps {
	children: LexicalNode[]
	style?: string
}

/* * */

export function Paragraph({ children, style: styleStr }: ParagraphProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const hasMention = children.some(child => hasLineMentionNode(child));
	const contentChildren = children.filter(child => child.type !== 'linebreak');
	const Tag = hasMention ? 'div' : 'p';
	const inlineStyle = { ...(hasMention ? { marginBottom: 'var(--size-spacing-10)' } : {}), ...(styleStr ? parseStyleString(styleStr) : {}) };
	const style = Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined;

	//
	// B. Render components

	if (contentChildren.length === 0) {
		return <Tag style={style} />;
	}

	return (
		<Tag style={style}>
			{contentChildren.map((child, idx) => renderLexicalNode(child, idx))}
		</Tag>
	);

	//
}
