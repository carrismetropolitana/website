/* * */

import { AppViewport } from '@/components/viewport/AppViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { appAndroidTheme } from '@/themes/app-android/app-android.theme';

/* * */

export default function Layout({ children }) {
	return (
		<ConfigProviders>
			<ThemeProviders themeData={appAndroidTheme} themeId="app-android">
				<AppViewport>
					{children}
				</AppViewport>
			</ThemeProviders>
		</ConfigProviders>
	);
}
