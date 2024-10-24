'use client';

/* * */

import { EnvironmentContextProvider } from '@/contexts/Environment.context';
import websiteTheme from '@/themes/website/website.theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/pt';
import { DatesProviderValue } from 'node_modules/@mantine/dates/lib/components/DatesProvider/DatesProvider';

/* * */

export function ThemeProviders({ children }) {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: Partial<DatesProviderValue> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// B. Render components

	return (
		<MantineProvider defaultColorScheme="auto" theme={websiteTheme}>
			<DatesProvider settings={mantineDatesSettings}>
				<ModalsProvider>
					<EnvironmentContextProvider value="website">
						{children}
					</EnvironmentContextProvider>
				</ModalsProvider>
			</DatesProvider>
		</MantineProvider>
	);

	//
}
