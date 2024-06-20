'use client';

/* * */

import pjson from 'package.json';
import { useEffect } from 'react';
import useSWR from 'swr';

/* * */

export default function AppVersion() {
	//

	//
	// A. Fetch data

	const { data: version } = useSWR('/api/version', { refreshInterval: 1000 });

	//
	// B. Handle actions

	useEffect(() => {
		if (version && version.latest !== pjson.version) {
			window.location.reload();
		}
	}, [version]);

	//
	// C. Render components

	return <div />;

	//
}
