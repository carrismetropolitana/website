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
	// Retrieve all published Knowledge Base items from the database.

	const foundItems = await payload.find({
		collection: 'knowledge-base',
		depth: 2,
		limit: 0,
		sort: '-publishDate',
		where: {
			status: { equals: 'published' },
		},
	});

	//
	// Format the knowledge base data for public consumption

	const publicItems = foundItems.docs.map((item) => {
		return {
			_id: item.id,
			authors: item.authors,
			contentType: item.contentType,
			file: item.file,
			heroImage: item.heroImage,
			link: item.link,
			publishDate: item.publishDate,
			seo: item.seo,
			slug: item.slug,
			title: item.title,
			topic: item.topic,
		};
	});

	//
	// Return the knowledge base items as a JSON response.

	return Response.json(publicItems, {
		headers: getPublicHeaders(60),
	});

	//
};
