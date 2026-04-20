/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) {
		return Response.json({ error: 'Interview slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const foundInterviews = await payload.find({
		collection: 'interviews',
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

	if (!foundInterviews.docs.length) {
		return Response.json({ error: 'Interview not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const interview = foundInterviews.docs[0];

	return Response.json(interview, {
		headers: getPublicHeaders(3600),
	});
};
