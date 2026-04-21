'use client';

import { $createLinkNode, $isAutoLinkNode, $isLinkNode, createClientFeature } from '@payloadcms/richtext-lexical/client';
import { $createTextNode, TextNode } from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

const MAILTO_REGEX = /mailto:[^\s<>()@]+@[^\s<>()@]+\.[A-Za-z]{2,}/i;
const SEPARATOR_REGEX = /[\s.,;!?()[\]{}"'`]/;

function isValidStartBoundary(char: string | undefined) {
	return !char || SEPARATOR_REGEX.test(char);
}

function isValidEndBoundary(char: string | undefined) {
	return !!char && SEPARATOR_REGEX.test(char);
}

function MailtoAutoLinkPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => editor.registerNodeTransform(TextNode, (textNode) => {
		if (!textNode.isSimpleText()) return;

		const parent = textNode.getParent();
		if (!parent || $isLinkNode(parent) || $isAutoLinkNode(parent)) return;

		const text = textNode.getTextContent();
		const match = MAILTO_REGEX.exec(text);
		if (!match || match.index == null) return;

		const start = match.index;
		const end = start + match[0].length;
		const charBefore = start > 0 ? text[start - 1] : undefined;
		const charAfter = end < text.length ? text[end] : undefined;
		if (!isValidStartBoundary(charBefore) || !isValidEndBoundary(charAfter)) return;

		let linkTextNode: TextNode | undefined;
		if (start === 0) {
			[linkTextNode] = textNode.splitText(end);
		}
		else {
			[, linkTextNode] = textNode.splitText(start, end);
		}

		if (!linkTextNode) return;

		const linkValue = match[0];
		const visibleText = linkValue.replace(/^mailto:/i, '');
		const linkNode = $createLinkNode({
			fields: {
				linkType: 'custom',
				newTab: true,
				url: linkValue,
			},
		});

		const clonedTextNode = $createTextNode(visibleText);
		clonedTextNode.setFormat(linkTextNode.getFormat());
		clonedTextNode.setDetail(linkTextNode.getDetail());
		clonedTextNode.setStyle(linkTextNode.getStyle());

		linkNode.append(clonedTextNode);
		linkTextNode.replace(linkNode);
	}), [editor]);

	return null;
}

export const MailtoAutoLinkFeatureClient = createClientFeature(() => ({
	plugins: [
		{
			Component: MailtoAutoLinkPlugin,
			position: 'normal',
		},
	],
}));
