import { getTranslations } from 'next-intl/server';
import Panel from '../Panel/Panel';
import FrontendPlannerVideo from '../FrontendPlannerVideo/FrontendPlannerVideo';

export default async function FrontendPlanner({}) {
	let t = await getTranslations('FrontendPlanner');
	return (
		<Panel title={t('Panel_title')} rightSection={<FrontendPlannerVideo/>}>
			<iframe style={{ width: '100%', height: '600px', border: 'none' }} src='https://moovitapp.com?customerId=3j8VGq2ULSUEr275vf81zA&amp;metroId=2460&amp;lang=pt' allow="geolocation 'src' 'self' https://moovitapp.com"></iframe>
		</Panel>
	);
}