/* * */

import { NewsDetail } from '@/components/news/NewsDetail';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { news_id } = await params;

	//
	// B. Fetch data

	const newsResponse = await fetch(`${getPublicVariable('server_url_backoffice')}/admin/public-api/news/${news_id}`);
	const newsData = await newsResponse.json();

	//
	// C. Render components

	return {
		description: 'Leia a notícia completa em www.cmetropolitana.pt',
		title: newsData.title,
	};

	//
}

/* * */

export default async function Page({ params }) {
	const { news_id } = await params;
	return <NewsDetail newsId={news_id} />;
}
