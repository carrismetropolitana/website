import { getTranslations } from 'next-intl/server';

import FrontendPlannerVideo from '../FrontendPlannerVideo/FrontendPlannerVideo';
import Panel from '../Panel/Panel';

export default async function FrontendPlanner() {
	let t = await getTranslations('FrontendPlanner');
	return (
		<Panel rightSection={<FrontendPlannerVideo />} title={t('Panel_title')}>
			<iframe allow="geolocation 'src' 'self' https://moovitapp.com" src="https://moovitapp.com?customerId=3j8VGq2ULSUEr275vf81zA&amp;metroId=2460&amp;lang=pt" style={{ border: 'none', height: '600px', width: '100%' }} />
		</Panel>
	);
}
