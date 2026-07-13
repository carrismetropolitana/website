import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });

	const foundSpecialSeries = await payload.find({
		collection: 'special-series',
		depth: 0,
		limit: 100,
		sort: 'title',
	});

	return Response.json(foundSpecialSeries, {
		headers: getPublicHeaders(300),
	});
};
