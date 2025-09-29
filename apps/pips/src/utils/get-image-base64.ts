/* * */

import fs from 'node:fs';
import path from 'node:path';

/* * */

export function getImageBase64(relativePath: string) {
	const imagePath = path.join(process.cwd(), relativePath);
	const imageBuffer = fs.readFileSync(imagePath);
	return imageBuffer.toString('base64');
}
