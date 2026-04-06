/* * */

import type { Media, News } from '@/../../payload-types';
import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { normalizeMediaSrc } from '@/utils/normalize-media-src';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createRssFeed } from '@tmlmobilidade/rss';
import { getPayload } from 'payload';

/* * */

const absoluteImageUrl = (backofficeBase: string, url: null | string | undefined): null | string => {
	if (!url) return null;
	if (url.startsWith('http')) return url;
	const normalized = normalizeMediaSrc(url);
	const base = backofficeBase.replace(/\/$/, '');
	return `${base}${normalized.startsWith('/') ? '' : '/'}${normalized}`;
};

export const GET = async () => {
	const payload = await getPayload({ config: payloadConfig });
	const frontendBase = getPublicVariable('server_url_frontend').replace(/\/$/, '');
	const backofficeBase = getPublicVariable('server_url_backoffice').replace(/\/$/, '');
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
		const media = typeof doc.featured_image === 'object' && doc.featured_image ? doc.featured_image as Media : null;
		const imageUrl = absoluteImageUrl(backofficeBase, media?.url ?? null);
		const summary = imageUrl ? `${doc.summary}\n\nImage: ${imageUrl}` : doc.summary;
		return {
			link: `${frontendBase}/news/${doc.slug || doc.id}`,
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
