/* * */

import type { Article, Author, CaseStudy, Interview, Media, Video } from '../../payload-types';
import type { Payload } from 'payload';

/* * */

type MaybeRelation<T> = null | string | T | undefined;

const DEFAULT_INTERVIEW_AUTHOR: Author = {
	bio: null,
	createdAt: '',
	expertAuthor: false,
	id: 'equipa-carris',
	name: 'Equipa Carris Metropolitana',
	picture: null,
	role: 'Equipa Carris Metropolitana',
	slug: 'equipa-carris',
	updatedAt: '',
};

/* * */

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

async function hydrateAuthor(payload: Payload, value: MaybeRelation<Author>): Promise<MaybeRelation<Author>> {
	if (typeof value !== 'string') return value;

	try {
		return await payload.findByID({
			collection: 'authors',
			depth: 0,
			id: value,
		});
	}
	catch {
		return value;
	}
}

async function hydrateAuthors(payload: Payload, values: (Author | string)[] | null | undefined): Promise<Author[]> {
	const authors = await Promise.all((values ?? []).map(value => hydrateAuthor(payload, value)));

	return Promise.all(authors.filter((author): author is Author => typeof author !== 'string').map(async author => ({
		...author,
		picture: await hydrateMedia(payload, author.picture),
	})));
}

export async function hydratePublicArticleRelations(payload: Payload, article: Article): Promise<Article> {
	const [authors, heroImage, seoOgImage] = await Promise.all([
		hydrateAuthors(payload, article.authors),
		hydrateMedia(payload, article.heroImage),
		hydrateMedia(payload, article.seo?.ogImage),
	]);

	return {
		...article,
		authors,
		heroImage,
		seo: article.seo ? { ...article.seo, ogImage: seoOgImage } : article.seo,
	};
}

export async function hydratePublicVideoRelations(payload: Payload, video: Video): Promise<Video> {
	const [authors, seoOgImage, thumbnail, videoFile] = await Promise.all([
		hydrateAuthors(payload, video.authors),
		hydrateMedia(payload, video.seo?.ogImage),
		hydrateMedia(payload, video.thumbnail),
		hydrateMedia(payload, video.video),
	]);

	return {
		...video,
		authors,
		seo: video.seo ? { ...video.seo, ogImage: seoOgImage } : video.seo,
		thumbnail,
		video: videoFile,
	};
}

/* * */

export async function hydratePublicCaseStudyRelations(payload: Payload, caseStudy: CaseStudy): Promise<CaseStudy> {
	const [authors, heroImage, seoOgImage] = await Promise.all([
		hydrateAuthors(payload, caseStudy.authors),
		hydrateMedia(payload, caseStudy.heroImage),
		hydrateMedia(payload, caseStudy.seo?.ogImage),
	]);

	return {
		...caseStudy,
		authors,
		heroImage,
		seo: caseStudy.seo
			? {
				...caseStudy.seo,
				ogImage: seoOgImage,
			}
			: caseStudy.seo,
	};
}

export async function hydratePublicInterviewRelations(payload: Payload, interview: Interview): Promise<Interview> {
	const [authors, guestPicture, audioFile, transcriptPdf, seoOgImage] = await Promise.all([
		hydrateAuthors(payload, interview.authors),
		hydrateMedia(payload, interview.guest.picture),
		hydrateMedia(payload, interview.audioFile),
		hydrateMedia(payload, interview.transcriptPdf),
		hydrateMedia(payload, interview.seo?.ogImage),
	]);

	return {
		...interview,
		audioFile,
		authors: authors.length > 0 ? authors : [DEFAULT_INTERVIEW_AUTHOR],
		guest: {
			...interview.guest,
			picture: guestPicture,
		},
		seo: interview.seo
			? {
				...interview.seo,
				ogImage: seoOgImage,
			}
			: interview.seo,
		transcriptPdf,
	};
}
