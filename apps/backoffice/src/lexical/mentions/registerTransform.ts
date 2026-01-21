// src/lexical/mentions/registerTransform.ts
import { $createTextNode, type LexicalEditor, TextNode } from '@payloadcms/richtext-lexical/lexical';

import { $createMentionNode } from './MentionNode';

// Only convert once the user "finishes" the mention (e.g. typing a space/punctuation).
// This avoids converting after the first digit while the user is still typing.
const REGEX = /line:(\d+)(?=[\s.,;:!?])/;

export function registerMentionTransform(editor: LexicalEditor) {
	return editor.registerNodeTransform(TextNode, (node) => {
		const text = node.getTextContent();
		const match = REGEX.exec(text);

		if (!match) return;

		const id = match[1];
		const before = text.slice(0, match.index);
		const after = text.slice(match.index + match[0].length);

		const mention = $createMentionNode(id, id);

		if (before) node.insertBefore($createTextNode(before));
		node.replace(mention);
		if (after) mention.insertAfter($createTextNode(after));
	});
}
