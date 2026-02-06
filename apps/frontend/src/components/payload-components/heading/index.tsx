'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import { useMemo } from 'react';

/* * */

interface HeadingProps {
	children: LexicalNode[]
	tag?: string
}

/* * */

function extractTextFromNode(node: LexicalNode): string {
	if (node.text) {
		return node.text;
	}
	if (node.children && node.children.length > 0) {
		return node.children.map(extractTextFromNode).join('');
	}
	return '';
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/* * */

export function Heading({ children, tag = 'h1' }: HeadingProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const HeadingTag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	const id = useMemo(() => {
		const text = children.map(extractTextFromNode).join('');
		return slugify(text);
	}, [children]);

	//
	// B. Render components

	return (
		<HeadingTag id={id}>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</HeadingTag>
	);

	//
}
