/* * */

import { NewsDetailPreview } from '@/components/news/NewsDetailPreview';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';

/* * */

export const dynamic = 'force-dynamic';

/* * */

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
	//
	const params = await searchParams;
	const newsId = params?.id;

	if (!newsId) {
		return (
			<div style={{ padding: '2rem' }}>
				<p>No news ID provided for preview</p>
			</div>
		);
	}

	const payloadUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/news/${newsId}?depth=2&draft=true`;

	let newsData = null;
	try {
		const res = await fetch(payloadUrl, {
			cache: 'no-store',
			headers: { Accept: 'application/json' },
		});
		if (res.ok) {
			newsData = await res.json();
		}
	}
	catch (error) {
		console.error('Failed to fetch preview data:', error);
	}

	return <NewsDetailPreview initialData={newsData} />;
}
