export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
	//

	//
	// A. Setup variables

	const { id } = await params;
	const baseUrl = (process.env.PAYLOAD_BASE_URL ?? 'https://placeholder.pt').replace(/\/$/, '');
	const PAYLOAD_API = `${baseUrl}/admin/api/media/file`;

	//
	// B. Fetch data

	if (!id) return Response.json({ error: 'Image ID required' }, { status: 400 });

	const res = await fetch(`${PAYLOAD_API}/${id}?depth=2&draft=false&locale=undefined&trash=false`, { cache: 'no-store', headers: { Accept: 'application/json' } });

	if (!res.ok) {
		return Response.json({ error: 'Failed to fetch image' }, { status: res.status });
	}

	const data = await res.json();

	//
	// C. Return data

	return Response.json(data);

	//
}
