import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { hydratePublicVideoRelations } from '@/utils/hydrate-public-content-relations';
import { resolveExpertAuthorFilter } from '@/utils/resolve-expert-author-filter';
import { resolveListFilter } from '@/utils/resolve-list-filter';
import { resolvePublicContentFilter } from '@/utils/resolve-public-content-filter';
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
	const expertAuthor = JSON.parse(searchParams.get('expert-author') ?? 'false');

	const payload = await getPayload({ config: payloadConfig });
	const typeFilter = resolveListFilter(type);
	const specialSeriesFilter = await resolveSpecialSeriesFilter(payload, specialSeries);
	const publicContentFilter = resolvePublicContentFilter(searchParams);
	const expertAuthorIds = await resolveExpertAuthorFilter(payload, expertAuthor);

	//
	// B. Build the where clause, optionally filtering by type (mapped to the type field).

	const whereClause: Where = {
		status: { equals: 'published' },
		...publicContentFilter,
		...(typeFilter.length && { type: { in: typeFilter } }),
		...(specialSeriesFilter.length && { specialSeries: { in: specialSeriesFilter } }),
		...(expertAuthor && { authors: { in: expertAuthorIds } }),
	};

	//
	// C. Retrieve published videos from the database.

	const foundVideos = await payload.find({
		collection: 'videos',
		depth: 2,
		limit,
		page,
		sort: '-publishDate',
		where: whereClause,
	});

	//
	// Return videos as a JSON response.

	return Response.json({
		...foundVideos,
		docs: await Promise.all(foundVideos.docs.map(video => hydratePublicVideoRelations(payload, video))),
	}, {
		headers: getPublicHeaders(60),
	});

	//
};
