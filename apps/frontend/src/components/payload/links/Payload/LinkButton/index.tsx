'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';
import type { CSSProperties } from 'react';

import { CustomLinkRender } from '@/components/payload/links/Payload/CustomLink/CustomLinkRender';
import { useCustomLink } from '@/hooks/useCustomLink';

import styles from './styles.module.css';

/* * */

function buttonStyleFromFields(fields: PayloadLexicalLinkProps['fields']): CSSProperties | undefined {
	const bg = fields?.buttonColor?.trim();
	const fg = fields?.buttonTextColor?.trim();
	const next: CSSProperties = {
		...(bg ? { backgroundColor: bg } : {}),
		...(fg ? { color: fg } : {}),
	};
	return Object.keys(next).length ? next : undefined;
}

export function LinkButton(props: PayloadLexicalLinkProps) {
	const model = useCustomLink(props);
	if (!model) return null;

	const style = buttonStyleFromFields(props.fields);

	return <CustomLinkRender className={styles.linkButton} model={model} style={style} />;
}
