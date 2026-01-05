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
	// Retrieve all published Notes from the database.

	const foundNotes = await payload.find({
		collection: 'notes',
		depth: 2,
		limit: 0,
		sort: '-publishDate',
		where: {
			status: { equals: 'published' },
		},
	});

	//
	// Format the notes data for public consumption

	const publicNotes = foundNotes.docs.map((note) => {
		return {
			_id: note.id,
			authors: note.authors,
			contentType: note.contentType || 'file',
			file: note.file,
			heroImage: note.heroImage,
			publishDate: note.publishDate,
			seo: note.seo,
			slug: note.slug,
			tags: note.tags,
			title: note.title,
		};
	});

	//
	// Return the notes as a JSON response.

	return Response.json(publicNotes, {
		headers: getPublicHeaders(60),
	});

	//
};
