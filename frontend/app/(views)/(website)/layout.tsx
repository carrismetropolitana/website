/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { ConfigProviders } from '@/providers/config-providers';
import { DataProviders } from '@/providers/data-providers';
import { MapProviders } from '@/providers/map-providers';
import { ProfileProviders } from '@/providers/profile-providers';
import { ThemeProviders } from '@/providers/theme-providers';
import { websiteTheme } from '@/themes/website/website.theme';
import { Notifications } from '@mantine/notifications';

/* * */

export default function Layout({ children }) {
	return (
		<ConfigProviders>
			<ProfileProviders>
				<ThemeProviders themeData={websiteTheme} themeId="website">
					<DataProviders>
						<MapProviders>
							<Notifications styles={{ root: { marginTop: '60px' } }} />
							<WebsiteViewport>
								{children}
							</WebsiteViewport>
						</MapProviders>
					</DataProviders>
				</ThemeProviders>
			</ProfileProviders>
		</ConfigProviders>
	);
}
