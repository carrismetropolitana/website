/* * */

import FrontendAlert from '@/components/FrontendAlert/FrontendAlert';
import { OneFullColumn } from '@/components/Layouts/Layouts';

/* * */

export async function generateMetadata({ params }) {
	switch (params.locale) {
		case 'pt':
			return { description: 'Fique a par das alterações de serviço da Carris Metropolitana', title: 'Alertas de Serviço' };
		default:
		case 'en':
			return { description: 'Stay informed about service changes from Carris Metropolitana', title: 'Service Alerts' };
	}
}

/* * */

export default function Page({ params: { alert_id, locale } }) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendAlert alertId={alert_id} locale={locale} />
		</OneFullColumn>
	);

	//
}
