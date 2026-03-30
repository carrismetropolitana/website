/* * */

import type { CollectionConfig, Config } from 'payload';

import { rssItemXml } from '@/plugins/NewsRssFeedItem';
import { NewsRssDoc } from '@/types/NewsRssDoc';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { rssFeedXml } from '@/utils/rss-feed-xml';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

/* * */

export function newsRssFeed() {
	//

	//
	// A. Setup variables

	const strippedUrl = getPublicVariable('server_url_frontend').replace(/\/$/, '');

	//
	// B. Setup Endpoint

	type EndpointArray = Exclude<CollectionConfig['endpoints'], false | null | undefined>;
	type RssEndpoint = EndpointArray extends (infer T)[] ? T : never;

	const rssEndpoint: RssEndpoint = {
		handler: async (req) => {
			const payload = req.payload;
			const frontendBase = strippedUrl;

			const result = (await payload.find({
				collection: 'news',
				depth: 0,
				draft: false,
				limit: 50,
				sort: '-publishedAt',
				where: {
					_status: { equals: 'published' },
					or: [
						{ is_unlisted: { equals: false } },
						{ is_unlisted: { equals: undefined } },
					],
				},
			})) as { docs?: NewsRssDoc[] };

			const docs = result.docs ?? [];
			const itemsXml = docs.map(doc => rssItemXml(doc, frontendBase)).join('\n');
			const xml = rssFeedXml(itemsXml, frontendBase);

			return new Response(xml, {
				headers: {
					...getPublicHeaders(180),
					'Content-Type': 'application/rss+xml; charset=utf-8',
				},
			});
		},
		method: 'get',
		path: '/xml',
	};

	return (incomingConfig: Config): Config => {
		const nextConfig = { ...incomingConfig } as Config;

		nextConfig.collections = (nextConfig.collections ?? []).map((collection) => {
			const collectionConfig = collection as CollectionConfig;
			if (collectionConfig?.slug !== 'news') return collection;

			const existingEndpoints = Array.isArray(collectionConfig.endpoints) ? collectionConfig.endpoints : [];

			return {
				...collectionConfig,
				endpoints: [...existingEndpoints, rssEndpoint],
			};
		});

		return nextConfig;
	};

	//
};
