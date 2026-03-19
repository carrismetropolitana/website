'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/payload/accordion';
import { Code } from '@/components/payload/code';
import { Gallery } from '@/components/payload/gallery';
import { Heading } from '@/components/payload/heading';
import { LineMention } from '@/components/payload/line-mention';
import { Links } from '@/components/payload/links';
import { List } from '@/components/payload/lists';
import { ListItem } from '@/components/payload/lists/listItem';
import { Paragraph } from '@/components/payload/paragraph';
import { Quote } from '@/components/payload/quote';
import { Spacer } from '@/components/payload/spacer';
import { Surface } from '@/components/payload/surface';
import { Table } from '@/components/payload/table';
import { TableCell } from '@/components/payload/table/table-cell';
import { Text } from '@/components/payload/text';
import { ThreeColumnsText } from '@/components/payload/ThreeColumnsText';
import { TwoColumnsText } from '@/components/payload/TwoColumnsText';
import { TwoColumnsTextImage } from '@/components/payload/TwoColumnsTextImage';
import { renderUpload } from '@/components/payload/upload';
import { Video } from '@/components/payload/video';
import { LexicalNode } from '@/types/lexical-node.types';
import { type ReactNode } from 'react';

/* * */

// Custom Block Renderer

function renderBlock(node: LexicalNode, key?: number): ReactNode {
	switch (node.fields?.blockType) {
		case 'accordion': {
			const items = Array.isArray(node.fields?.accordion) ? node.fields?.accordion.map(item => ({ content: item.content ?? '', id: item.id ?? '', title: item.title ?? '' })) : [];
			return items.length ? <Accordion key={key} items={items} /> : null;
		}
		case 'gallery': return <Gallery key={key} fields={node.fields} />;
		case 'link': return <Links key={key} fields={node.fields} />;
		case 'section': {
			const f = node.fields as { content?: unknown, withBottomDivider?: boolean, withGap?: boolean, withPadding?: 'all' | 'desktop' | 'mobile' | 'none' };
			const contentRoot = getLexicalRoot(f?.content);
			const withPadding = f?.withPadding === 'all' ? true : (f?.withPadding === 'none' ? undefined : f?.withPadding);
			return (
				<Section
					key={key}
					withBottomDivider={f?.withBottomDivider}
					withGap={f?.withGap}
					withPadding={withPadding}
				>
					{contentRoot ? renderNode(contentRoot) : null}
				</Section>
			);
		}
		case 'spacer': {
			const f = node.fields as { height?: number };
			return <Spacer key={key} height={f?.height} />;
		}
		case 'surface': {
			const f = node.fields as {
				backgroundImage?: unknown
				backgroundOverlay?: boolean
				content?: unknown
				forceOverflow?: boolean
				fullHeight?: boolean
				hasBackgroundImage?: boolean
				variant?: 'alerts' | 'brand2' | 'brand' | 'debug' | 'default' | 'muted' | 'persistent' | 'standout' | 'success' | 'warning'
			};
			const contentRoot = getLexicalRoot(f?.content);
			const backgroundImageUrl = getRelationshipImageUrl(f?.backgroundImage);
			return (
				<Surface
					key={key}
					backgroundImageUrl={f?.hasBackgroundImage ? backgroundImageUrl : undefined}
					backgroundOverlay={f?.backgroundOverlay}
					forceOverflow={f?.forceOverflow}
					fullHeight={f?.fullHeight}
					variant={f?.variant}
				>
					{contentRoot ? renderNode(contentRoot) : null}
				</Surface>
			);
		}
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

// Standard Lexical Node renderer

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
		case 'mention': return node.mentionType === 'line' ? <LineMention key={key} id={node.id} label={node.label} mentionType={node.mentionType} /> : null;
		case 'paragraph': return <Paragraph key={key} children={children} style={node.style} />;
		case 'quote': return <Quote key={key} children={children} />;
		case 'root': return renderChildren();
		case 'table': return <Table key={key} children={children} />;
		case 'tablecell': return <TableCell key={key} backgroundColor={(node as { backgroundColor?: string }).backgroundColor} children={children} headerState={(node as { headerState?: number }).headerState} />;
		case 'tablerow': return <tr key={key}>{renderChildren()}</tr>;
		case 'text': return <Text key={key} format={node.format} style={node.style} text={node.text} />;
		case 'upload': return renderUpload(node, key);
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

function getRelationshipImageUrl(value: unknown): string | undefined {
	if (!value || typeof value !== 'object') return undefined;

	const v = value as {
		file?: { url?: string }
		url?: string
		value?: {
			file?: { url?: string }
			url?: string
		}
	};

	return v.url ?? v.value?.url ?? v.file?.url ?? v.value?.file?.url;
}

/* * */

export function useRenderLexicalNode() {
	return renderNode;
}

/* * */
