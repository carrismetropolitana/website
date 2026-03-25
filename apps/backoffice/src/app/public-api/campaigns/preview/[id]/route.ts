/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	if (!id) {
		return Response.json({ error: 'Campaign ID required for preview' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const doc = await payload.findByID({
		collection: 'campaigns',
		depth: 2,
		draft: true,
		id,
	});

	if (!doc) {
		return Response.json({ error: 'Campaign not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	return Response.json(doc, {
		headers: getPublicHeaders(3600),
	});
};
