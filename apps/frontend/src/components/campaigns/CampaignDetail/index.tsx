'use client';
/* * */

import type { CampaignData } from '@/types/campaign.types';

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetailContent';
import { CampaignDetailHeader } from '@/components/campaigns/CampaignDetailHeader';
import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

/* * */

interface CampaignDetailProps {
	slug: string
}

export function CampaignDetail({ slug }: CampaignDetailProps) {
	const campaignsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${slug}`;
	const { data: campaignData, isLoading } = useSWR<CampaignData>(campaignsApiUrl);

	return (
		<Surface>
			<Section withBottomDivider withPadding>
				<BackButton />
			</Section>

			<CampaignDetailHeader title={campaignData?.title} />

			<Section withPadding>
				{!isLoading && campaignData && (
					<CampaignDetailContent data={campaignData} />
				)}
			</Section>
		</Surface>
	);
}
