/* * */

import AlertsSingle from '@/components/alerts/Single';
import { AlertsContextProvider } from '@/contexts/alerts.context';

/* * */

export default function Page({ params: { alert_id } }) {
	return (
		<AlertsContextProvider>
			<AlertsSingle alert_id={alert_id} />
		</AlertsContextProvider>
	);
}
