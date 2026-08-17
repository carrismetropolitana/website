import type { Author } from '../../payload-types';
import type { Payload } from 'payload';

export const DEFAULT_INTERVIEW_AUTHOR_SLUG = 'equipa-carris';

const DEFAULT_INTERVIEW_AUTHOR_DATA = {
	expertAuthor: false,
	name: 'Equipa Carris Metropolitana',
	role: 'Equipa Carris Metropolitana',
	slug: DEFAULT_INTERVIEW_AUTHOR_SLUG,
} as const;

async function findDefaultInterviewAuthor(payload: Payload): Promise<Author | undefined> {
	const result = await payload.find({
		collection: 'authors',
		depth: 0,
		limit: 1,
		overrideAccess: true,
		pagination: false,
		where: {
			slug: {
				equals: DEFAULT_INTERVIEW_AUTHOR_SLUG,
			},
		},
	});

	return result.docs[0];
}

export async function ensureDefaultInterviewAuthor(payload: Payload): Promise<Author> {
	const existingAuthor = await findDefaultInterviewAuthor(payload);
	if (existingAuthor) return existingAuthor;

	try {
		return await payload.create({
			collection: 'authors',
			data: DEFAULT_INTERVIEW_AUTHOR_DATA,
			overrideAccess: true,
		});
	}
	catch (error) {
		const concurrentlyCreatedAuthor = await findDefaultInterviewAuthor(payload);
		if (concurrentlyCreatedAuthor) return concurrentlyCreatedAuthor;
		throw error;
	}
}
