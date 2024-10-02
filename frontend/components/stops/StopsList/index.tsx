'use client';

/* * */

import { StopsListToolbar } from '@/components/stops/StopsListToolbar';
import { StopsListViewAll } from '@/components/stops/StopsListViewAll';
import { StopsListViewFavorites } from '@/components/stops/StopsListViewFavorites';
import { StopsListViewSkeleton } from '@/components/stops/StopsListViewSkeleton';
import { useStopsListContext } from '@/contexts/StopsList.context';

/* * */

export function StopsList() {
	//

	//
	// A. Setup variables

	const stopsContext = useStopsListContext();

	//
	// B. Render components

	return (
		<>
			<StopsListToolbar />
			{stopsContext.flags.is_loading && <StopsListViewSkeleton />}
			{(!stopsContext.flags.is_loading && stopsContext.filters.by_current_view === 'all') && <StopsListViewAll />}
			{(!stopsContext.flags.is_loading && stopsContext.filters.by_current_view === 'favorites') && <StopsListViewFavorites />}
		</>
	);

	//
}
