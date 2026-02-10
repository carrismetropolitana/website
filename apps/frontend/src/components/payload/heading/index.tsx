'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import { extractTextFromNode, slugify } from '@/utils/sidebarHelper';
import { useMemo } from 'react';

/* * */

interface HeadingProps {
	children: LexicalNode[]
	index?: number
	tag?: string
}

/* * */

export function Heading({ children, index, tag = 'h1' }: HeadingProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	const id = useMemo(() => {
		const text = children.map(extractTextFromNode).join('');
		const base = slugify(text);
		return typeof index === 'number' ? `${base}-${index}` : base;
	}, [children, index]);

	const renderedChildren = children.map((child, idx) => renderLexicalNode(child, idx));

	//
	// B. Render components

	if (tag === 'h1') return <h1 id={id}>{renderedChildren}</h1>;
	if (tag === 'h2') return <h2 id={id}>{renderedChildren}</h2>;
	if (tag === 'h3') return <h3 id={id}>{renderedChildren}</h3>;
	if (tag === 'h4') return <h4 id={id}>{renderedChildren}</h4>;
	if (tag === 'h5') return <h5 id={id}>{renderedChildren}</h5>;
	if (tag === 'h6') return <h6 id={id}>{renderedChildren}</h6>;

	return <h1 id={id}>{renderedChildren}</h1>;

	//
}
