/* * */

import AlertsSingle from '@/components/alerts/Single';
import { AlertsListContextProvider } from '@/contexts/AlertsList.context';

/* * */

export default function Page({ params: { alert_id } }) {
	return (
		<AlertsListContextProvider>
			<AlertsSingle alertId={alert_id} />
		</AlertsListContextProvider>
	);
}
