export async function GET(req: Request, { params }: { params: Promise<{ news_id: string }> }) {
	//

	//
	// A. Setup variables

	const { news_id } = await params;
	const { searchParams } = new URL(req.url);
	const draft = searchParams.get('draft') === 'true';

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadBasePath = process.env.PAYLOAD_BASE_PATH ?? '/admin';
	const payloadUrl = `${payloadBaseUrl}${payloadBasePath}/api/news/${news_id}?depth=2&draft=${draft}&trash=false`;

	//
	// B. Fetch data

	const res = await fetch(payloadUrl, {
		cache: draft ? 'no-store' : 'default',
		headers: { Accept: 'application/json' },
		next: { revalidate: draft ? 0 : 60 },
	});

	//
	// C. Transform Data

	if (!res.ok) {
		const text = await res.text();
		return Response.json({ error: text }, { status: res.status });
	}

	return Response.json(await res.json(), {
		headers: {
			'Cache-Control': draft ? 'no-cache, no-store, must-revalidate' : 'public, max-age=60',
		},
	});

	//
}
