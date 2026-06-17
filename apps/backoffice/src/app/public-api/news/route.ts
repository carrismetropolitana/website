/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });

	const result = await payload.find({
		collection: 'news',
		depth: 2,
		draft: false,
		limit: 0,
		sort: '-publishedAt',
		where: {
			_status: { equals: 'published' },
			or: [
				{ is_unlisted: { equals: false } },
				{ is_unlisted: { equals: undefined } },
			],
		},
	});

	const docs = result.docs ?? [];
	return Response.json(docs, {
		headers: getPublicHeaders(180),
	});
};
