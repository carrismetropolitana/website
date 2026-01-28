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

// Helper function to extract text content from a Lexical node
function extractTextFromNode(node: LexicalNode): string {
	if (node.text) {
		return node.text;
	}
	if (node.children && node.children.length > 0) {
		return node.children.map(extractTextFromNode).join('');
	}
	return '';
}

// Helper function to generate a slug from text
function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/* * */

export function Heading({ children, tag = 'h1' }: HeadingProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const HeadingTag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	// Generate ID from heading text for anchor links
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
