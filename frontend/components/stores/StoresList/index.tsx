'use client';

/* * */

import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import StoresListGroups from '@/components/stores/StoresListGroups';
import StoresListMap from '@/components/stores/StoresListMap';
import StoresListToolbar from '@/components/stores/StoresListToolbar';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresList');

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} subheading={t('subheading')} withGap={false} withTopBorder={false} withChildrenPadding>
				<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('external_link')} target="_blank" />
			</Section>
			<Section withTopPadding={false} withChildrenPadding>
				<StoresListToolbar />
			</Section>
			<Section childrenWrapperStyles={styles.contentWrapper} withTopBorder={false} withTopPadding={false}>
				<div className={styles.groupsWrapper}>
					<StoresListGroups />
				</div>
				<div className={styles.mapWrapper}>
					<StoresListMap />
				</div>
			</Section>
		</>
	);

	//
}
