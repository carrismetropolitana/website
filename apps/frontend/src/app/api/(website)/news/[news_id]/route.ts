import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ news_id: string }> }) {
	//

	//
	// A. Setup variables

	const { news_id } = await params;

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadBasePath = process.env.PAYLOAD_BASE_PATH ?? '/admin';
	const payloadUrl = `${payloadBaseUrl}${payloadBasePath}/api/news/${news_id}?depth=2&draft=false&trash=false`;

	//
	// B. Fetch data

	try {
		const res = await fetch(payloadUrl, {
			cache: 'no-store',
			headers: {
				Accept: 'application/json',
			},
		});

		//
		// C. Transform Data

		if (!res.ok) {
			const text = await res.text();
			return NextResponse.json({ error: text }, { status: res.status });
		}

		return NextResponse.json(await res.json());
	}
	catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 },
		);
	}

	//
}
