/* * */

import AlertsDetail from '@/components/alerts/AlertsDetail';

/* * */

export default function Page({ params: { alert_id } }) {
	return (
		<AlertsDetail alertId={alert_id} />
	);
}
