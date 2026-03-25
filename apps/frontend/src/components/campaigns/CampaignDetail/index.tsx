'use client';

/* * */

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetail/CampaignDetailContent';
import { CampaignData } from '@/types/campaign.types';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

/* * */

interface Props {
	slug: string
}

/* * */

export function CampaignDetail({ slug }: Props) {
	//

	//
	// A. Setup variables

	const campaignApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${slug}`;
	const { data: campaignData } = useSWR<CampaignData>(campaignApiUrl);

	//
	// B. Render components

	return <CampaignDetailContent data={campaignData} />;

	//
}
