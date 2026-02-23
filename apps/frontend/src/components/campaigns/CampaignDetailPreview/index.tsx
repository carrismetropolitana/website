'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLivePreviewData } from '@/hooks/useLivePreviewData';
import { CampaignData } from '@/types/campaign.types';

import styles from '../NewsDetail/styles.module.css';

import { CampaignDetailContent } from '../CampaignDetailContent';
import { CampaignDetailHeader } from '../CampaignDetailHeader';

/* * */

interface CampaignDetailPreviewProps {
	initialData: CampaignData
}

/* * */

export function CampaignDetailPreview({ initialData }: CampaignDetailPreviewProps) {
	const { campaignData } = useLivePreviewData(initialData);

	if (!campaignData) {
		return (
			<Surface>
				<Section withPadding>
					<div>Loading preview...</div>
				</Section>
			</Surface>
		);
	}

	return (
		<Surface>
			<CampaignDetailHeader title={campaignData.title} />

			<Section withPadding>
				<div className={styles.innerWrapper}>
					<CampaignDetailContent data={campaignData} />
				</div>
			</Section>
		</Surface>
	);
}
