import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
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
	const expertArticle = JSON.parse(searchParams.get('expert-article') ?? 'false');

	const payload = await getPayload({ config: payloadConfig });
	const specialSeriesFilter = await resolveSpecialSeriesFilter(payload, specialSeries);

	//
	// B. Build the where clause, optionally filtering by type (mapped to the type field).

	const whereClause: Where = {
		status: { equals: 'published' },
		...(type && { type: { in: type } }),
		...(specialSeriesFilter.length && { specialSeries: { in: specialSeriesFilter } }),
		...(expertArticle && { 'author.expertAuthor': { equals: expertArticle } }),
	};

	//
	// C. Retrieve published articles from the database.

	const foundArticles = await payload.find({
		collection: 'articles',
		depth: 1,
		limit,
		page,
		sort: '-publishDate',
		where: whereClause,
	});

	//
	// Return articles as a JSON response.

	return Response.json(foundArticles, {
		headers: getPublicHeaders(60),
	});

	//
};
