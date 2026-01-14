/* * */

import { cookies } from 'next/headers';

export default async function Page() {
	//

	//
	// A. Send analytics event
	const cookiesList = await cookies();

	// Extract IP address from common headers
	const sessionToken = cookiesList.get('session_token')?.value;
	await fetch('https://stats.carrismetropolitana.pt/collector/switch', {
		body: JSON.stringify({
			app_version: '1.0.0',
			short_link_destination: 'https://carrismetropolitana.pt/quiz',
			short_link_id: 'quiz_emoji',
			user_token: sessionToken,
		}),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
	});

	//
	// B. Render iframe
	return <iframe src="https://storage.carrismetropolitana.pt/static/quiz" style={{ border: 'none', display: 'flex', height: '100vh', margin: 0, padding: 0, width: '100vw' }} />;
}
