'use client';
/* * */

import type { PayloadLexicalLinkProps } from '@/types/link.types';
import type { ReactNode } from 'react';

import { CustomLinkRender } from '@/components/payload/links/CustomLink/CustomLinkRender';
import { useCustomLink } from '@/hooks/useCustomLink';

import styles from './styles.module.css';

/* * */

export interface CustomLink {
	content: ReactNode
	href: string
	isExternal: boolean
	rel: string | undefined
	target: string | undefined
}

/* * */

export function CustomLink(props: PayloadLexicalLinkProps) {
	//

	//
	// A. Setup variables

	const model = useCustomLink(props);

	//
	// B. Render components

	if (!model) return null;

	return <CustomLinkRender className={styles.link} model={model} />;

	//
}
