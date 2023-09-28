import pjson from '../../../package.json';

export async function GET() {
  console.log('version', pjson.version);
  return Response.json({ latest: pjson.version });
}
