'use client';

/* * */

import AlertsList from '@/components/alerts/AlertsList';
import Toolbar from '@/components/alerts/Toolbar';
import Section from '@/components/layout/Section';
import { AlertsContextProvider } from '@/contexts/alerts.context';
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
		<AlertsContextProvider>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} />
			<Section withChildrenPadding>
				<Toolbar />
			</Section>
			<Section withTopBorder={false}>
				<AlertsList />
			</Section>
		</AlertsContextProvider>
	);

	//
}
