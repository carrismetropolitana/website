import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { getPayload, type Where } from 'payload';

/* * */

export const GET = async (request: Request) => {
	//

	//
	// A. Setup Payload and other necessary variables for handling requests.

	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const limit = Number(searchParams.get('limit')) || 10;
	const page = Number(searchParams.get('page')) || 1;

	const payload = await getPayload({ config: payloadConfig });

	//
	// B. Build the where clause, optionally filtering by type.

	const whereClause: Where = {
		status: { equals: 'published' },
		...(type && { type: { equals: type } }),
	};

	//
	// C. Retrieve published case studies from the database.

	const foundCaseStudies = await payload.find({
		collection: 'case-studies',
		depth: 1,
		limit,
		page,
		sort: '-publishDate',
		where: whereClause,
	});

	//
	// Return case studies as a JSON response.

	return Response.json(foundCaseStudies, {
		headers: getPublicHeaders(60),
	});

	//
};
