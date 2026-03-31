/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { createRssFeed } from '@tmlmobilidade/rss';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });
	const docs = (await payload.find({
		collection: 'news',
		depth: 0,
		draft: false,
		limit: 0,
		sort: '-publishedAt',
		where: { _status: { equals: 'published' }, or: [{ is_unlisted: { equals: false } }, { is_unlisted: { equals: undefined } }] },
	})).docs;
	if (!docs.length) return new Response('No news available.', { headers: { ...getPublicHeaders(60), 'Content-Type': 'text/plain; charset=utf-8' }, status: 404 });
	return new Response(createRssFeed(docs, {
		copyright: 'Carris Metropolitana',
		description: 'Noticias e atualizacoes da Carris Metropolitana.',
		link: 'https://www.carrismetropolitana.pt',
		title: 'Carris Metropolitana - Noticias',
	}), { headers: { ...getPublicHeaders(180), 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
