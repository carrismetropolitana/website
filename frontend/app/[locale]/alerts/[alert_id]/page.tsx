/* * */

import AlertsDetail from '@/components/alerts/AlertsDetail';
import { AlertsListContextProvider } from '@/contexts/AlertsList.context';

/* * */

export default function Page({ params: { alert_id } }) {
	return (
		<AlertsListContextProvider>
			<AlertsDetail alertId={alert_id} />
		</AlertsListContextProvider>
	);
}
