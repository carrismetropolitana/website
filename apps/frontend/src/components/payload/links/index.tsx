'use client';
/* * */

import { LexicalNode } from '@/types/lexical-node.types';
import { useRenderLexicalNode } from '@/utils/renderLexicalNode';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface LinkProps {
	children?: LexicalNode[]
	fields?: {
		buttonColor?: string
		doc?: {
			relationTo?: string
			value?: {
				slug?: string
			}
		}
		isButton?: boolean
		linkType?: string
		newTab?: boolean
		text?: string
		url?: string
	}
	url?: string
}

export function Links({ children = [], fields, url = '' }: LinkProps) {
	//

	//
	// A. Setup variables

	const renderLexicalNode = useRenderLexicalNode();
	const href = fields?.linkType === 'internal' && fields?.doc?.relationTo && fields?.doc?.value?.slug ? `/${fields.doc.relationTo}/${fields.doc.value.slug}` : (url || fields?.url || '');
	const content = children.length > 0 ? children.map((child, idx) => renderLexicalNode(child, idx)) : fields?.text || href;
	const isExternal = href.startsWith('http') || href.startsWith('//');
	const target = fields?.newTab ? '_blank' : undefined;
	const rel = fields?.newTab ? 'noreferrer noopener' : undefined;
	const className = classNames(styles.link, { [styles.linkButton]: fields?.isButton });
	const style = fields?.isButton && fields?.buttonColor ? { backgroundColor: fields?.buttonColor } : undefined;
	const shared = { className, href, rel, style, target };

	//
	// B. Render components

	return isExternal ? <a {...shared}>{content}</a> : <Link {...shared}>{content}</Link>;

	//
}
