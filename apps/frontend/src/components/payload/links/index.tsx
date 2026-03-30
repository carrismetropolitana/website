'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';

import { CustomLink } from '@/components/payload/links/CustomLink';
import { LinkButton } from '@/components/payload/links/LinkButton';

/* * */

export function Links(props: PayloadLexicalLinkProps) {
	return props.fields?.isButton ? <LinkButton {...props} /> : <CustomLink {...props} />;
}
