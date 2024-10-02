/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		build_max: 1,
		build_min: null,
		message_id: 'IOS-0001',
		presentation_type: 'changelog',
		url_host: 'https://alpha.carrismetropolitana.pt/',
		url_path: '/app-ios/startup/message-1',
	},
	{
		build_max: 1,
		build_min: 2,
		message_id: 'IOS-0002',
		presentation_type: 'changelog',
		url_host: 'https://alpha.carrismetropolitana.pt/',
		url_path: '/app-ios/startup/message-1',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
