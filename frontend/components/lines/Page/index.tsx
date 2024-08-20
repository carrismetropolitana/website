'use client';

/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
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
				<Section withTopBorder={true} withTopPadding={false}>
					{[200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
						<RegularListItem key={index} href="#">
							<LineDisplay width={width} />
						</RegularListItem>
					))}
				</Section>
			)}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'all') && <ListAll />}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'favorites') && <ListFavorites />}
		</>
	);

	//
}
