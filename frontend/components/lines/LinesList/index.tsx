'use client';

/* * */

import { Surface } from '@/components/layout/Surface';
import LinesListToolbar from '@/components/lines/LinesListToolbar';
import LinesListViewAll from '@/components/lines/LinesListViewAll';
import LinesListViewFavorites from '@/components/lines/LinesListViewFavorites';
import LinesListViewSkeleton from '@/components/lines/LinesListViewSkeleton';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useTranslations } from 'next-intl';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesListToolbar');

	const linesContext = useLinesListContext();

	//
	// B. Render components

	return (
		<Surface forceOverflow>
			<LinesListToolbar />
			{linesContext.flags.is_loading && <LinesListViewSkeleton />}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'all') && <LinesListViewAll />}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'favorites') && <LinesListViewFavorites />}
		</Surface>
	);

	//
}
