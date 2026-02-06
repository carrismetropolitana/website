import { LexicalNode } from '@/types/lexical-node.types';

/* * */

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

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
