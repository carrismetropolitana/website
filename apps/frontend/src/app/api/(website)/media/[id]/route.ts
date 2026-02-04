/* * */

import { NextResponse } from 'next/server';

/* * */

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	if (!id) {
		return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
	}

	const payloadBaseUrl = process.env.PAYLOAD_BASE_URL ?? 'http://localhost:49001';
	const payloadUrl = `${payloadBaseUrl}/api/media/${id}?depth=2&draft=false&locale=undefined&trash=false`;

	try {
		const response = await fetch(payloadUrl, {
			cache: 'no-store',
			headers: { Accept: 'application/json' },
		});

		if (!response.ok) {
			return NextResponse.json({ error: 'Failed to fetch image' }, { status: response.status });
		}

		const data = await response.json();
		return NextResponse.json(data);
	}
	catch (error) {
		console.error('Failed to fetch image from Payload:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
