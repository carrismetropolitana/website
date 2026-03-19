'use client';

/* * */

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetail/CampaignDetailContent';
import { Section } from '@/components/layout/Section';
import { CampaignData } from '@/types/campaign.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

/* * */

interface Props {
	slug: string
}

/* * */

export function CampaignDetail({ slug }: Props) {
	const campaignApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${slug}`;
	const { data: campaignData } = useSWR<CampaignData>(campaignApiUrl);

	return (
		<Section withPadding>
			<CampaignDetailContent data={campaignData} />
		</Section>
	);
}
