import { NextResponse } from 'next/server';

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ newsId: string }> },
) {
	try {
		const { newsId } = await params;

		const payloadUrl = `http://localhost:49001/admin/api/news/${newsId}?depth=2&draft=false&trash=false`;

		const res = await fetch(payloadUrl, {
			cache: 'no-store',
			headers: {
				Accept: 'application/json',
			},
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
