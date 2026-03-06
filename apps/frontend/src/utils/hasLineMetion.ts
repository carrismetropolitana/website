/* * */

import { type LexicalNode } from '@/types/lexical-node.types';

/* * */

export function hasLineMentionNode(node: LexicalNode) {
	//

	//
	// A. Render Components

	if (!node || typeof node !== 'object') {
		return false;
	}

	if (node.type === 'mention') {
		return true;
	}

	if (node.children) {
		return node.children.some(child => hasLineMentionNode(child));
	}

	return false;

	//
}
