'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';

import { PayloadLink } from '@/components/payload/links/Payload/PayloadLink/payloadLink';
import { PayloadLinkButton } from '@/components/payload/links/Payload/PayloadLinkButton/payloadLinkButton';

/* * */

export function Links(props: PayloadLexicalLinkProps) {
	return props.fields?.isButton ? <PayloadLinkButton {...props} /> : <PayloadLink {...props} />;
}
