/* * */

import { fetchFaqs } from '@/actions/faq.actions';

/* * */

export async function GET() {
	return Response.json(await fetchFaqs());
}
