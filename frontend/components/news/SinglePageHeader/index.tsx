'use client';

/* * */

import Section from '@/components/layout/Section';
import { Skeleton } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ newsData }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.SinglePageHeader');

	//
	// B. Render Components

	if (!newsData) {
		return (
			<Section childrenWrapperStyles={styles.container} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
				<Skeleton className={styles.titleSkeleton} />
				<Skeleton className={styles.publishDateSkeleton} />
			</Section>
		);
	}

	return (
		<Section childrenWrapperStyles={styles.container} withGap={false} withTopBorder={false} backRouter withChildrenPadding>
			<h1 className={styles.title}>{newsData?.title || 'title'}</h1>
			<p className={styles.publishDate}>{t('publish_date', { value: newsData?.date })}</p>
		</Section>
	);

	//
}
