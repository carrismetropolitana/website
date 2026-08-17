import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { resolveListFilter } from '@/utils/resolve-list-filter';
import { resolvePublicContentFilter } from '@/utils/resolve-public-content-filter';
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
	const typeFilter = resolveListFilter(type);
	const publicContentFilter = resolvePublicContentFilter(searchParams);

	//
	// B. Build the where clause, optionally filtering by type.

	const whereClause: Where = {
		status: { equals: 'published' },
		...publicContentFilter,
		...(typeFilter.length && { type: { in: typeFilter } }),
	};

	//
	// C. Retrieve published reports from the database.

	const foundReports = await payload.find({
		collection: 'reports',
		depth: 1,
		limit,
		page,
		sort: '-publishDate',
		where: whereClause,
	});

	//
	// Return reports as a JSON response.

	return Response.json(foundReports, {
		headers: getPublicHeaders(60),
	});

	//
};
