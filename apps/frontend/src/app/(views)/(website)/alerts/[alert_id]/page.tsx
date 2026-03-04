/* * */

import { AlertsDetail } from '@/components/alerts/AlertsDetail';
import { type Alert } from '@carrismetropolitana/api-types/alerts';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// Extract the alert_id from the URL params.

	const { alert_id } = await params;

	//
	// Fetch alerts data to get the specific alert's
	// header text for the page title and description.
	// If fetching fails, return default metadata.

	try {
		//

		const allAlertsResponse = await fetch(`${getPublicVariable('api_url')}/alerts`);

		if (!allAlertsResponse.ok) throw new Error('Failed to fetch alerts');

		const allAlertsData: Alert[] = await allAlertsResponse.json();

		const alertData = allAlertsData.find(item => item['alert_id'] === alert_id);

		return {
			description: 'Leia o alerta completo em carrismetropolitana.pt',
			title: alertData.header_text.translation.pop().text,
		};

		//
	}
	catch {
		return {
			description: 'Leia o alerta completo em carrismetropolitana.pt',
			title: 'Alerta de Serviço',
		};
	}

	//
}

/* * */

export default async function Page({ params }) {
	const { alert_id } = await params;
	return <AlertsDetail alertId={alert_id} />;
}
