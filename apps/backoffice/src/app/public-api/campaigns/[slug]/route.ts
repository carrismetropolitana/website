/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { searchParams } = new URL(request.url);
	const isDraftPreview = searchParams.get('draft') === 'true';
	const { slug: identifier } = await params;
	if (!identifier) {
		return Response.json({ error: 'Campaign ID or slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const result = await payload.find({
		collection: 'campaigns',
		depth: 2,
		draft: isDraftPreview,
		limit: 1,
		where: {
			...(isDraftPreview
				? {
					or: [
						{ id: { equals: identifier } },
						{ slug: { equals: identifier } },
					],
				}
				: {
					and: [
						{
							or: [
								{ id: { equals: identifier } },
								{ slug: { equals: identifier } },
							],
						},
						{ _status: { equals: 'published' } },
					],
				}),
		},
	});

	const doc = result.docs[0];
	if (!doc) {
		return Response.json({ error: 'Not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	return Response.json(doc, {
		headers: getPublicHeaders(isDraftPreview ? null : 60),
	});
};
