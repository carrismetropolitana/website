'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { useLocaleContext } from '@/contexts/Locale.context';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function TapAndRideHeader() {
	//

	//
	// A. Setup variables

	const localeContext = useLocaleContext();
	const t = useTranslations('tap-and-ride');
	const bannerImageSrc = localeContext.data.current_locale.includes('pt') ? '/assets/tap-and-ride/AF_CUT_BannerS_PT.png' : '/assets/tap-and-ride/AF_CUT_BannerS_ENG.png';

	//
	// B. Render Components

	return (
		<>
			<Image alt="Tap and Ride" className={styles.image} src={bannerImageSrc} />
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
