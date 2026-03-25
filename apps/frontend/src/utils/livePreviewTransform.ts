/* eslint-disable @typescript-eslint/no-explicit-any */
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { NewsData } from '@/types/news.types';

/* * */

export function transformPayloadData(payloadData: any): NewsData {
	const body = typeof payloadData.body === 'string'
		? payloadData.body
		: JSON.stringify(payloadData.body ?? {});

	const featured_image = payloadData.featured_image && typeof payloadData.featured_image === 'object'
		? {
			filename: payloadData.featured_image.filename || '',
			thumbnailURL: payloadData.featured_image.sizes?.thumbnail?.url || payloadData.featured_image.url || '',
			url: payloadData.featured_image.url || '',
		}
		: { filename: '', thumbnailURL: '', url: '' };

	const topics = Array.isArray(payloadData.topics)
		? payloadData.topics.map((topic: any) => typeof topic === 'string' ? topic : topic.id || topic.title || '')
		: [];

	return {
		accordion: payloadData.accordion,
		body,
		featured_image,
		id: payloadData.id || '',
		is_featured: payloadData.is_featured || false,
		is_unlisted: payloadData.is_unlisted || false,
		publishedAt: payloadData.publishedAt || '',
		summary: payloadData.summary || '',
		title: payloadData.title || '',
		topics,
		updated_at: payloadData.updatedAt || payloadData.updated_at || '',
	};
}

export function transformCampaignPayloadData(payloadData: any): CampaignData {
	const body = typeof payloadData.body === 'string'
		? payloadData.body
		: JSON.stringify(payloadData.body ?? {});

	const featured_image
		= payloadData.featured_image && typeof payloadData.featured_image === 'object'
			? {
				filename: payloadData.featured_image.filename || '',
				thumbnailURL:
					payloadData.featured_image.sizes?.thumbnail?.url
					|| payloadData.featured_image.thumbnailURL
					|| payloadData.featured_image.url
					|| '',
				url: payloadData.featured_image.url || '',
			}
			: undefined;

	return {
		body,
		featured_image,
		has_default_surface: Boolean(payloadData.has_default_surface),
		id: payloadData.id || '',
		is_unlisted: payloadData.is_unlisted,
		publishedAt: payloadData.publishedAt || '',
		slug: payloadData.slug || '',
		status: payloadData.status || '',
		title: payloadData.title || '',
		updatedAt: payloadData.updatedAt || '',
	};
}
