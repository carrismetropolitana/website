'use client';
/* * */

import { CampaignDetailContent } from '@/components/campaigns/CampaignDetailContent';
import { CampaignDetailHeader } from '@/components/campaigns/CampaignDetailHeader';
import { BackButton } from '@/components/common/BackButton';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useCampaignsListContext } from '@/contexts/CampaignsList.context';
import { transformCampaignPayloadData } from '@/utils/livePreviewTransform';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface CampaignDetailProps {
	slug: string
}

export function CampaignDetail({ slug }: CampaignDetailProps) {
	const campaignsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${slug}`;
	const { data: rawData, isLoading } = useSWR(campaignsApiUrl);
	const listContext = useCampaignsListContext();

	function hasBodyContent(body: unknown): boolean {
		if (!body) return false;
		if (typeof body === 'string') {
			if (body === '{}') return false;
			try {
				const p = JSON.parse(body) as { root?: { children?: unknown[] } };
				return Array.isArray(p?.root?.children) && p.root.children.length > 0;
			}
			catch { return false; }
		}
		const root = (body as { root?: { children?: unknown[] } })?.root;
		return Array.isArray(root?.children) && root.children.length > 0;
	}

	const rawDataWithFallback = (() => {
		if (rawData && hasBodyContent(rawData.body)) return rawData;
		const fromList = listContext?.data.raw.find(c => c.slug === slug);
		return (fromList as typeof rawData) ?? rawData;
	})();

	const campaignData = rawDataWithFallback ? transformCampaignPayloadData(rawDataWithFallback) : null;

	return (
		<Surface>
			<Section withBottomDivider withPadding>
				<BackButton />
			</Section>

			<CampaignDetailHeader campaignData={campaignData} />

			<Section withPadding>
				<div className={styles.innerWrapper}>
					{!isLoading && campaignData && (
						<>
							<CampaignDetailContent data={campaignData} />
						</>
					)}
				</div>
			</Section>
		</Surface>
	);
}
