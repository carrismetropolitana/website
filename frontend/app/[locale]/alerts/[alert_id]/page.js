/* * */

import AlertsSingle from '@/components/alerts/Single';

/* * */

export default function Page({ params: { alert_id } }) {
	return <AlertsSingle alert_id={alert_id} />;
}
