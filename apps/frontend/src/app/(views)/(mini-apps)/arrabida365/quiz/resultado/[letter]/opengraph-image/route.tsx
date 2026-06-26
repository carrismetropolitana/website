import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

type RouteProps = {
	params: Promise<{
		letter: string;
	}>;
};

const ogFiles = {
	a: 'og-a.png',
	b: 'og-b.png',
	c: 'og-c.png',
	d: 'og-d.png',
};

export async function GET(_: Request, { params }: RouteProps) {
	const { letter } = await params;
	const normalizedLetter = letter.toLowerCase();
	const fileName = ogFiles[normalizedLetter as keyof typeof ogFiles] ?? ogFiles.a;

	const filePath = path.join(
		process.cwd(),
		'src/app/(views)/(mini-apps)/arrabida365/quiz/assets/opengraph',
		fileName
	);

	const imageBuffer = await readFile(filePath);

	return new NextResponse(imageBuffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600, stale-while-revalidate=120',
		},
	});
}