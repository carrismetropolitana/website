'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetailContent';
import { CampaignDetailHeader } from '@/components/campaigns/CampaignDetailHeader';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLivePreviewData } from '@/hooks/useLivePreviewData';

/* * */

interface CampaignDetailPreviewProps {
	initialData: CampaignData
}

/* * */

export function CampaignDetailPreview({ initialData }: CampaignDetailPreviewProps) {
	//

	//
	// A. Setup Variables

	const { campaignData } = useLivePreviewData(initialData);

	//
	// B. Render Components

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
				<CampaignDetailContent data={campaignData} />
			</Section>
		</Surface>
	);

	//
}
