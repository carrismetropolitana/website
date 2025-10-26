/* * */

import { PressNoteDetail } from '@/components/press/PressNoteDetail';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Note } from '@carrismetropolitana/website-shared-types';
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
		const noteResponse = await fetch(`${getPublicVariable('server_url_backoffice')}/admin/public-api/notes/${slug}`);

		if (!noteResponse.ok) {
			return {
				description: 'Nota de imprensa não encontrada',
				title: 'Nota não encontrada',
			};
		}

		const noteData: Note = await noteResponse.json();

		//
		// C. Return metadata

		return {
			description: noteData.seo?.metaDescription || `Leia a nota de imprensa: ${noteData.title}`,
			openGraph: {
				description: noteData.seo?.metaDescription || `Leia a nota de imprensa: ${noteData.title}`,
				images: noteData.seo?.ogImage?.url ? [noteData.seo.ogImage.url] : [],
				title: noteData.seo?.metaTitle || noteData.title,
			},
			title: noteData.seo?.metaTitle || noteData.title,
		};
	}
	catch {
		return {
			description: 'Nota de imprensa não encontrada',
			title: 'Nota não encontrada',
		};
	}

	//
}

/* * */

export default async function Page({ params }) {
	const { slug } = await params;
	return <PressNoteDetail slug={slug} />;
}
