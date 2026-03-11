export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
	//

	//
	// A. Setup variables

	const { filename } = await params;
	const PAYLOAD_MEDIA = `${process.env.PAYLOAD_BASE_URL ?? 'https://placeholder.pt'}${process.env.PAYLOAD_BASE_PATH ?? '/admin'}/api/media/file`;

	//
	// B. Fetch file from Payload

	if (!filename) return new Response('Filename required', { status: 400 });

	const res = await fetch(`${PAYLOAD_MEDIA}/${encodeURIComponent(filename)}`, { cache: 'no-store' });

	if (!res.ok) {
		return new Response('Failed to fetch file', { status: res.status });
	}

	//
	// C. Stream the response back with appropriate headers

	const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
	const contentLength = res.headers.get('content-length');
	const contentDisposition = res.headers.get('content-disposition');

	const headers = new Headers({
		'Content-Type': contentType,
	});

	if (contentLength) headers.set('Content-Length', contentLength);
	if (contentDisposition) headers.set('Content-Disposition', contentDisposition);

	return new Response(res.body, { headers, status: 200 });

	//
}
