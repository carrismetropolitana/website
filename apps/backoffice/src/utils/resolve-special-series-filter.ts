/* * */

import type { Payload } from 'payload';

/* * */

export async function resolveSpecialSeriesFilter(payload: Payload, value: null | string): Promise<string[]> {
	if (!value) return [];

	const requestedValues = value
		.split(',')
		.map(item => item.trim())
		.filter(Boolean);

	if (!requestedValues.length) return [];

	const foundSpecialSeries = await payload.find({
		collection: 'special-series',
		depth: 0,
		limit: requestedValues.length,
		where: {
			slug: { in: requestedValues },
		},
	});

	const idsBySlug = new Map(foundSpecialSeries.docs.map(item => [item.slug, item.id]));

	return requestedValues.map(item => idsBySlug.get(item) ?? item);
}
