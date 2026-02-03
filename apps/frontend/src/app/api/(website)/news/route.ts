export async function GET() {
	//

	//
	// A. Setup variables

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadBasePath = process.env.PAYLOAD_BASE_PATH ?? '/admin';
	const payloadUrl = `${payloadBaseUrl}${payloadBasePath}/api/news?draft=false&trash=false&sort=-publishedAt&limit=0`;

	//
	// B. Fetch data

	const res = await fetch(payloadUrl, { headers: { Accept: 'application/json' }, next: { revalidate: 180 } });

	//
	// C. Transform Data

	if (!res.ok) {
		const text = await res.text();
		return Response.json({ error: text }, { status: res.status });
	}

	const json = await res.json();

	if (!json || !json.docs) {
		return Response.json([], { status: 500, statusText: 'Unable to fetch news data' });
	}

	return Response.json(json.docs, {
		headers: { 'Cache-Control': 'public, max-age=180' },
	});

	//
}
