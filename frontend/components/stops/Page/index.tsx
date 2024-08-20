'use client';

/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import ListAll from '@/components/stops/ListAll';
import ListFavorites from '@/components/stops/ListFavorites';
import PageToolbar from '@/components/stops/PageToolbar';
import StopDisplay from '@/components/stops/StopDisplay';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.Page');
	const stopsContext = useStopsListContext();

	//
	// B. Render components

	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} />
			<PageToolbar />
			{stopsContext.flags.is_loading && (
				<Section withTopBorder={false} withTopPadding={false}>
					{[200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
						<RegularListItem key={index} href="#">
							<StopDisplay width={width} />
						</RegularListItem>
					))}
				</Section>
			)}
			{(!stopsContext.flags.is_loading && stopsContext.filters.by_current_view === 'all') && <ListAll />}
			{(!stopsContext.flags.is_loading && stopsContext.filters.by_current_view === 'favorites') && <ListFavorites />}
		</>
	);

	//
}
