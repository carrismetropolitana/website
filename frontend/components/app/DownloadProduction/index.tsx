/* * */

import GridNav from '@/components/layout/GridNav';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconBrandAppleFilled, IconBrandGoogleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app.DownloadProduction');

	//
	// B. Transform data

	const STORE_LINKS = [
		{ _id: 'iphone', href: 'https://apps.apple.com/app/carris-metropolitana/id6553675889', icon: <IconBrandAppleFilled />, label: t('iphone') },
		{ _id: 'android', href: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile', icon: <IconBrandGoogleFilled />, label: t('android') },
	];

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')}>
				<GridNav className={styles.gridNavOverride} items={STORE_LINKS} />
			</Section>
		</Surface>
	);

	//
}
