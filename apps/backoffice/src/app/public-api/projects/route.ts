/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (request: Request) => {
	const payload = await getPayload({ config: payloadConfig });
	const { searchParams } = new URL(request.url);
	const rawLocale = searchParams.get('locale');
	const rawFallbackLocale = searchParams.get('fallback-locale');
	const requestedLocale = rawLocale === 'en' || rawLocale === 'pt-PT' ? rawLocale : undefined;
	const requestedFallbackLocale = rawFallbackLocale === 'none' || rawFallbackLocale === 'false' ? false : (rawFallbackLocale === 'en' || rawFallbackLocale === 'pt-PT' ? rawFallbackLocale : undefined);

	const result = await payload.find({
		collection: 'projects',
		depth: 2,
		draft: false,
		fallbackLocale: requestedFallbackLocale,
		limit: 0,
		locale: requestedLocale,
		sort: '_order',
		where: {
			_status: { equals: 'published' },
			or: [
				{ is_unlisted: { equals: false } },
				{ is_unlisted: { equals: undefined } },
			],
		},
	});

	const docs = result.docs ?? [];
	return Response.json(docs, {
		headers: getPublicHeaders(180),
	});
};
