/* * */

import AlertsPage from '@/components/alerts/Page';
import { AlertsListContextProvider } from '@/contexts/alerts.list.context';

/* * */

export default function Page() {
	return (
		<AlertsListContextProvider>
			<AlertsPage />
		</AlertsListContextProvider>
	);
}
