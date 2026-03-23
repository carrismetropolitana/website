'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';

import { CustomLink } from '@/components/payload/links/CustomLink';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';

/* * */

export function useCustomLink({ children = [], fields, url = '' }: PayloadLexicalLinkProps): CustomLink {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();

	const href = fields?.linkType === 'internal' && fields?.doc?.relationTo && fields?.doc?.value?.slug ? `/${fields.doc.relationTo}/${fields.doc.value.slug}` : (url || fields?.url || '');
	const content = children.length > 0 ? children.map((child, idx) => renderLexicalNode(child, idx)) : fields?.text || href;
	const isExternal = href.startsWith('http') || href.startsWith('//');
	const target = fields?.newTab ? '_blank' : undefined;
	const rel = fields?.newTab ? 'noreferrer noopener' : undefined;

	//
	// B. Return Link

	return { content, href, isExternal, rel, target };

	//
}
