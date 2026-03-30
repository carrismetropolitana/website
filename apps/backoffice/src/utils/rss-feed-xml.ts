/* * */

import { escapeXml } from './escape-xml';

/* * */

export function rssFeedXml(itemsXml: string, frontendBase: string): string {
	//

	//
	// A. Build Content

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0">',
		'<channel>',
		'<title>Notícias da CMetropolitana</title>',
		`<link>${escapeXml(frontendBase)}/news</link>`,
		'<description>Últimas notícias da CMetropolitana</description>',
		itemsXml,
	];

	//
	// B. Return XML

	return xml.join('\n');

	//
}
