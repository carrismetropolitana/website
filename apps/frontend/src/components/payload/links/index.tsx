'use client';
/* * */

import { PayloadLink } from '@/components/payload/links/Payload/PayloadLink/payloadLink';
import { PayloadLinkButton } from '@/components/payload/links/Payload/PayloadLinkButton/payloadLinkButton';

/* * */

import type { PayloadLexicalLinkProps } from '@/components/payload/links/types';

/* * */

export function Links(props: PayloadLexicalLinkProps) {
	return props.fields?.isButton ? <PayloadLinkButton {...props} /> : <PayloadLink {...props} />;
}
