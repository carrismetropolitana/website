/**
 * Custom hook to parse Lexical nodes and generate Table of Contents tree.
 */

import type { LexicalNode } from '@/types/lexical-node.types';

import { useEffect, useState } from 'react';

// Define the types for Heading and TOC item
export interface TocTreeItem extends Heading {
	children: TocTreeItem[]
	parent?: TocTreeItem
}

interface Heading {
	id: string
	level: number
	text: string
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

// Function to build a tree structure from headings
function buildTocTree(headings: Heading[]): TocTreeItem[] {
	const toc: TocTreeItem[] = [];
	const stack: TocTreeItem[] = [];

	headings.forEach((heading) => {
		const item: TocTreeItem = { ...heading, children: [] };

		// Remove items from stack that are at the same or deeper level
		while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
			stack.pop();
		}

		if (stack.length === 0) {
			// Top-level heading
			toc.push(item);
		}
		else {
			// Nested heading - add to parent's children
			const parent = stack[stack.length - 1];
			item.parent = parent;
			parent.children.push(item);
		}

		stack.push(item);
	});

	return toc;
}

// Custom hook to parse Lexical nodes and generate TOC tree
export default function useHook(newsBody: LexicalNode | string | undefined): TocTreeItem[] {
	const [toc, setToc] = useState<TocTreeItem[]>([]);

	useEffect(() => {
		if (!newsBody) {
			setToc([]);
			return;
		}

		// Parse body if it's a string (JSON)
		// Structure: body.root.children[] contains the actual nodes
		let parsedBody: LexicalNode | undefined | { root?: { children?: LexicalNode[] } };
		if (typeof newsBody === 'string') {
			try {
				parsedBody = JSON.parse(newsBody) as LexicalNode | { root?: { children?: LexicalNode[] } };
			}
			catch {
				setToc([]);
				return;
			}
		}
		else {
			parsedBody = newsBody;
		}

		// Extract the root node from body.root structure
		// Structure: body.root.children[] contains the actual nodes
		const rootNode = (parsedBody && typeof parsedBody === 'object' && 'root' in parsedBody ? parsedBody.root : parsedBody) as LexicalNode | undefined | { children?: LexicalNode[] };
		if (!rootNode || !rootNode.children || !Array.isArray(rootNode.children)) {
			setToc([]);
			return;
		}

		// Extract headings from root.children array
		// Headings are direct children of root with type="heading" and tag="h2" or "h3"
		const headings: Heading[] = [];
		for (const child of rootNode.children) {
			if (child.type === 'heading' && child.tag) {
				const level = parseInt(child.tag.replace('h', '')) || 1;
				const text = extractTextFromNode(child);

				if (text && (level === 2 || level === 3)) {
					const id = slugify(text);
					headings.push({ id, level, text });
				}
			}
		}

		const tocTree = buildTocTree(headings);
		setToc(tocTree);
	}, [newsBody]);

	return toc;
}
