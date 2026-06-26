/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) {
		return Response.json({ error: 'Video slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const foundVideos = await payload.find({
		collection: 'videos',
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

	if (!foundVideos.docs.length) {
		return Response.json({ error: 'Video not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const video = foundVideos.docs[0];

	return Response.json(video, {
		headers: getPublicHeaders(3600),
	});
};
