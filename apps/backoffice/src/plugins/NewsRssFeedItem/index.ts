/* * */

import { NewsRssDoc } from '@/types/NewsRssDoc';
import { escapeXml } from '@/utils/escape-xml';

/* * */

export function rssItemXml(doc: NewsRssDoc, frontendBase: string): string {
	//

	//
	// A. Setup variables

	const slugOrId = doc.slug ?? doc.id;
	const link = `${frontendBase}/news/${slugOrId}`;
	const pubDate = doc.publishedAt ? new Date(doc.publishedAt).toUTCString() : undefined;

	//
	// B. Return Item

	return [
		'<item>',
		`<title>${escapeXml(doc.title)}</title>`,
		`<link>${escapeXml(link)}</link>`,
		`<guid isPermaLink="true">${escapeXml(link)}</guid>`,
		pubDate ? `<pubDate>${escapeXml(pubDate)}</pubDate>` : '',
		`<description>${escapeXml(doc.summary)}</description>`,
		'</item>',
	].filter(Boolean).join('\n');

	//
}
