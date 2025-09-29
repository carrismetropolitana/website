'use client';

/* * */

import { ConfigProviders } from '@/providers/config-providers';
import { DataProviders } from '@/providers/data-providers';
import { RootProviders } from '@/providers/root-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { websiteTheme } from '@/themes/website/website.theme';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

/* * */

export default function Layout({ children }) {
	return (
		<NuqsAdapter>
			<RootProviders>
				<ConfigProviders>
					<ThemeProviders themeData={websiteTheme} themeId="website">
						<DataProviders>
							{children}
						</DataProviders>
					</ThemeProviders>
				</ConfigProviders>
			</RootProviders>
		</NuqsAdapter>
	);
}
