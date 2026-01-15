'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function Review2025Intro() {
	const t = useTranslations('review-2025.Review2025Intro');

	return (
		<Surface forceOverflow>
			<Image alt={t('alt')} className={styles.image} src="/assets/review-2025/images/banner_mobile.png" />
		</Surface>
	);
}
