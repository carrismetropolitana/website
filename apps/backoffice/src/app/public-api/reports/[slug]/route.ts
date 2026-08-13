/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) {
		return Response.json({ error: 'Report slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const foundReports = await payload.find({
		collection: 'reports',
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

	if (!foundReports.docs.length) {
		return Response.json({ error: 'Report not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const report = foundReports.docs[0];

	return Response.json(report, {
		headers: getPublicHeaders(3600),
	});
};
