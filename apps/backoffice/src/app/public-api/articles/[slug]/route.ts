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
	// Retrieve the article by slug from the database.

	const foundItems = await payload.find({
		collection: 'articles',
		depth: 2,
		limit: 1,
		where: {
			slug: { equals: slug },
			status: { equals: 'published' },
		},
	});

	//
	// Check if article was found

	if (!foundItems.docs.length) {
		return Response.json({ error: 'Article not found' }, { status: 404 });
	}

	const item = foundItems.docs[0];

	//
	// Format the article data for public consumption

	const publicItem = {
		_id: item.id,
		author: item.author,
		content: item.content,
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

	//
	// Return the article as a JSON response.

	return Response.json(publicItem, {
		headers: getPublicHeaders(60),
	});

	//
};
