'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import Link from 'next/link';

import styles from './styles.module.css';

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

	//
	// B. Resolve href

	let href = url || fields?.url || '';

	if (fields?.linkType === 'internal' && fields?.doc?.relationTo && fields?.doc?.value?.slug) {
		href = `/${fields.doc.relationTo}/${fields.doc.value.slug}`;
	}

	if (!href.trim()) return null;

	//
	// C. Resolve content and target

	const content = children.length > 0
		? children.map((child, idx) => renderLexicalNode(child, idx))
		: fields?.text || href;

	const isExternal = href.startsWith('http') || href.startsWith('//');
	const target = fields?.newTab ? '_blank' : undefined;
	const rel = fields?.newTab ? 'noreferrer noopener' : undefined;

	//
	// D. Render components

	if (isExternal) {
		return (
			<a className={styles.link} href={href} rel={rel} target={target}>
				{content}
			</a>
		);
	}

	return (
		<Link className={styles.link} href={href} rel={rel} target={target}>
			{content}
		</Link>
	);

	//
}
