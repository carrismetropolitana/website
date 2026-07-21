'use client';
/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLivePreviewData } from '@/hooks/useLivePreviewData';
import { CampaignData } from '@/types/campaign.types';

import { CampaignDetailContent } from '../CampaignDetail/CampaignDetailContent';

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
		<CampaignDetailContent data={campaignData} />
	);
}
