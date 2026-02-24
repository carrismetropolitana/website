'use client';
/* * */

import { Accordion } from '@/components/payload/accordion';
import { Code } from '@/components/payload/code';
import { Gallery } from '@/components/payload/gallery';
import { Heading } from '@/components/payload/heading';
import { ImageComponent } from '@/components/payload/image';
import { LineMention } from '@/components/payload/line-mention';
import { Links } from '@/components/payload/links';
import { List } from '@/components/payload/lists';
import { ListItem } from '@/components/payload/lists/listItem';
import { Paragraph } from '@/components/payload/paragraph';
import { Quote } from '@/components/payload/quote';
import { Spacer } from '@/components/payload/spacer';
import { Table } from '@/components/payload/table';
import { TableCell } from '@/components/payload/table/table-cell';
import { Text } from '@/components/payload/text';
import { ThreeColumnsText } from '@/components/payload/ThreeColumnsText';
import { TwoColumnsText } from '@/components/payload/TwoColumnsText';
import { TwoColumnsTextImage } from '@/components/payload/TwoColumnsTextImage';
import { Video } from '@/components/payload/video';
import { LexicalNode } from '@/types/lexical-node.types';
import { type ReactNode } from 'react';

/* * */

// Custom Block Renderer

function renderBlock(node: LexicalNode, key?: number): ReactNode {
	switch (node.fields?.blockType) {
		case 'accordion': {
			const raw = node.fields?.accordion;
			const items = Array.isArray(raw) ? raw.map(item => ({ content: item.content ?? '', id: item.id ?? '', title: item.title ?? '' })) : [];
			return items.length ? <Accordion key={key} items={items} /> : null;
		}
		case 'gallery': return <Gallery key={key} fields={node.fields} />;
		case 'link': return <Links key={key} fields={node.fields} />;
		case 'spacer': return <Spacer key={key} height={node.fields?.height ?? 32} />;
		case 'three-columns-text': {
			const f = node.fields as { centerColumn?: unknown, leftColumn?: unknown, rightColumn?: unknown };
			return (
				<ThreeColumnsText
					key={key}
					centerColumn={f?.centerColumn}
					leftColumn={f?.leftColumn}
					rightColumn={f?.rightColumn}
				/>
			);
		}
		case 'two-columns-text': {
			const f = node.fields as { leftColumn?: unknown, rightColumn?: unknown };
			return (
				<TwoColumnsText
					key={key}
					leftColumn={f?.leftColumn}
					rightColumn={f?.rightColumn}
				/>
			);
		}
		case 'two-columns-text-image': {
			const f = node.fields as { image?: unknown, imagePosition?: 'left' | 'right', text?: unknown };
			return (
				<TwoColumnsTextImage
					key={key}
					image={f?.image}
					imagePosition={f?.imagePosition}
					text={f?.text}
				/>
			);
		}
		case 'video': return <Video key={key} fields={node.fields} />;
		default: return null;
	}
}

/* * */

// Standard Lexical Node Renderer

function renderNode(node: LexicalNode, key?: number): ReactNode {
	if (!node || typeof node !== 'object') return null;

	const children = node.children ?? [];
	const renderChildren = () => children.map((child, idx) => renderNode(child, idx));

	switch (node.type) {
		case 'block': return renderBlock(node, key);
		case 'code': return <Code key={key} children={children} />;
		case 'custom-heading':
		case 'heading': {
			const anchorId = (node as { anchorId?: string }).anchorId;
			return <Heading key={key} anchorId={anchorId} children={children} index={key} tag={node.tag as 'h2' | 'h3'} />;
		}
		case 'horizontalrule': return <hr key={key} />;
		case 'link': return <Links key={key} children={children} fields={node.fields} url={node.url} />;
		case 'list': return <List key={key} children={children} listType={node.listType} />;
		case 'listitem': return <ListItem key={key} children={children} />;
		case 'mention': return node.mentionType === 'line'
			? <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} />
			: null;
		case 'paragraph': return <Paragraph key={key} children={children} style={node.style} />;
		case 'quote': return <Quote key={key} children={children} />;
		case 'root': return renderChildren();
		case 'table': return <Table key={key} children={children} />;
		case 'tablecell': return <TableCell key={key} backgroundColor={(node as { backgroundColor?: string }).backgroundColor} children={children} headerState={(node as { headerState?: number }).headerState} />;
		case 'tablerow': return <tr key={key}>{renderChildren()}</tr>;
		case 'text': return <Text key={key} format={node.format} style={node.style} text={node.text} />;
		case 'upload': {
			const img = node.value as { filename?: string, url?: string };
			return <ImageComponent key={key} alt={img.filename} src={img.url} />;
		}
		default: return children.length > 0 ? renderChildren() : (node.text ?? null);
	}
}

/* * */

/**
 * Extract Lexical root node from various content formats (string, object with root, raw root).
 */
export function getLexicalRoot(content: unknown): LexicalNode | null {
	if (!content) return null;
	let json: unknown;
	try {
		json = typeof content === 'string' ? JSON.parse(content) : content;
	}
	catch {
		return null;
	}
	if (!json || typeof json !== 'object') return null;
	return (json as { root?: LexicalNode }).root ?? (json as LexicalNode);
}

/* * */

export function useRenderLexicalNode() {
	return renderNode;
}

/* * */
