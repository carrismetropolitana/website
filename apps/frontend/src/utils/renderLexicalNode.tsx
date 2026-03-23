'use client';
/* * */

import type { LexicalNode } from '@/types/lexical-node.types';
import type { PayloadLexicalLink } from '@/types/link.types';
import type { ReactNode } from 'react';

import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/payload/accordion';
import { Card } from '@/components/payload/card';
import { Code } from '@/components/payload/code';
import { Gallery } from '@/components/payload/gallery';
import { Heading } from '@/components/payload/heading';
import { LineMention } from '@/components/payload/line-mention';
import { Links } from '@/components/payload/links';
import { List } from '@/components/payload/lists';
import { ListItem } from '@/components/payload/lists/listItem';
import { NotImplemented } from '@/components/payload/NotImplemented';
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
/* * */

// Custom Block Renderer

function renderBlock(node: LexicalNode, key?: number): ReactNode {
	const blockSlug = node.fields?.blockType ?? node.fields?.blockName;

	switch (blockSlug) {
		case 'accordion': {
			const items = Array.isArray(node.fields?.accordion) ? node.fields?.accordion.map(item => ({ content: item.content ?? '', id: item.id ?? '', title: item.title ?? '' })) : [];
			return items.length ? <Accordion key={key} items={items} /> : null;
		}
		case 'card': {
			return (
				<Card key={key} borderColor={node.fields?.borderColor} cards={node.fields?.cards} primaryColor={node.fields?.primaryColor} textColor={node.fields?.textColor} />
			);
		}
		case 'gallery': return <Gallery key={key} fields={node.fields} />;
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

			return <Links key={key} fields={linkFields} />;
		}
		case 'section': {
			const contentRoot = getLexicalRoot(node.fields?.content);
			const withPadding = node.fields?.withPadding === 'all' ? true : (node.fields?.withPadding === 'none' ? undefined : node.fields?.withPadding);
			return (
				<Section key={key} withBottomDivider={node.fields?.withBottomDivider} withGap={node.fields?.withGap} withPadding={withPadding}>
					{contentRoot ? renderNode(contentRoot) : null}
				</Section>
			);
		}
		case 'spacer': return <Spacer key={key} height={node.fields?.height} />;
		case 'surface': {
			const contentRoot = getLexicalRoot(node.fields?.content);
			const backgroundImageUrl = getRelationshipImageUrl(node.fields?.backgroundImage);
			return (
				<Surface
					key={key}
					backgroundImageUrl={node.fields?.hasBackgroundImage ? backgroundImageUrl : undefined}
					backgroundOverlay={node.fields?.backgroundOverlay}
					forceOverflow={node.fields?.forceOverflow}
					fullHeight={node.fields?.fullHeight}
					variant={node.fields?.variant}
				>
					{contentRoot ? renderNode(contentRoot) : null}
				</Surface>
			);
		}
		case 'three-columns-text': return <ThreeColumnsText key={key} centerColumn={node.fields?.centerColumn} leftColumn={node.fields?.leftColumn} rightColumn={node.fields?.rightColumn} />;
		case 'two-columns-text': return <TwoColumnsText key={key} leftColumn={node.fields?.leftColumn} rightColumn={node.fields?.rightColumn} />;
		case 'two-columns-text-image': return <TwoColumnsTextImage key={key} image={node.fields?.image} imagePosition={node.fields?.imagePosition} text={node.fields?.text} />;
		case 'video': return <Video key={key} fields={node.fields} />;
		default: return <NotImplemented key={key} blockSlug={blockSlug} />;
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

			return <Links key={key} children={children} fields={linkFields} url={node.url} />;
		}
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
