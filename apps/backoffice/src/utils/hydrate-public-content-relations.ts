/* * */

import type { CaseStudy, ContentType, Interview, Media } from '../../payload-types';
import type { Payload } from 'payload';

/* * */

type MaybeRelation<T> = null | string | T | undefined;

/* * */

async function hydrateContentType(payload: Payload, value: MaybeRelation<ContentType>): Promise<MaybeRelation<ContentType>> {
	if (typeof value !== 'string') return value;

	try {
		return await payload.findByID({
			collection: 'content-types',
			depth: 0,
			id: value,
		});
	}
	catch {
		return value;
	}
}

async function hydrateMedia(payload: Payload, value: MaybeRelation<Media>): Promise<MaybeRelation<Media>> {
	if (typeof value !== 'string') return value;

	try {
		return await payload.findByID({
			collection: 'media',
			depth: 0,
			id: value,
		});
	}
	catch {
		return value;
	}
}

/* * */

export async function hydratePublicCaseStudyRelations(payload: Payload, caseStudy: CaseStudy): Promise<CaseStudy> {
	const [type, heroImage, authorPicture, seoOgImage] = await Promise.all([
		hydrateContentType(payload, caseStudy.type),
		hydrateMedia(payload, caseStudy.heroImage),
		hydrateMedia(payload, caseStudy.author.picture),
		hydrateMedia(payload, caseStudy.seo?.ogImage),
	]);

	return {
		...caseStudy,
		author: {
			...caseStudy.author,
			picture: authorPicture,
		},
		heroImage,
		seo: caseStudy.seo
			? {
				...caseStudy.seo,
				ogImage: seoOgImage,
			}
			: caseStudy.seo,
		type: type ?? caseStudy.type,
	};
}

export async function hydratePublicInterviewRelations(payload: Payload, interview: Interview): Promise<Interview> {
	const [type, guestPicture, hostPicture, audioFile, transcriptPdf, seoOgImage] = await Promise.all([
		hydrateContentType(payload, interview.type),
		hydrateMedia(payload, interview.guest.picture),
		hydrateMedia(payload, interview.host.picture),
		hydrateMedia(payload, interview.audioFile),
		hydrateMedia(payload, interview.transcriptPdf),
		hydrateMedia(payload, interview.seo?.ogImage),
	]);

	return {
		...interview,
		audioFile,
		guest: {
			...interview.guest,
			picture: guestPicture,
		},
		host: {
			...interview.host,
			picture: hostPicture,
		},
		seo: interview.seo
			? {
				...interview.seo,
				ogImage: seoOgImage,
			}
			: interview.seo,
		transcriptPdf,
		type: type ?? interview.type,
	};
}
