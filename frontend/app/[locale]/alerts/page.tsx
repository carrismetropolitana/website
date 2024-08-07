/* * */

import AlertsPage from '@/components/alerts/Page';
import { AlertsContextProvider } from '@/contexts/alerts.context';

/* * */

export default function Page() {
	return (
		<AlertsContextProvider>
			<AlertsPage />
		</AlertsContextProvider>
	);
}
