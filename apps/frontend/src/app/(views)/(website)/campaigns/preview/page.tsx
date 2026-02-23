/* * */

import { CampaignDetailPreview } from '@/components/campaigns/CampaignDetailPreview';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

/* * */

export const dynamic = 'force-dynamic';

/* * */

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
	//
	const params = await searchParams;
	const campaignId = params?.id;

	if (!campaignId) {
		return (
			<div style={{ padding: '2rem' }}>
				<p>No campaign ID provided for preview</p>
			</div>
		);
	}

	const payloadUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/campaigns/${campaignId}?depth=2&draft=true`;

	let campaignData = null;
	try {
		const res = await fetch(payloadUrl, {
			cache: 'no-store',
			headers: { Accept: 'application/json' },
		});
		if (res.ok) {
			campaignData = await res.json();
		}
	}
	catch (error) {
		console.error('Failed to fetch preview data:', error);
	}

	return <CampaignDetailPreview initialData={campaignData} />;
}
