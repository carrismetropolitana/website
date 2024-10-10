/* * */

import { AlertsListContextProvider } from '@/contexts/AlertsList.context';

/* * */

export default function Layout({ children }) {
	return (
		<AlertsListContextProvider>
			{children}
		</AlertsListContextProvider>
	);
}
