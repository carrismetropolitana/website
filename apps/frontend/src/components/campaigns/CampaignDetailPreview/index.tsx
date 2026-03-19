'use client';

/* * */

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetail/CampaignDetailContent';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { CampaignData } from '@/types/campaign.types';
import { useEffect, useState } from 'react';

/* * */

interface Props {
	initialData: CampaignData | null
}

/* * */

export function CampaignDetailPreview({ initialData }: Props) {
	//

	//
	// A. Setup variables

	const [campaignData, setCampaignData] = useState<CampaignData | null>(initialData);
	//
	// B. Transform Data

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const { data, type } = event.data || {};
			if (type !== 'payload-live-preview' || !data) return;
			setCampaignData(prev => ({ ...(prev || {}), ...data }));
		};

		window.addEventListener('message', handleMessage);
		if (window.parent !== window) {
			window.parent.postMessage({ ready: true, type: 'payload-live-preview' }, '*');
		}
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	//
	// C. Render Components

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

	//
}
