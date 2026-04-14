/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { searchParams } = new URL(request.url);
	const rawLocale = searchParams.get('locale');
	const rawFallbackLocale = searchParams.get('fallback-locale');
	const requestedLocale = rawLocale === 'en' || rawLocale === 'pt-PT' ? rawLocale : undefined;
	const requestedFallbackLocale = rawFallbackLocale === 'none' || rawFallbackLocale === 'false' ? false : (rawFallbackLocale === 'en' || rawFallbackLocale === 'pt-PT' ? rawFallbackLocale : undefined);
	const { slug: identifier } = await params;

	if (!identifier) {
		return Response.json({ error: 'Project ID or slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const result = await payload.find({
		collection: 'projects',
		depth: 2,
		draft: false,
		fallbackLocale: requestedFallbackLocale,
		limit: 1,
		locale: requestedLocale,
		where: {
			_status: { equals: 'published' },
			or: [
				{ id: { equals: identifier } },
				{ slug: { equals: identifier } },
			],
		},
	});

	const doc = result.docs[0];
	if (!doc) {
		return Response.json({ error: 'Not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	return Response.json(doc, {
		headers: getPublicHeaders(60),
	});
};
