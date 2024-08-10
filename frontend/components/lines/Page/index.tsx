'use client';

/* * */

import Section from '@/components/layout/Section';
import ListAll from '@/components/lines/ListAll';
import ListFavorites from '@/components/lines/ListFavorites';
import PageToolbar from '@/components/lines/PageToolbar';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.Page');
	const linesContext = useLinesListContext();

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} />
			<PageToolbar />
			{linesContext.flags.is_loading && (
				<Section withTopBorder={false} withTopPadding={false}>
					loading...
				</Section>
			)}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'all') && <ListAll />}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'favorites') && <ListFavorites />}
		</>
	);

	//
}
