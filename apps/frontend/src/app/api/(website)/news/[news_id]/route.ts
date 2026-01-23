/* * */

export async function GET(_: Request, { params }: { params: Promise<{ news_id: string }> }) {
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
		headers: { Accept: 'application/json' },
		next: { revalidate: 180 },
	});

	if (!res.ok) {
		const text = await res.text();
		return Response.json({ error: text }, { status: res.status });
	}

	const newsData = await res.json();

	if (!newsData) {
		return Response.json([], { status: 500, statusText: 'Unable to fetch news data' });
	}

	//
	// C. Transform data

	// Handle featured_image - can be string (depth=1) or Media object (depth=2)
	const coverImageSrc = typeof newsData.featured_image === 'string'
		? newsData.featured_image
		: newsData.featured_image?.url || null;

	const newsDataFormatted = {
		_id: newsData.id,
		content: newsData.body,
		cover_image_src: coverImageSrc,
		publish_date: newsData.publishedAt,
		title: newsData.title,
	};

	return Response.json(newsDataFormatted, {
		headers: { 'Cache-Control': 'public, max-age=180' },
	});

	//
}
