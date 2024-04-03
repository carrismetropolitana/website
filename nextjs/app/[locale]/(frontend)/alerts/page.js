/* * */

import { OneFullColumn } from '@/components/Layouts/Layouts';
import { FrontendAlertsContextProvider } from '@/contexts/FrontendAlertsContext';
import FrontendAlerts from '@/components/FrontendAlerts/FrontendAlerts';
// import FrontendAlert from '@/components/FrontendAlert/FrontendAlert';

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

export default function Page({ alert_id }) {
	//

	//
	// A. Render components

	return (
		<OneFullColumn>
			<FrontendAlertsContextProvider>
				{/* {alert_id=="all"?<FrontendAlerts />:<FrontendAlert alert_id={alert_id}/>} */}
				<FrontendAlerts />
			</FrontendAlertsContextProvider>
		</OneFullColumn>
	);

	//
}