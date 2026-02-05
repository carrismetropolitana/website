'use client';
/* * */

import { Accordion } from '@/components/payload-components/accordion';
import { Code } from '@/components/payload-components/code';
import { Gallery } from '@/components/payload-components/gallery';
import { Heading } from '@/components/payload-components/heading';
import { ImageComponent } from '@/components/payload-components/image';
import { LineMention } from '@/components/payload-components/line-mention';
import { Links } from '@/components/payload-components/links';
import { List } from '@/components/payload-components/lists';
import { ListItem } from '@/components/payload-components/lists/listItem';
import { Paragraph } from '@/components/payload-components/paragraph';
import { Quote } from '@/components/payload-components/quote';
import { Text } from '@/components/payload-components/text';
import { Video } from '@/components/payload-components/video';
import { AccordionItem } from '@/types/accordion.types';
import { LexicalNode } from '@/types/lexical-node.types';
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
		if (nodeType === 'mention' && node.mentionType === 'line') {
			return <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} />;
		}

		// Handle horizontal rule
		if (nodeType === 'horizontalrule') {
			return <hr key={key} />;
		}

		// Handle text nodes
		if (nodeType === 'text') {
			return <Text key={key} format={node.format} style={node.style} text={node.text} />;
		}

		// Handle links (both inline and block)
		if (nodeType === 'link') {
			return <Links key={key} children={children} fields={node.fields} url={node.url} />;
		}

		// Handle link block
		if (nodeType === 'block' && node.fields?.blockType === 'link') {
			return <Links key={key} fields={node.fields} />;
		}

		// Handle linebreak
		if (nodeType === 'linebreak') {
			return <br key={key} />;
		}

		// Handle blockquote
		if (nodeType === 'quote') {
			return <Quote key={key} children={children} />;
		}

		// Handle code blocks
		if (nodeType === 'code') {
			return <Code key={key} children={children} />;
		}

		// Handle Image block
		if (nodeType === 'upload') {
			const imageValue = node.value as { filename?: string, height?: number, url?: string, width?: number };
			return <ImageComponent key={key} alt={imageValue.filename} height={imageValue.height} src={imageValue.url} width={imageValue.width} />;
		}

		// Handle accordion block
		if (nodeType === 'block' && node.fields?.blockType === 'accordion') {
			const items: AccordionItem[] = (node.fields?.accordion ?? []).map(item => ({
				content: item.content ?? '',
				id: item.id ?? '',
				title: item.title ?? '',
			}));
			return items.length ? <Accordion key={key} items={items} /> : null;
		}

		// Handle gallery block
		if (nodeType === 'block' && node.fields?.blockType === 'gallery') {
			return <Gallery key={key} fields={node.fields} />;
		}

		// Handle video block
		if (nodeType === 'block' && node.fields?.blockType === 'video') {
			return <Video key={key} fields={node.fields} />;
		}

		// Fallback: render children if any
		if (children.length > 0) {
			return children.map((child, idx) => renderLexicalNode(child, idx));
		}

		if (node.text) {
			return node.text;
		}

		return null;
	}

	return renderLexicalNode;

	//
}
