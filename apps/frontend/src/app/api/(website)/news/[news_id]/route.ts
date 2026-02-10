export async function GET({ params }: { params: Promise<{ news_id: string }> }) {
	//

	//
	// A. Setup variables

	const { news_id } = await params;

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadBasePath = process.env.PAYLOAD_BASE_PATH ?? '/admin';
	const payloadUrl = `${payloadBaseUrl}${payloadBasePath}/api/news/${news_id}?depth=2&draft=false&trash=false`;

	//
	// B. Fetch data

	const res = await fetch(payloadUrl, {
		cache: 'no-store',
	});

	//
	// C. Transform Data

	if (!res.ok) {
		const text = await res.text();
		return Response.json({ error: text }, { status: res.status });
	}

	return Response.json(await res.json(), {
		headers: {
			'Cache-Control': 'public, max-age=60',
		},
	});

	//
}
