'use server';

/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

/* * */

export async function fetchFaqs() {
	const faqs: FaqGroupByTopic[] = [
		{
			_id: 'A',
			items: [],
			title: 'Carris Metropolitana',
		},
		{
			_id: 'B',
			items: [],
			title: 'Operação',
		},
	];
	return faqs;
}
