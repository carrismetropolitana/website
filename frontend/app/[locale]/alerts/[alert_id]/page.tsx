/* * */

import AlertsSingle from '@/components/alerts/Single';
import { AlertsListContextProvider } from '@/contexts/alerts.list.context';

/* * */

export default function Page({ params: { alert_id } }) {
	return (
		<AlertsListContextProvider>
			<AlertsSingle alert_id={alert_id} />
		</AlertsListContextProvider>
	);
}