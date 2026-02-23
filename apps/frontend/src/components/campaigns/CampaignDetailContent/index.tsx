'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { CampaignLayoutRenderer } from '@/components/campaigns/CampaignLayoutRenderer';

import styles from './styles.module.css';

/* * */

interface CampaignDetailContentProps {
	data: CampaignData
}

export function CampaignDetailContent({ data }: CampaignDetailContentProps) {
	const layout = data.layout ?? [];

	return (
		<section className={styles.content}>
			<CampaignLayoutRenderer blocks={layout} />
		</section>
	);
}
