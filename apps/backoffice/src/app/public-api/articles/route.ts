/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async () => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve all published articles from the database.

	const foundItems = await payload.find({
		collection: 'articles',
		depth: 2,
		limit: 0,
		sort: '-publishDate',
		where: {
			status: { equals: 'published' },
		},
	});

	//
	// Format the articles data for public consumption

	const publicItems = foundItems.docs.map((item) => {
		return {
			_id: item.id,
			author: item.author,
			description: item.description,
			heroImage: item.heroImage,
			heroImageCaption: item.heroImageCaption,
			publishDate: item.publishDate,
			readTime: item.readTime,
			seo: item.seo,
			slug: item.slug,
			title: item.title,
			type: item.type,
		};
	});

	//
	// Return the articles as a JSON response.

	return Response.json(publicItems, {
		headers: getPublicHeaders(60),
	});

	//
};
