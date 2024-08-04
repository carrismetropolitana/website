'use client';

/* * */

import Button from '@/components/common/Button';
import Section from '@/components/layout/Section';
import StoresList from '@/components/stores/StoresList';
import Toolbar from '@/components/stores/Toolbar';
import { StoresContextProvider } from '@/contexts/stores.context';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.Page');

	//
	// B. Render components

	return (
		<StoresContextProvider>
			<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
				<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('external_link')} target="_blank" />
			</Section>
			<Section withChildrenPadding>
				<Toolbar />
			</Section>
			<Section withTopBorder={false}>
				<StoresList />
			</Section>
		</StoresContextProvider>
	);

	//
}
