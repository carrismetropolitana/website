/*
** Extract Lexical root node from various content formats (string, object with root, raw root).
*/

import type { LexicalNode } from '@/types/lexical-node.types';

/* * */

export function getLexicalRoot(content: unknown): LexicalNode | null {
	//

	//
	// A. Setup variables

	let json: unknown;

	//
	// B. Render Components

	if (!content) return null;

	try {
		json = typeof content === 'string' ? JSON.parse(content) : content;
	}
	catch {
		return null;
	}

	if (!json || typeof json !== 'object') return null;
	return (json as { root?: LexicalNode }).root ?? (json as LexicalNode);

	//
}

/* * */
