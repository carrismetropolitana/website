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
import { Text } from '@/components/payload/text';
import { Video } from '@/components/payload/video';
import { LexicalNode } from '@/types/lexical-node.types';
import { type ReactNode } from 'react';

/* * */

function renderBlock(node: LexicalNode, key?: number): ReactNode {
	switch (node.fields?.blockType) {
		case 'accordion': {
			const items = (node.fields.accordion ?? []).map(item => ({
				content: item.content ?? '',
				id: item.id ?? '',
				title: item.title ?? '',
			}));
			return items.length ? <Accordion key={key} items={items} /> : null;
		}
		case 'gallery': return <Gallery key={key} fields={node.fields} />;
		case 'link': return <Links key={key} fields={node.fields} />;
		case 'video': return <Video key={key} fields={node.fields} />;
		default: return null;
	}
}

/* * */

function renderNode(node: LexicalNode, key?: number): ReactNode {
	if (!node || typeof node !== 'object') return null;

	const children = node.children ?? [];
	const renderChildren = () => children.map((child, idx) => renderNode(child, idx));

	switch (node.type) {
		case 'block': return renderBlock(node, key);
		case 'code': return <Code key={key} children={children} />;
		case 'heading': return <Heading key={key} children={children} tag={node.tag} />;
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
		case 'text': return <Text key={key} format={node.format} style={node.style} text={node.text} />;
		case 'upload': {
			const img = node.value as { filename?: string, height?: number, url?: string, width?: number };
			return <ImageComponent key={key} alt={img.filename} height={img.height} src={img.url} width={img.width} />;
		}
		default: return children.length > 0 ? renderChildren() : (node.text ?? null);
	}
}

/* * */

export function useRenderLexicalNode() {
	return renderNode;
}
