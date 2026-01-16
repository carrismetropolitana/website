export async function GET(req: Request) {
	const url = new URL(req.url);
	const page = url.searchParams.get('page') ?? '1';
	const limit = url.searchParams.get('limit') ?? '20';

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadBasePath = process.env.PAYLOAD_BASE_PATH ?? '/admin';

	const payloadUrl
		= `${payloadBaseUrl}${payloadBasePath}/api/news?depth=1&sort=-publishedAt&page=${page}&limit=${limit}`;

	const res = await fetch(payloadUrl, {
		headers: { Accept: 'application/json' },
		next: { revalidate: 180 },
	});

	if (!res.ok) {
		const text = await res.text();
		return Response.json({ error: text }, { status: res.status });
	}

	const json = await res.json();

	return Response.json(json.docs ?? [], {
		headers: { 'Cache-Control': 'public, max-age=180' },
	});
}
