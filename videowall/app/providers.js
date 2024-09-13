'use client';

/* * */

import AppVersion from '@/components/common/AppVersion';
import { theme } from '@/themes/theme';
import { MantineProvider } from '@mantine/core';
import { SWRConfig } from 'swr';

/* * */

export default function Providers({ children }) {
	//

	//
	// A. Setup SWR

	const swrOptions = {
		fetcher: async (...args) => {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
				error.description = errorDetails.description || 'No additional information was provided by the API.';
				error.status = res.status;
				throw error;
			}
			return res.json();
		},
		refreshInterval: 60000 * 5,
		revalidateOnFocus: false,
		revalidateOnMount: true,
	};

	//
	// B. Render components

	return (
		<SWRConfig value={swrOptions}>
			<MantineProvider defaultColorScheme="auto" theme={theme}>
				<AppVersion />
				{children}
			</MantineProvider>
		</SWRConfig>
	);

	//
}
