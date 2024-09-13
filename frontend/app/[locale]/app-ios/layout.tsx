/* * */

import AppWrapper from '@/components/viewport/AppWrapper';
import { EnvironmentContextProvider } from '@/contexts/Environment.context';

import Providers from './providers';

/* * */

export default function Layout({ children }) {
	return (
		<Providers>
			<AppWrapper>
				<EnvironmentContextProvider value="app-ios">
					{children}
				</EnvironmentContextProvider>
			</AppWrapper>
		</Providers>
	);
}
