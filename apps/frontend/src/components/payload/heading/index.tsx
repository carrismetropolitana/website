'use client';
/* * */

import type { LexicalNode } from '@/types/lexical-node.types';

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import { extractTextFromNode, slugify } from '@/utils/sidebarHelper';
import { useMemo } from 'react';

/* * */

interface HeadingProps {
	anchorId?: string
	children: LexicalNode[]
	index?: number
	tag?: 'h2' | 'h3'
}

const FALLBACK_ID = (children: LexicalNode[], index?: number) => {
	const text = children.map(extractTextFromNode).join('');
	const base = slugify(text);
	return typeof index === 'number' ? `${base}-${index}` : base;
};

export function Heading({ anchorId, children, index, tag = 'h2' }: HeadingProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const id = useMemo(() => FALLBACK_ID(children, index), [children, index]);
	const content = children.map((child, idx) => renderLexicalNode(child, idx));
	const Tag = tag === 'h2' ? 'h2' : 'h3';

	//
	// B. Render components

	return <Tag id={anchorId ?? id}>{content}</Tag>;
}
