/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) {
		return Response.json({ error: 'Article slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const foundArticles = await payload.find({
		collection: 'articles',
		depth: 2,
		draft: false,
		limit: 1,
		where: {
			and: [
				{ slug: { equals: slug } },
				{ status: { equals: 'published' } },
			],
		},
	});

	if (!foundArticles.docs.length) {
		return Response.json({ error: 'Article not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const article = foundArticles.docs[0];

	return Response.json(article, {
		headers: getPublicHeaders(3600),
	});
};
