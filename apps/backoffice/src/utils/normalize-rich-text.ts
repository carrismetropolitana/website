/* * */

import type { FieldHook, RichTextField } from 'payload';

import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';

/* * */

/**
 * Some documents were imported with rich text fields stored as plain Markdown
 * strings instead of a Lexical editor state. The admin editor only accepts an
 * editor state, so convert those legacy values on read. Saving the document
 * afterwards persists the converted state.
 */
export const normalizeRichTextValue: FieldHook = ({ field, value }) => {
	if (typeof value !== 'string') return value;
	if (!value.trim()) return undefined;

	return convertMarkdownToLexical({
		editorConfig: editorConfigFactory.fromField({ field: field as RichTextField }),
		markdown: value,
	});
};
