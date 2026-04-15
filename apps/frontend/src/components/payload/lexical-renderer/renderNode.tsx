'use client';
/* * */

import type { LexicalNode } from '@/types/lexical-node.types';
import type { PayloadLexicalLink } from '@/types/link.types';
import type { ReactNode } from 'react';

import { Code } from '@/components/payload/code';
import { Heading } from '@/components/payload/heading';
import { LineMention } from '@/components/payload/line-mention';
import { Links } from '@/components/payload/links';
import { List } from '@/components/payload/lists';
import { ListItem } from '@/components/payload/lists/listItem';
import { Paragraph } from '@/components/payload/paragraph';
import { Quote } from '@/components/payload/quote';
import { Table } from '@/components/payload/table';
import { TableCell } from '@/components/payload/table/table-cell';
import { Text } from '@/components/payload/text';
import { renderUpload } from '@/components/payload/upload';

import { renderBlock } from './renderBlock';

/* * */

export interface RenderNodeOptions {
	disableAutoLink?: boolean
}

/* * */

// Standard Lexical Node renderer
export function renderNode(node: LexicalNode, key?: number, options: RenderNodeOptions = {}): ReactNode {
	//

	//
	// A. Setup variables

	const { disableAutoLink = false } = options;
	const children = node.children ?? [];
	const renderChildren = () => children.map((child, idx) => renderNode(child, idx, options));

	//
	// B. Render components

	if (!node || typeof node !== 'object') return null;

	switch (node.type) {
		case 'block': return renderBlock(node, key, renderNode);
		case 'code': return <Code key={key} children={children} />;
		case 'custom-heading':
		case 'heading': {
			const anchorId = (node as { anchorId?: string }).anchorId;
			return <Heading key={key} anchorId={anchorId} children={children} index={key} tag={node.tag as 'h2' | 'h3'} />;
		}
		case 'horizontalrule': return <hr key={key} />;
		case 'link': {
			const raw = node.fields;
			const linkFields: PayloadLexicalLink = {
				buttonColor: raw?.buttonColor,
				buttonTextColor: raw?.buttonTextColor,
				doc: raw?.doc,
				isButton: raw?.isButton,
				linkType: raw?.linkType,
				newTab: raw?.newTab,
				text: typeof raw?.text === 'string' ? raw.text : undefined,
				url: raw?.url,
			};

			return <Links key={key} children={children} disableChildAutoLink fields={linkFields} url={node.url} />;
		}
		case 'list': return <List key={key} children={children} listType={node.listType} />;
		case 'listitem': return <ListItem key={key} children={children} />;
		case 'mention': return node.mentionType === 'line' ? <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} /> : null;
		case 'paragraph': return <Paragraph key={key} children={children} style={node.style} />;
		case 'quote': return <Quote key={key} children={children} />;
		case 'root': return renderChildren();
		case 'table': return <Table key={key} children={children} />;
		case 'tablecell':
			return (
				<TableCell
					key={key}
					backgroundColor={(node as { backgroundColor?: string }).backgroundColor}
					children={children}
					headerState={(node as { headerState?: number }).headerState}
				/>
			);
		case 'tablerow': return <tr key={key}>{renderChildren()}</tr>;
		case 'text': return <Text key={key} disableAutoLink={disableAutoLink} format={node.format} style={node.style} text={node.text} />;
		case 'upload': return renderUpload(node, key);
		default: return children.length > 0 ? renderChildren() : (node.text ?? null);
	}

	//
}

/* * */
