/* * */

import type { Media, News } from '@/../payload-types';
import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { normalizeMediaSrc } from '@/utils/normalize-media-src';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createRssFeed } from '@tmlmobilidade/rss';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });
	const docs = (await payload.find({
		collection: 'news',
		depth: 1,
		draft: false,
		limit: 0,
		sort: '-publishedAt',
		where: { _status: { equals: 'published' }, or: [{ is_unlisted: { equals: false } }, { is_unlisted: { equals: undefined } }] },
	})).docs as News[];
	if (!docs.length) return new Response('No news available.', { headers: { ...getPublicHeaders(60), 'Content-Type': 'text/plain; charset=utf-8' }, status: 404 });

	const rawItems = docs.map((doc) => {
		const link = `${ getPublicVariable('server_url_frontend')}news/${doc.slug || doc.id}`;
		const media = typeof doc.featured_image === 'object' && doc.featured_image ? doc.featured_image as Media : null;
		const imageUrl = !media?.url
			? undefined
			: (media.url.startsWith('http')
				? media.url
				: `${getPublicVariable('server_url_backoffice')}${normalizeMediaSrc(media.url).startsWith('/') ? '' : '/'}${normalizeMediaSrc(media.url)}`);
		const summary = imageUrl ? `${doc.summary}\n\${imageUrl}` : doc.summary;
		return {
			link,
			publishDate: doc.publishedAt,
			summary,
			title: doc.title,
		};
	});

	return new Response(createRssFeed(rawItems, {
		copyright: 'Carris Metropolitana',
		description: 'Noticias e atualizacoes da Carris Metropolitana.',
		link: 'https://www.carrismetropolitana.pt',
		title: 'Carris Metropolitana - Noticias',
	}), { headers: { ...getPublicHeaders(180), 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
