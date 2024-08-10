/* * */

import AlertsPage from '@/components/alerts/Page';
import { AlertsListContextProvider } from '@/contexts/AlertsList.context';

/* * */

export default function Page() {
	return (
		<AlertsListContextProvider>
			<AlertsPage />
		</AlertsListContextProvider>
	);
}
