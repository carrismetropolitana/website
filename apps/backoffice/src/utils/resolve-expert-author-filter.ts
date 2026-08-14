import type { Payload } from 'payload';

export async function resolveExpertAuthorFilter(payload: Payload, enabled: boolean): Promise<string[]> {
	if (!enabled) return [];

	const result = await payload.find({
		collection: 'authors',
		depth: 0,
		limit: 1_000,
		pagination: false,
		where: {
			expertAuthor: { equals: true },
		},
	});

	return result.docs.map(author => author.id);
}
