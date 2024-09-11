/* * */

import AlertsListGroup from '@/components/alerts/AlertsListGroup';
import AlertsListToolbar from '@/components/alerts/AlertsListToolbar';
import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsList');

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} />
			<AlertsListToolbar />
			<Section withTopBorder={false}>
				<AlertsListGroup />
			</Section>
		</>
	);

	//
}
