/* * */

import GridNav from '@/components/layout/GridNav';
import Section from '@/components/layout/Section';
import { IconBrandAppleFilled, IconBrandGoogleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('app.Page');

	//
	// B. Transform data

	const STORE_LINKS = [
		{ _id: 'iphone', href: 'https://testflight.apple.com/join/pfknh1Xu', icon: <IconBrandAppleFilled />, label: t('iphone') },
		{ _id: 'android', href: 'https://storage.carrismetropolitana.pt/static/app/app-release.apk', icon: <IconBrandGoogleFilled />, label: t('android') },
	];

	//
	// C. Render components

	return (
		<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false}>
			<GridNav className={styles.gridNavOverride} items={STORE_LINKS} />
		</Section>
	);

	//
}
