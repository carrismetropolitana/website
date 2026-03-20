'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

function hexToCssColor(raw: string | undefined): string | undefined {
	if (!raw) return undefined;
	const v = raw.trim();
	if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v)) return undefined;
	if (/^#[0-9A-Fa-f]{3}$/.test(v)) {
		const [, r, g, b] = v;
		return `#${r}${r}${g}${g}${b}${b}`;
	}
	return v;
}

interface LinkProps {
	children?: LexicalNode[]
	fields?: {
		buttonColor?: string
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		isButton?: boolean
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

	const className = classNames(styles.link, {
		[styles.linkButton]: fields?.isButton,
	});

	const buttonBackground = fields?.isButton ? hexToCssColor(fields?.buttonColor) : undefined;
	const inlineStyle = buttonBackground ? { backgroundColor: buttonBackground } : undefined;

	//
	// D. Render components

	if (isExternal) {
		return (
			<a className={className} href={href} rel={rel} style={inlineStyle} target={target}>
				{content}
			</a>
		);
	}

	return (
		<Link className={className} href={href} rel={rel} style={inlineStyle} target={target}>
			{content}
		</Link>
	);

	//
}
