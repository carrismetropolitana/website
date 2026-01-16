import { NextResponse } from 'next/server';

export async function GET(
	_req: Request,
	{ params }: { params: { newsId: string } },
) {
	try {
		const { newsId } = params;

		const payloadUrl
			= `http://localhost:49001/admin/api/news/${newsId}?depth=2&draft=false&trash=false`;

		const res = await fetch(payloadUrl, {
			headers: {
				Accept: 'application/json',
			},
			// optional: avoid weird caching during dev
			cache: 'no-store',
		});

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
}
