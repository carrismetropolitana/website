/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug: identifier } = await params;
	if (!identifier) return Response.json({ error: 'News ID or slug required' }, { status: 400 });

	const payload = await getPayload({ config: payloadConfig });

	let doc = null;

	try {
		doc = await payload.findByID({
			collection: 'news',
			depth: 2,
			draft: false,
			id: identifier,
		});
	}
	catch {
		const result = await payload.find({
			collection: 'news',
			depth: 2,
			limit: 1,
			where: {
				and: [
					{ slug: { equals: identifier } },
					{ _status: { equals: 'published' } },
				],
			},
		});
		doc = result.docs[0] ?? null;
	}

	if (!doc) return Response.json({ error: 'Not found' }, { status: 404 });

	return Response.json(doc, {
		headers: getPublicHeaders(60),
	});
};
