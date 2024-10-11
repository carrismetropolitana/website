import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
	// Get a list of all images in the /folder/press/image-bank folder
	const imageBankFolder = path.join(process.cwd(), 'public', 'images', 'press', 'image-bank');
	const allFiles = fs.readdirSync(imageBankFolder);

	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

	const images = allFiles.filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return imageExtensions.includes(ext);
	});
	return NextResponse.json(images);
}
