/* * */

import { AppViewport } from '@/components/viewport/AppViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { appNaveganteTheme } from '@/themes/app-navegante/app-navegante.theme';

/* * */

export default function Layout({ children }) {
	return (
		<ConfigProviders>
			<ThemeProviders themeData={appNaveganteTheme} themeId="app-navegante-ios">
				<AppViewport>
					{children}
				</AppViewport>
			</ThemeProviders>
		</ConfigProviders>
	);
}
