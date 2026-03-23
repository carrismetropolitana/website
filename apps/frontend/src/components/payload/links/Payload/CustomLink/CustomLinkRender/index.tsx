'use client';

import type { CustomLink } from '@/components/payload/links/Payload/CustomLink';
import type { CSSProperties } from 'react';

import { Link } from '@/components/common/Link/';

/* * */

interface CustomLinkRenderProps {
	className: string
	model: CustomLink
	style?: CSSProperties
}

/* * */

export function CustomLinkRender({ className, model, style }: CustomLinkRenderProps) {
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
