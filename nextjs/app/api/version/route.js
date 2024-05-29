import pjson from 'package.json';

export async function GET() {
	return Response.json({ latest: pjson.version });
}
