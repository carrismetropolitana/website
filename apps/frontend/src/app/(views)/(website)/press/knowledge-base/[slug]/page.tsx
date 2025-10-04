/* * */

import { PressKnowledgeBaseDetail } from '@/components/press/PressKnowledgeBaseDetail';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type KnowledgeBase } from '@carrismetropolitana/website-shared-types';
import { type Metadata } from 'next';

/* * */

export async function generateMetadata({ params }): Promise<Metadata> {
	//

	//
	// A. Setup variables

	const { slug } = await params;

	//
	// B. Fetch data

	try {
		const itemResponse = await fetch(`${getPublicVariable('server_url_backoffice')}/admin/public-api/knowledge-base/${slug}`);

		if (!itemResponse.ok) {
			return {
				description: 'Item da base de conhecimento não encontrado',
				title: 'Item não encontrado',
			};
		}

		const itemData: KnowledgeBase = await itemResponse.json();

		//
		// C. Return metadata

		return {
			description: itemData.seo?.metaDescription || `Aceda ao recurso: ${itemData.title}`,
			openGraph: {
				description: itemData.seo?.metaDescription || `Aceda ao recurso: ${itemData.title}`,
				images: itemData.seo?.ogImage?.url ? [itemData.seo.ogImage.url] : [],
				title: itemData.seo?.metaTitle || itemData.title,
			},
			title: itemData.seo?.metaTitle || itemData.title,
		};
	}
	catch {
		return {
			description: 'Item da base de conhecimento não encontrado',
			title: 'Item não encontrado',
		};
	}

	//
}

/* * */

export default async function Page({ params }) {
	const { slug } = await params;
	return <PressKnowledgeBaseDetail slug={slug} />;
}

