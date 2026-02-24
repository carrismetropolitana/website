'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { Section } from '@/components/layout/Section';
import { Skeleton } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface CampaignDetailHeaderProps {
	campaignData?: CampaignData | null
}

/* * */

export function CampaignDetailHeader({ campaignData }: CampaignDetailHeaderProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.SinglePageHeader');
	const formattedDate = campaignData?.publishedAt ? DateTime.fromISO(campaignData.publishedAt).toJSDate() : undefined;

	//
	// B. Render Components

	if (!campaignData) {
		return (
			<Section withGap withPadding>
				<Skeleton className={styles.titleSkeleton} />
				<Skeleton className={styles.publishDateSkeleton} />
			</Section>
		);
	}

	return (
		<Section withBottomDivider withGap withPadding>
			<h1 className={styles.title}>{campaignData.title}</h1>
			{formattedDate && (
				<p className={styles.publishDate}>{t('publish_date', { published_at: formattedDate })}</p>
			)}
		</Section>
	);

	//
}
