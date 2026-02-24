/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });

	const foundCampaigns = await payload.find({
		collection: 'campaigns',
		depth: 2,
		draft: false,
		limit: 0,
		sort: '-updatedAt',
		where: {
			status: { equals: 'published' },
		},
	});

	return Response.json(foundCampaigns.docs, {
		headers: getPublicHeaders(60),
	});
};
