import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { hydratePublicInterviewRelations } from '@/utils/hydrate-public-content-relations';
import { resolveSpecialSeriesFilter } from '@/utils/resolve-special-series-filter';
import { getPayload, type Where } from 'payload';

/* * */

export const GET = async (request: Request) => {
	//

	//
	// A. Setup Payload and other necessary variables for handling requests.

	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const specialSeries = searchParams.get('special-series');
	const limit = Number(searchParams.get('limit')) || 10;
	const page = Number(searchParams.get('page')) || 1;

	const payload = await getPayload({ config: payloadConfig });
	const specialSeriesFilter = await resolveSpecialSeriesFilter(payload, specialSeries);

	//
	// B. Build the where clause, optionally filtering by type.

	const whereClause: Where = {
		status: { equals: 'published' },
		...(type && { type: { in: type } }),
		...(specialSeriesFilter.length && { specialSeries: { in: specialSeriesFilter } }),
	};

	//
	// C. Retrieve published interviews from the database.

	const foundInterviews = await payload.find({
		collection: 'interviews',
		depth: 0,
		limit,
		page,
		sort: '-publishDate',
		where: whereClause,
	});

	const response = {
		...foundInterviews,
		docs: await Promise.all(foundInterviews.docs.map(interview => hydratePublicInterviewRelations(payload, interview))),
	};

	//
	// Return interviews as a JSON response.

	return Response.json(response, {
		headers: getPublicHeaders(60),
	});

	//
};
