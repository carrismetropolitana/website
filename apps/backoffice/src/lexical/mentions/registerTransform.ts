/* * */

import { $createTextNode, type LexicalEditor, TextNode } from '@payloadcms/richtext-lexical/lexical';

import { $createMentionNode } from './MentionNode';

/* * */

// Only convert once the user "finishes" the mention (e.g. typing a space/punctuation).
// This avoids converting after the first digit while the user is still typing.

export function registerMentionTransform(editor: LexicalEditor) {
	return editor.registerNodeTransform(TextNode, (node) => {
		//

		//
		// A. Setup Variables

		const REGEX = /line:(\d+)(?=[\s.,;:!?])/;
		const text = node.getTextContent();
		const match = REGEX.exec(text);

		//
		// b. Transform Data
		if (!match) return;

		const id = match[1];
		const before = text.slice(0, match.index);
		const after = text.slice(match.index + match[0].length);

		//
		// C. Create Node

		const mention = $createMentionNode(id, id);

		//
		// D. Insert Node

		if (before) node.insertBefore($createTextNode(before));
		node.replace(mention);
		if (after) mention.insertAfter($createTextNode(after));

		//
	});
}
