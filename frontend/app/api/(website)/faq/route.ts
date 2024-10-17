/* * */

import type { FaqGroupByTopic } from '@/types/faq.types';

/* * */

export async function GET() {
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
	return Response.json(faqs);
}
