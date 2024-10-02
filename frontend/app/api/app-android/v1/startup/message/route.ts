/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		build_max: 1,
		build_min: null,
		message_id: 'ANDROID-0082',
		presentation_type: 'breaking',
		url_host: 'https://alpha.carrismetropolitana.pt/',
		url_path: '/app-android/startup/message-1',
	},
	{
		build_max: 1,
		build_min: 2,
		message_id: 'ANDROID-0005',
		presentation_type: 'changelog',
		url_host: 'https://alpha.carrismetropolitana.pt/',
		url_path: '/app-android/startup/message-1',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
