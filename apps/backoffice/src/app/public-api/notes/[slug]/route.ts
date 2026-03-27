/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload } from 'payload';

/* * */

export const GET = async (request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	//

	//
	// Setup Payload and other necessary variables for handling requests.

	const { slug } = await params;
	const payload = await getPayload({ config: payloadConfig });

	//
	// Retrieve the specific Note by slug

	const foundNotes = await payload.find({
		collection: 'notes',
		depth: 2,
		limit: 1,
		where: {
			and: [
				{ slug: { equals: slug } },
				{ status: { equals: 'published' } },
			],
		},
	});

	if (!foundNotes.docs.length) {
		return Response.json({ error: 'Note not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const note = foundNotes.docs[0];

	//
	// Format the note data for public consumption

	const publicNote = {
		_id: note.id,
		authors: note.authors,
		body: note.body,
		contentType: note.contentType || 'file',
		file: note.file,
		heroImage: note.heroImage,
		lead: note.lead,
		publishDate: note.publishDate,
		seo: note.seo,
		slug: note.slug,
		tags: note.tags,
		title: note.title,
	};

	//
	// Return the note as a JSON response.

	return Response.json(publicNote, {
		headers: getPublicHeaders(3600), // Cache individual notes for 1 hour
	});

	//
};
