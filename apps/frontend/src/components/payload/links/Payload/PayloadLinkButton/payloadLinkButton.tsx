'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/components/payload/links/types';
import type { CSSProperties } from 'react';

import { PayloadLinkRender, usePayloadLexicalLink } from '@/components/payload/links/Payload/PayloadLink/payloadLink';

import styles from './styles.module.css';

/* * */

export function PayloadLinkButton(props: PayloadLexicalLinkProps) {
	//

	//
	// A. Setup variables

	const type = usePayloadLexicalLink(props);

	//
	// B. Trasnform Data

	const buttonStyleFromFields = (fields: PayloadLexicalLinkProps['fields']): CSSProperties | undefined => {
		const bg = fields?.buttonColor?.trim();
		const fg = fields?.buttonTextColor?.trim();
		const next: CSSProperties = { ...(bg ? { backgroundColor: bg } : {}), ...(fg ? { color: fg } : {}) };
		return Object.keys(next).length ? next : undefined;
	};

	const style = buttonStyleFromFields(props.fields);

	//
	// C. Render components

	return <PayloadLinkRender className={styles.linkButton} style={style} type={type} />;

	//
}
