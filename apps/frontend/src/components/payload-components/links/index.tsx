'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import Link from 'next/link';
import { useMemo } from 'react';

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
	// A. Compute href early and validate

	const href = useMemo(() => {
		let computedHref = url || fields?.url || '';

		if (fields?.linkType === 'internal' && fields?.doc) {
			const relationTo = fields.doc.relationTo;
			const slug = fields.doc.value?.slug;
			if (relationTo && slug) {
				computedHref = `/${relationTo}/${slug}`;
			}
		}

		return computedHref.trim() || null;
	}, [url, fields?.url, fields?.linkType, fields?.doc?.relationTo, fields?.doc?.value?.slug]);

	if (!href) {
		return null;
	}

	//
	// B. Setup variables

	const newTab = fields?.newTab ?? false;
	const isBlockLink = fields?.text !== undefined || (fields?.url && children.length === 0);
	const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');

	const linkContent = useMemo(() => {
		if (isBlockLink) {
			return fields?.text || href;
		}
		return children.map((child, idx) => renderLexicalNode(child, idx));
	}, [isBlockLink, fields?.text, href, children, renderLexicalNode]);

	const linkProps = useMemo(() => ({
		rel: newTab ? ('noreferrer noopener' as const) : undefined,
		target: newTab ? ('_blank' as const) : undefined,
	}), [newTab]);

	//
	// C. Render components

	const linkElement = isExternal ? (
		<a href={href} {...linkProps} className={styles.linkStyle}>
			{linkContent}
		</a>
	) : (
		<Link href={href} {...linkProps} className={isBlockLink ? styles.linkStyle : undefined}>
			{linkContent}
		</Link>
	);

	if (isBlockLink) {
		return (
			<div className={styles.blockWrapperStyle}>
				{linkElement}
			</div>
		);
	}

	return linkElement;

	//
}
