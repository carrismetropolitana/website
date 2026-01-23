'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import Link from 'next/link';

/* * */

interface LinkProps {
	children: LexicalNode[]
	fields?: {
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		linkType?: string
		newTab?: boolean
	}
	url?: string
}

/* * */

export function Links({ children, fields, url = '' }: LinkProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const linkType = fields?.linkType || 'custom';
	const newTab = fields?.newTab || false;

	let href = url;
	if (linkType === 'internal' && fields?.doc) {
		const relationTo = fields.doc.relationTo;
		const slug = fields.doc.value?.slug;
		if (relationTo && slug) {
			href = `/${relationTo}/${slug}`;
		}
	}

	//
	// B. Render components

	return (
		<Link
			href={href}
			rel={newTab ? 'noreferrer noopener' : undefined}
			target={newTab ? '_blank' : undefined}
		>
			{children.map((child, idx) => renderLexicalNode(child, idx))}
		</Link>
	);

	//
}
