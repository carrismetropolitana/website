/* * */

import type { LexicalRichText } from './lexical-node.types';

/* * */

/** Payload accordion array item (matches backoffice accordion field) */
export interface AccordionItem {
	content: LexicalRichText | string
	id: string
	title: string
}

/** Payload accordion field value (array of items) */
export type AccordionData = AccordionItem[];
