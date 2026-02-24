/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) return Response.json({ error: 'Campaign slug required' }, { status: 400 });

	const payload = await getPayload({ config: payloadConfig });

	const foundCampaigns = await payload.find({
		collection: 'campaigns',
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

	if (!foundCampaigns.docs.length) {
		return Response.json({ error: 'Campaign not found' }, { status: 404 });
	}

	const campaign = foundCampaigns.docs[0];

	return Response.json(campaign, {
		headers: getPublicHeaders(3600),
	});
};
