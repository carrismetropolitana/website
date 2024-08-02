/* * */

export interface Faq {
	_id: string
	body: string
	title: string
}

/* * */

export interface FaqGroupByTopic {
	_id: string
	items: Faq[]
	title: string
}
