'use client';
/* * */

import { Accordion } from '@/components/payload-components/accordion';
import { Code } from '@/components/payload-components/code';
import { Heading } from '@/components/payload-components/heading';
import { ImageComponent } from '@/components/payload-components/image';
import { LineMention } from '@/components/payload-components/lineMention';
import { Links } from '@/components/payload-components/links';
import { List } from '@/components/payload-components/lists';
import { ListItem } from '@/components/payload-components/lists/listItem';
import { Paragraph } from '@/components/payload-components/paragraph';
import { Quote } from '@/components/payload-components/quote';
import { Text } from '@/components/payload-components/text';
import { AccordionData } from '@/types/accordion.types';
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
		if (nodeType === 'mention') {
			return <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} />;
		}

		// Handle horizontal rule
		if (nodeType === 'horizontalrule') {
			return <hr key={key} />;
		}

		// Handle text nodes
		if (nodeType === 'text') {
			return <Text key={key} format={node.format} text={node.text} />;
		}

		// Handle links
		if (nodeType === 'link') {
			return <Links key={key} children={children} fields={node.fields} url={node.url} />;
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
			const imageValue = node.value as { filename?: string, url?: string };
			return <ImageComponent key={key} alt={imageValue.filename} src={imageValue.url} />;
		}

		// Handle accordion block
		if (nodeType === 'accordion') {
			// Payload blocks store field data in fields with the field name as key
			// Since the accordionField is named 'accordion', the data is in fields.accordion
			const accordionItems = (node.fields as { accordion?: AccordionData })?.accordion;
			if (accordionItems && Array.isArray(accordionItems) && accordionItems.length > 0) {
				return <Accordion key={key} items={accordionItems} />;
			}
			return null;
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
			return node.text;
		}

		return null;
	}

	return renderLexicalNode;

	//
}
