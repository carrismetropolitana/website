/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendAlerts from '@/components/FrontendAlerts/FrontendAlerts';

/* * */

export async function generateMetadata({ params }) {
	switch (params.locale) {
		case 'pt':
			return { title: 'Alertas de Serviço', description: 'Fique a par das alterações de serviço da Carris Metropolitana' };
		default:
		case 'en':
			return { title: 'Service Alerts', description: 'Stay informed about service changes from Carris Metropolitana' };
	}
}

/* * */

export default function Page({}) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendAlerts />
		</OneFullColumn>
	);

	//
}