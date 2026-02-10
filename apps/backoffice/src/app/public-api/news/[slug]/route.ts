/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug: id } = await params;
	if (!id) return Response.json({ error: 'News ID required' }, { status: 400 });

	const payload = await getPayload({ config: payloadConfig });

	const doc = await payload.findByID({
		collection: 'news',
		depth: 2,
		draft: false,
		id,
	});

	if (!doc) return Response.json({ error: 'Not found' }, { status: 404 });

	return Response.json(doc, {
		headers: getPublicHeaders(60),
	});
};
