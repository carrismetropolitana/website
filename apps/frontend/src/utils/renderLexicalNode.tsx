'use client';
/* * */

import { Heading } from '@/components/payload-components/heading';
import { LineMention } from '@/components/payload-components/lineMention';
import { List } from '@/components/payload-components/lists';
import { ListItem } from '@/components/payload-components/lists/listItem';
import { Paragraph } from '@/components/payload-components/paragraph';
import { LexicalNode } from '@/types/lexical-node.types';
import Link from 'next/link';
import { type ReactNode } from 'react';

/* * */

export function useRenderLexicalNode() {
	//

	//
	// A. Render Components

	function renderLexicalNode(node: LexicalNode, key?: number): ReactNode {
		if (!node || typeof node !== 'object') {
			return null;
		}

		const nodeType = node.type;
		const children = node.children || [];

		// Handle root node
		if (nodeType === 'root') {
			return children.map((child, idx) => renderLexicalNode(child, idx));
		}

		// Handle paragraph
		if (nodeType === 'paragraph') {
			return <Paragraph key={key} children={children} />;
		}

		// Handle headings
		if (nodeType === 'heading') {
			return <Heading key={key} children={children} tag={node.tag} />;
		}

		// Handle lists
		if (nodeType === 'list') {
			return <List key={key} children={children} listType={node.listType} />;
		}

		if (nodeType === 'listitem') {
			return <ListItem key={key} children={children} />;
		}

		// Handle mention nodes - convert to LineBadge if it's a line mention
		if (nodeType === 'mention') {
			return <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} />;
		}

		// Handle text nodes
		if (nodeType === 'text') {
			let text: ReactNode = node.text || '';
			const format = node.format || 0;

			if (format & 16) {
				text = <code key="code">{text}</code>;
			}
			else {
				if (format & 1) {
					// Bold
					text = <strong key="bold">{text}</strong>;
				}
				if (format & 2) {
					// Italic
					text = <em key="italic">{text}</em>;
				}
				if (format & 4) {
					// Strikethrough
					text = <s key="strike">{text}</s>;
				}
				if (format & 8) {
					// Underline
					text = <u key="underline">{text}</u>;
				}
			}

			return <>{text}</>;
		}

		// Handle links
		if (nodeType === 'link') {
			const url = node.url || '';
			const linkType = node.fields?.linkType || 'custom';
			const newTab = node.fields?.newTab || false;

			let href = url;
			if (linkType === 'internal' && node.fields?.doc) {
				const relationTo = node.fields.doc.relationTo;
				const slug = node.fields.doc.value?.slug;
				if (relationTo && slug) {
					href = `/${relationTo}/${slug}`;
				}
			}

			return (
				<Link
					key={key}
					href={href}
					rel={newTab ? 'noreferrer noopener' : undefined}
					target={newTab ? '_blank' : undefined}
				>
					{children.map((child, idx) => renderLexicalNode(child, idx))}
				</Link>
			);
		}

		// Handle linebreak
		if (nodeType === 'linebreak') {
			return <br key={key} />;
		}

		// Handle blockquote
		if (nodeType === 'quote') {
			return (
				<blockquote key={key}>
					{children.map((child, idx) => renderLexicalNode(child, idx))}
				</blockquote>
			);
		}

		// Handle code blocks
		if (nodeType === 'code') {
			return (
				<pre key={key}>
					<code>
						{children.map((child, idx) => renderLexicalNode(child, idx))}
					</code>
				</pre>
			);
		}

		// Fallback: render children if any
		if (children.length > 0) {
			return (
				<>
					{children.map((child, idx) => renderLexicalNode(child, idx))}
				</>
			);
		}

		if (node.text) {
			return <>{node.text}</>;
		}

		return null;
	}

	return renderLexicalNode;

	//
}
