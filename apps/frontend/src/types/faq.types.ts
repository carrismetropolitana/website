/* * */

import { LexicalRichText } from './lexical-node.types';

export interface Faq {
	_id: string
	answer: LexicalRichText
	question: string
	topic: null | Topic
}

export interface FaqTopicGroup {
	faqs: Faq[]
	topic: null | Topic
	topicId: string
}

/* * */

export interface Topic {
	createdAt: string
	description?: string
	id: string
	title: string
	updatedAt: string
}
