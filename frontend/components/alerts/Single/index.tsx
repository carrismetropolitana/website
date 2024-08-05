/* * */

import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

/* * */

export default function Component({ alert_id }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.Page');

	//
	// B. Render components

	return (
		<>
			<Section backButtonUrl="/alerts" heading={t('heading')} subheading={t('subheading')} withTopBorder={false} />
			<Section withChildrenPadding>
				title: {alert_id}
			</Section>
			<Section withTopBorder={false}>
				content0
			</Section>
		</>
	);

	//
}
