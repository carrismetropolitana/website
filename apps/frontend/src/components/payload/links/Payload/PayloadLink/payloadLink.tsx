'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';
import type { CSSProperties, ReactNode } from 'react';

import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export interface PayloadLink {
	content: ReactNode
	href: string
	isExternal: boolean
	rel: string | undefined
	target: string | undefined
}

interface PayloadLinkRenderProps {
	className: string
	model: PayloadLink
	style?: CSSProperties
}

/* * */

export function usePayloadLexicalLink({ children = [], fields, url = '' }: PayloadLexicalLinkProps): null | PayloadLink {
	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	const href = fields?.linkType === 'internal' && fields?.doc?.relationTo && fields?.doc?.value?.slug ? `/${fields.doc.relationTo}/${fields.doc.value.slug}` : (url || fields?.url || '');
	const content = children.length > 0 ? children.map((child, idx) => renderLexicalNode(child, idx)) : fields?.text || href;
	const isExternal = href.startsWith('http') || href.startsWith('//');
	const target = fields?.newTab ? '_blank' : undefined;
	const rel = fields?.newTab ? 'noreferrer noopener' : undefined;

	//
	// B. Return data

	return { content, href, isExternal, rel, target };

	//
}

export function PayloadLinkRender({ className, model, style }: PayloadLinkRenderProps) {
	//

	//
	// A. Setup variables

	const { content, href, isExternal, rel, target } = model;
	const shared = { className, href, rel, style, target };

	//
	// B. Render components

	return isExternal ? <a {...shared}>{content}</a> : <Link {...shared}>{content}</Link>;

	//
}

export function PayloadLink(props: PayloadLexicalLinkProps) {
	//

	//
	// A. Setup variables

	const model = usePayloadLexicalLink(props);

	//
	// B. Render components

	if (!model) return null;

	return <PayloadLinkRender className={styles.link} model={model} />;

	//
}
