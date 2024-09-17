/* * */

import type { StartupMessage } from '@/types/app.types';

/* * */

const appStartupMessages: StartupMessage[] = [
	{
		build_max: 1826481590,
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
		url_path: '/views/app/startup/messages/abc/?locale=pt&appVersion=1.2.3',
	},
];

/* * */

export async function GET() {
	return Response.json(appStartupMessages);
}
