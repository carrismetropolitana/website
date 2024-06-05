'use client';

/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { useEffect } from 'react';

/* * */

export default function Page({ params }) {
	//

	//
	// A. Render components

	useEffect(() => {
		window.location = '/mupi/alerts/all';
	}, []);

	return (
		<OneFullColumn>
			<p>REDIRECTING TO ALL ALERTS</p>
		</OneFullColumn>
	);

	//
}
