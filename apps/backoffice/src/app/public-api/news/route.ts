/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload, type Where } from 'payload';

/* * */

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const specialSeries = searchParams.get('special-series');
	const partnership = searchParams.get('partnership');

	const payload = await getPayload({ config: payloadConfig });

	const whereClause: Where = {
		_status: { equals: 'published' },
		...(type && { type: { in: type } }),
		...(specialSeries && { specialSeries: { equals: specialSeries } }),
		...(partnership && { partnership: { equals: partnership } }),
		or: [
			{ is_unlisted: { equals: false } },
			{ is_unlisted: { equals: undefined } },
		],
	};

	const result = await payload.find({
		collection: 'news',
		depth: 2,
		draft: false,
		limit: 0,
		sort: '-publishedAt',
		where: whereClause,
	});

	const docs = result.docs ?? [];
	return Response.json(docs, {
		headers: getPublicHeaders(180),
	});
};
