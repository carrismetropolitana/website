/* * */

import type { LexicalNode } from '@/types/lexical-node.types';

/* * */

export interface PayloadLexicalLink {
	buttonColor?: string
	buttonTextColor?: string
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

export interface PayloadLexicalLinkProps {
	children?: LexicalNode[]
	disableChildAutoLink?: boolean
	fields?: PayloadLexicalLink
	url?: string
}
