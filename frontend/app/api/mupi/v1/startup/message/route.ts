/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		max_build: 1,
		min_build: 2,
		presentation_type: 'breaking',
		url_host: 'https://alpha.carrismetropolitana.pt',
		url_path: '/views/app/startup/messages/abc/?locale=pt&appVersion=1.2.3',
	},
	{
		max_build: 1,
		min_build: 2,
		presentation_type: 'changelog',
		url_host: 'https://alpha.carrismetropolitana.pt',
		url_path: '/views/app/startup/messages/abc/?locale=pt&appVersion=1.2.3',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
