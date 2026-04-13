/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug: identifier } = await params;
	if (!identifier) {
		return Response.json({ error: 'Project ID or slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const result = await payload.find({
		collection: 'projects',
		depth: 2,
		limit: 1,
		where: {
			or: [
				{ id: { equals: identifier } },
				{ slug: { equals: identifier } },
			],
		},
	});

	const doc = result.docs[0];
	if (!doc) {
		return Response.json({ error: 'Not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	return Response.json(doc, {
		headers: getPublicHeaders(60),
	});
};
