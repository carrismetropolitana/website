/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import FrontendAlert from '@/components/FrontendAlert/FrontendAlert';

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

export default function Page({ params: { alert_id, locale } }) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendAlert alertId={alert_id} locale={locale}/>
		</OneFullColumn>
	);

	//
}