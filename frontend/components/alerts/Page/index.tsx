/* * */

import AlertsList from '@/components/alerts/AlertsList';
import Toolbar from '@/components/alerts/Toolbar';
import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.Page');

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} />
			<Section withTopPadding={false} withChildrenPadding>
				<Toolbar />
			</Section>
			<Section withTopBorder={false} withTopPadding={false}>
				<AlertsList />
			</Section>
		</>
	);

	//
}
