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
		collection: 'faqs',
		depth: 2,
		draft: false,
		fallbackLocale: requestedFallbackLocale,
		limit: 0,
		locale: requestedLocale,
		sort: '_order',
	});

	const docs = result.docs ?? [];
	type TopicValue = null | typeof docs[number]['topic'];
	const groupedMap = new Map<string, { faqs: typeof docs, topic: TopicValue, topicId: string }>();

	for (const faq of docs) {
		const topic: TopicValue = typeof faq.topic === 'object' && faq.topic !== null ? faq.topic : null;
		const topicId = topic && 'id' in topic && typeof topic.id === 'string' ? topic.id : 'ungrouped';

		if (!groupedMap.has(topicId)) {
			groupedMap.set(topicId, { faqs: [], topic, topicId });
		}

		groupedMap.get(topicId)?.faqs.push(faq);
	}

	return Response.json(Array.from(groupedMap.values()), {
		headers: getPublicHeaders(180),
	});
};
