import { LexicalNode } from '@/types/lexical-node.types';

/* * */

// Extracts plain text from a LexicalNode tree structure by recursively traversing its children.
export function extractTextFromNode(node: LexicalNode): string {
	if (node.text) {
		return node.text;
	}
	if (node.children && node.children.length > 0) {
		return node.children.map(extractTextFromNode).join('');
	}
	return '';
}

/* * */

// Extracts plain text from a LexicalNode tree structure by recursively traversing its children.
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/* * */
