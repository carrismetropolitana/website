/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		max_build: 1,
		min_build: 2,
		presentation_type: 'breaking',
		url: 'https://alpha.carrismetropolitana.pt/views/app/startup/messages/abc/?locale=pt&appVersion=1.2.3',
	},
	{
		max_build: 1,
		min_build: 2,
		presentation_type: 'changelog',
		url: 'https://apple.com',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
