/* * */

import type { CollectionConfig, Config } from 'payload';

import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { buildNewsRssXml, type RssRawItem } from '@tmlmobilidade/rss';

/* * */

export function newsRssFeed() {
	const siteOrigin = getPublicVariable('server_url_frontend').replace(/\/$/, '');

	return (incomingConfig: Config): Config => {
		const nextConfig = { ...incomingConfig } as Config;
		const collections = [...(nextConfig.collections ?? [])];
		const newsIdx = collections.findIndex(collection => (collection as CollectionConfig)?.slug === 'news');

		if (newsIdx < 0) {
			nextConfig.collections = collections;
			return nextConfig;
		}

		const newsCollection = collections[newsIdx] as CollectionConfig;
		const existingEndpoints = Array.isArray(newsCollection.endpoints) ? newsCollection.endpoints : [];

		collections[newsIdx] = {
			...newsCollection,
			endpoints: [
				...existingEndpoints,
				{
					handler: async (req) => {
						const result = await req.payload.find({
							collection: 'news',
							depth: 0,
							draft: false,
							limit: 0,
							sort: '-publishedAt',
							where: {
								_status: { equals: 'published' },
								or: [
									{ is_unlisted: { equals: false } },
									{ is_unlisted: { equals: undefined } },
								],
							},
						});

						const docs = (result.docs ?? []) as RssRawItem[];
						const xml = buildNewsRssXml(docs, siteOrigin);

						return new Response(xml, {
							headers: {
								...getPublicHeaders(180),
								'Content-Type': 'application/rss+xml; charset=utf-8',
							},
						});
					},
					method: 'get',
					path: '/xml',
				},
			],
		};

		nextConfig.collections = collections;
		return nextConfig;
	};
}
