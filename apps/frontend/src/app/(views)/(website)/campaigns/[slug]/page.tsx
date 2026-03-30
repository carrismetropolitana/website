/* * */

import { CampaignDetail } from '@/components/campaigns/CampaignDetail';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	const { slug } = await params;

	try {
		const response = await fetch(`${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${slug}`);

		if (!response.ok) {
			return {
				description: 'Campanha não encontrada',
				title: 'Campanha não encontrada',
			};
		}

		const campaignData = await response.json();

		return {
			description: campaignData.title ? `${campaignData.title} | Carris Metropolitana` : 'Carris Metropolitana',
			title: campaignData.title ?? 'Campanha',
		};
	}
	catch {
		return {
			description: 'Campanha não encontrada',
			title: 'Campanha não encontrada',
		};
	}
}

/* * */

export default async function Page({ params }) {
	const { slug } = await params;
	return <CampaignDetail slug={slug} />;
}
