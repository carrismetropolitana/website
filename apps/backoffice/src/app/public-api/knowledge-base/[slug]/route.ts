/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const { slug } = await params;
	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve the knowledge base item by slug from the database.

	const foundItems = await payload.find({
		collection: 'knowledge-base',
		depth: 2,
		limit: 1,
		where: {
			slug: { equals: slug },
			status: { equals: 'published' },
		},
	});

	//
	// Check if item was found

	if (!foundItems.docs.length) {
		return Response.json({ error: 'Item not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const item = foundItems.docs[0];

	//
	// Format the knowledge base item data for public consumption

	const publicItem = {
		_id: item.id,
		authors: item.authors,
		body: item.body,
		contentType: item.contentType,
		file: item.file,
		heroImage: item.heroImage,
		lead: item.lead,
		link: item.link,
		publishDate: item.publishDate,
		seo: item.seo,
		slug: item.slug,
		title: item.title,
		topic: item.topic,
	};

	//
	// Return the knowledge base item as a JSON response.

	return Response.json(publicItem, {
		headers: getPublicHeaders(60),
	});

	//
};
