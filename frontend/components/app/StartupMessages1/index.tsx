'use client';

/* * */

import Button from '@/components/common/Button';
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

	const t = useTranslations('app.StartupMessages1');

	//
	// B. Transform data

	const STORE_LINKS = [
		{ _id: 'ios', href: 'https://apps.apple.com/app/carris-metropolitana/id6553675889', icon: <IconBrandAppleFilled />, label: t('iphone') },
		{ _id: 'android', href: 'https://play.google.com/store/apps/details?id=pt.carrismetropolitana.mobile', icon: <IconBrandGoogleFilled />, label: t('android') },
	];

	//
	// C. Render components

	return (
		<Section heading={t('heading')} subheading={t('subheading')} withTopBorder={false} withChildrenPadding>
			<p>{t('text')}</p>
			<Button href={STORE_LINKS[0].href} label="jsdhfi" />
		</Section>
	);

	//
}
