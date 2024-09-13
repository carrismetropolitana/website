/* * */

import WebsiteWrapper from '@/components/viewport/WebsiteWrapper';
import { EnvironmentContextProvider } from '@/contexts/Environment.context';
import { Notifications } from '@mantine/notifications';

import Providers from './providers';

/* * */

export default function Layout({ children }) {
	return (
		<Providers>
			<Notifications styles={{ root: { marginTop: '60px' } }} />
			<WebsiteWrapper>
				<EnvironmentContextProvider value="website">
					{children}
				</EnvironmentContextProvider>
			</WebsiteWrapper>
		</Providers>
	);
}
