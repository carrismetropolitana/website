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

	const stopsListContext = useStopsListContext();

	//
	// B. Render components

	return (
		<>
			<StopsListToolbar />
			{!stopsListContext.flags.is_loading && <StopsListViewSkeleton />}
			{/* {(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'all') && <StopsListViewAll />}
			{(!stopsListContext.flags.is_loading && stopsListContext.filters.by_current_view === 'favorites') && <StopsListViewFavorites />} */}
		</>
	);

	//
}
