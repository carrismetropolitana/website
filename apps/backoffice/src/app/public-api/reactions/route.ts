import payloadConfig from '@/payload-config';
import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { getPayload, type Where } from 'payload';

const COOKIE_NAME = 'cicm_visitor';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const LOCAL_CICM_ORIGIN = 'http://localhost:3000';
const contentCollections = {
	'article': 'articles',
	'case-study': 'case-studies',
	'interview': 'interviews',
	'video': 'videos',
} as const;

type ContentType = keyof typeof contentCollections;

interface ReactionRequest {
	contentId?: unknown
	contentType?: unknown
}

export const GET = async (request: Request) => getReactionResponse(request);
export const POST = async (request: Request) => getReactionResponse(request, true);
export const DELETE = async (request: Request) => getReactionResponse(request, false);
export const OPTIONS = (request: Request) => new Response(null, {
	headers: getReactionHeaders(request),
	status: 204,
});

async function getReactionResponse(request: Request, liked?: boolean): Promise<Response> {
	if (liked !== undefined) {
		const requestError = validateMutationRequest(request);
		if (requestError) return requestError;
	}

	const input = liked === undefined
		? Object.fromEntries(new URL(request.url).searchParams)
		: await request.json().catch(() => ({}));
	const reaction = parseReactionRequest(input);
	if (!reaction) {
		return Response.json(
			{ error: 'Pedido de reação inválido.' },
			{ headers: getReactionHeaders(request), status: 400 },
		);
	}

	const payload = await getPayload({ config: payloadConfig });
	const visitor = getVisitor(request);
	const visitorHash = hashVisitor(visitor.id);
	const where = getReactionWhere(reaction, visitorHash);

	try {
		const content = await payload.findByID({
			collection: contentCollections[reaction.contentType],
			id: reaction.contentId,
			overrideAccess: true,
		});
		if (content.status !== 'published') throw new Error('Conteúdo não publicado.');
	}
	catch {
		return Response.json(
			{ error: 'Conteúdo não encontrado.' },
			{ headers: getReactionHeaders(request, visitor.cookie), status: 404 },
		);
	}

	if (liked === true) await createReactionIfMissing(payload, reaction, visitorHash, where);
	if (liked === false) await deleteReactionIfPresent(payload, where);

	const [visitorReactions, allReactions] = await Promise.all([
		payload.find({ collection: 'cicm-reactions', limit: 1, overrideAccess: true, where }),
		payload.find({
			collection: 'cicm-reactions',
			limit: 1,
			overrideAccess: true,
			where: getReactionWhere(reaction),
		}),
	]);

	return Response.json(
		{ liked: visitorReactions.totalDocs > 0, likes: allReactions.totalDocs },
		{ headers: getReactionHeaders(request, visitor.cookie) },
	);
}

async function createReactionIfMissing(
	payload: Awaited<ReturnType<typeof getPayload>>,
	reaction: { contentId: string, contentType: ContentType },
	visitorHash: string,
	where: Where,
): Promise<void> {
	const existing = await payload.find({ collection: 'cicm-reactions', limit: 1, overrideAccess: true, where });
	if (existing.totalDocs > 0) return;

	await payload.create({
		collection: 'cicm-reactions',
		data: { ...reaction, visitorHash },
		overrideAccess: true,
	}).catch(async () => {
		const duplicate = await payload.find({ collection: 'cicm-reactions', limit: 1, overrideAccess: true, where });
		if (duplicate.totalDocs === 0) throw new Error('Não foi possível guardar a reação.');
	});
}

async function deleteReactionIfPresent(payload: Awaited<ReturnType<typeof getPayload>>, where: Where): Promise<void> {
	const existing = await payload.find({ collection: 'cicm-reactions', limit: 1, overrideAccess: true, where });
	for (const document of existing.docs) {
		await payload.delete({ collection: 'cicm-reactions', id: document.id, overrideAccess: true });
	}
}

function parseReactionRequest(value: ReactionRequest): undefined | { contentId: string, contentType: ContentType } {
	if (typeof value.contentId !== 'string' || !value.contentId.trim()) return undefined;
	if (typeof value.contentType !== 'string' || !(value.contentType in contentCollections)) return undefined;
	return { contentId: value.contentId.trim(), contentType: value.contentType as ContentType };
}

function getReactionWhere(reaction: { contentId: string, contentType: ContentType }, visitorHash?: string): Where {
	return {
		contentId: { equals: reaction.contentId },
		contentType: { equals: reaction.contentType },
		...(visitorHash && { visitorHash: { equals: visitorHash } }),
	};
}

function getVisitor(request: Request): { cookie?: string, id: string } {
	const cookie = request.headers.get('cookie')?.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`))?.[1];
	const [id, signature] = cookie?.split('.') ?? [];
	if (id && signature && isValidSignature(id, signature)) return { id };
	const nextId = randomUUID();
	return {
		cookie: serializeVisitorCookie(request, nextId),
		id: nextId,
	};
}

function getReactionHeaders(request: Request, cookie?: string): Headers {
	const headers = new Headers({
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, POST',
		'Cache-Control': 'no-store',
		'Vary': 'Origin',
	});
	const origin = request.headers.get('origin');
	if (origin && getAllowedCicmOrigins().has(origin)) headers.set('Access-Control-Allow-Origin', origin);
	if (cookie) headers.set('Set-Cookie', cookie);
	return headers;
}

function validateMutationRequest(request: Request): Response | undefined {
	const origin = request.headers.get('origin');
	const requestOrigin = new URL(request.url).origin;
	if (origin && origin !== requestOrigin && !getAllowedCicmOrigins().has(origin)) {
		return Response.json(
			{ error: 'Origem não autorizada.' },
			{ headers: getReactionHeaders(request), status: 403 },
		);
	}

	const contentType = request.headers.get('content-type')?.toLowerCase();
	if (!contentType?.startsWith('application/json')) {
		return Response.json(
			{ error: 'O pedido deve usar application/json.' },
			{ headers: getReactionHeaders(request), status: 415 },
		);
	}
}

function getAllowedCicmOrigins(): Set<string> {
	const configuredOrigins = process.env.CICM_PUBLIC_ORIGINS
		?.split(',')
		.map(origin => origin.trim())
		.filter(Boolean)
		?? [];

	return new Set([LOCAL_CICM_ORIGIN, ...configuredOrigins]);
}

function serializeVisitorCookie(request: Request, id: string): string {
	const origin = request.headers.get('origin');
	const isCrossSiteRequest = Boolean(origin && origin !== new URL(request.url).origin);
	const isSecure = new URL(request.url).protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
	const sameSite = isCrossSiteRequest && isSecure ? 'None; Secure' : 'Lax';

	return `${COOKIE_NAME}=${id}.${signVisitor(id)}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${COOKIE_MAX_AGE}`;
}

function hashVisitor(id: string): string {
	return createHash('sha256').update(`${getSecret()}:${id}`).digest('hex');
}

function signVisitor(id: string): string {
	return createHmac('sha256', getSecret()).update(id).digest('hex');
}

function isValidSignature(id: string, signature: string): boolean {
	const expected = Buffer.from(signVisitor(id));
	const actual = Buffer.from(signature);
	return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function getSecret(): string {
	return process.env.PAYLOAD_SECRET ?? 'placeholder';
}
