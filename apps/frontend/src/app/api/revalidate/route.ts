/* * */

import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

/* * */

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const path = searchParams.get('path');
	const secret = searchParams.get('secret');

	// Check for secret to confirm this is a valid request
	if (secret !== process.env.REVALIDATE_SECRET) {
		return Response.json({ message: 'Invalid secret' }, { status: 401 });
	}

	if (!path) {
		return Response.json({ message: 'Missing path parameter' }, { status: 400 });
	}

	try {
		revalidatePath(path);
		return Response.json({ path, revalidated: true });
	}
	catch (error) {
		return Response.json({ error: String(error), message: 'Error revalidating' }, { status: 500 });
	}
}
