/* * */

import payloadConfig from '@/payload-config';
import { getPublicHeaders } from '@/utils/get-public-headers';
import { hydratePublicCaseStudyRelations } from '@/utils/hydrate-public-content-relations';
import { getPayload } from 'payload';

/* * */

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	if (!slug) {
		return Response.json({ error: 'Case study slug required' }, { headers: getPublicHeaders(null), status: 400 });
	}

	const payload = await getPayload({ config: payloadConfig });

	const foundCaseStudies = await payload.find({
		collection: 'case-studies',
		depth: 0,
		draft: false,
		limit: 1,
		where: {
			and: [
				{ slug: { equals: slug } },
				{ status: { equals: 'published' } },
			],
		},
	});

	if (!foundCaseStudies.docs.length) {
		return Response.json({ error: 'Case study not found' }, { headers: getPublicHeaders(null), status: 404 });
	}

	const caseStudy = await hydratePublicCaseStudyRelations(payload, foundCaseStudies.docs[0]);

	return Response.json(caseStudy, {
		headers: getPublicHeaders(3600),
	});
};
