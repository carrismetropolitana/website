/* * */

import { WebsiteViewport } from '@/components/viewport/WebsiteViewport';
import { EnvironmentContextProvider } from '@/contexts/Environment.context';
import { Notifications } from '@mantine/notifications';

import Providers from './providers';

/* * */

export default function Layout({ children }) {
	return (
		<Providers>
			<EnvironmentContextProvider value="website">
				<Notifications styles={{ root: { marginTop: '60px' } }} />
				<WebsiteViewport>
					{children}
				</WebsiteViewport>
			</EnvironmentContextProvider>
		</Providers>
	);
}
