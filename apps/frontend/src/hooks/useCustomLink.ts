'use client';
/* * */

import type { CustomLink } from '@/components/payload/links/CustomLink';
import type { PayloadLexicalLinkProps } from '@/types/link.types';

import { useRenderLexicalNode } from '@/components/payload/lexical-renderer';

/* * */

export function useCustomLink({ children = [], disableChildAutoLink = false, fields, url = '' }: PayloadLexicalLinkProps): CustomLink {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	const href = fields?.linkType === 'internal' && fields?.doc?.relationTo && fields?.doc?.value?.slug ? `/${fields.doc.relationTo}/${fields.doc.value.slug}` : (url || fields?.url || '').trim();
	const hasChildren = children.length > 0;
	const content = hasChildren ? children.map((child, idx) => renderLexicalNode(child, idx, { disableAutoLink: disableChildAutoLink })) : (fields?.text || href);
	const isWebExternal = /^https?:\/\//i.test(href) || href.startsWith('//');
	const isProtocolLink = /^(mailto:|tel:)/i.test(href);
	const isExternal = isWebExternal || isProtocolLink;
	const openInNewTab = Boolean(fields?.newTab) && !isProtocolLink;
	const target = openInNewTab ? '_blank' : undefined;
	const rel = openInNewTab ? 'noreferrer noopener' : undefined;

	//
	// B. Return Link

	return { content, href, isExternal, rel, target };

	//
}
