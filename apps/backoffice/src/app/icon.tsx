/* * */

import fs from 'node:fs/promises';
import path from 'node:path';

/* * */

export default async function Icon() {
	const faviconPath = path.join(process.cwd(), 'public', 'favicon.png');
	const buffer = await fs.readFile(faviconPath);
	return new Response(buffer, {
		headers: { 'Content-Type': 'image/png' },
	});
}
