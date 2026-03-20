/* * */

import type { LexicalNode } from '@/types/lexical-node.types';

/* * */

export interface PayloadLexicalLinkFields {
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
	fields?: PayloadLexicalLinkFields
	url?: string
}
