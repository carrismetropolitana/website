'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Image } from '@mantine/core';

/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export function TapAndRideHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('tap-and-ride');

	//
	// B. Render Components

	return (
		<>
			<Image alt="Tap and Ride" className={styles.image} src="/assets/tap-and-ride/tap-and-ride_banner.png" />
			<Section withPadding>
				<div className={styles.headerContent}>
					<p className={styles.title}>{t('heading')}</p>
					<p className={styles.subheading}>{t('subheading')}</p>
				</div>
			</Section>
		</>
	);

	//
}
