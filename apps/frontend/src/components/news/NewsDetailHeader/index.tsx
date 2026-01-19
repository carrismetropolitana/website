'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Skeleton } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function NewsDetailHeader({ newsData }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.SinglePageHeader');

	//
	// B. Transform data

	const formattedDate = DateTime.fromISO(newsData?.published_at).toJSDate();

	//
	// C. Render components

	if (!newsData) {
		return (
			<Section withGap withPadding>
				<Skeleton className={styles.titleSkeleton} />
				<Skeleton className={styles.publishDateSkeleton} />
			</Section>
		);
	}

	return (
		<Section withBottomDivider withGap withPadding>
			<h1 className={styles.title} dangerouslySetInnerHTML={{ __html: newsData?.title || 'title' }} />
			<p className={styles.publishDate}>{t('publish_date', { published_at: formattedDate })}</p>
		</Section>
	);

	//
}
