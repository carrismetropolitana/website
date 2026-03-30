'use client';

/* * */

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetail/CampaignDetailContent';
import { CampaignData } from '@/types/campaign.types';
import { transformCampaignPayloadData } from '@/utils/livePreviewTransform';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useMemo } from 'react';
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
	const normalizedCampaignData = useMemo(() => campaignData ? transformCampaignPayloadData(campaignData) : null,
		[campaignData],
	);

	//
	// B. Render components

	return <CampaignDetailContent data={normalizedCampaignData} />;

	//
}
