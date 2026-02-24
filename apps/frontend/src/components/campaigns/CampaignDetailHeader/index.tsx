'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { Section } from '@/components/layout/Section';
import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface CampaignDetailHeaderProps {
	campaignData?: CampaignData | null
}

/* * */

export function CampaignDetailHeader({ campaignData }: CampaignDetailHeaderProps) {
	//

	//
	// A. Render Components

	if (!campaignData) {
		return (
			<Section withGap withPadding>
				<Skeleton className={styles.titleSkeleton} />
			</Section>
		);
	}

	return (
		<Section withBottomDivider withGap withPadding>
			<h1 className={styles.title}>{campaignData.title}</h1>
		</Section>
	);

	//
}
