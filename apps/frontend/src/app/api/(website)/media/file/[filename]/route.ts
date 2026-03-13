export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
	//

	const { filename } = await params;
	const origin = (process.env.PAYLOAD_BASE_URL ?? 'https://placeholder.pt').replace(/\/$/, '');
	const baseUrl = `${origin}/admin/api/media/file`;

	if (!filename) return new Response('Filename required', { status: 400 });

	const res = await fetch(`${baseUrl}/${encodeURIComponent(filename)}`, { cache: 'no-store' });

	if (!res.ok) return new Response('Failed to fetch file', { status: res.status });

	return new Response(res.body, {
		headers: {
			'Content-Disposition': res.headers.get('content-disposition') ?? '',
			'Content-Length': res.headers.get('content-length') ?? '',
			'Content-Type': res.headers.get('content-type') ?? 'application/octet-stream',
		},
		status: 200,
	});

	//
}
