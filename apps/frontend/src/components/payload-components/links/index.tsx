'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import Link from 'next/link';

/* * */

interface LinkProps {
	children?: LexicalNode[]
	fields?: {
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		linkType?: string
		newTab?: boolean
		text?: string
		url?: string
	}
	url?: string
}

/* * */

export function Links({ children = [], fields, url = '' }: LinkProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const linkType = fields?.linkType || 'custom';
	const newTab = fields?.newTab || false;
	const linkRel = newTab ? 'noreferrer noopener' : undefined;
	const linkTarget = newTab ? '_blank' : undefined;

	// Determine the href - supports both inline links and block links
	let href = url || fields?.url || '';
	if (linkType === 'internal' && fields?.doc) {
		const relationTo = fields.doc.relationTo;
		const slug = fields.doc.value?.slug;
		if (relationTo && slug) {
			href = `/${relationTo}/${slug}`;
		}
	}

	if (!href || href.trim() === '') {
		return null;
	}

	// Determine the link text/content
	// For block links: use fields.text or fallback to href
	// For inline links: render children
	const isBlockLink = fields?.text !== undefined || (fields?.url && children.length === 0);
	const linkContent = isBlockLink
		? (fields?.text || href)
		: children.map((child, idx) => renderLexicalNode(child, idx));

	// Check if it's an external URL
	const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');

	//
	// B. Render components

	// For block links, wrap in a div with margin
	const linkElement = isExternal ? (
		<a
			href={href}
			rel={linkRel}
			target={linkTarget}
			style={{
				color: '#0066cc',
				textDecoration: 'underline',
			}}
		>
			{linkContent}
		</a>
	) : (
		<Link
			href={href}
			rel={linkRel}
			target={linkTarget}
			style={isBlockLink ? {
				color: '#0066cc',
				textDecoration: 'underline',
			} : undefined}
		>
			{linkContent}
		</Link>
	);

	if (isBlockLink) {
		return (
			<div style={{ margin: '1rem 0' }}>
				{linkElement}
			</div>
		);
	}

	return linkElement;

	//
}
