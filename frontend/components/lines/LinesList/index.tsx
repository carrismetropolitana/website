'use client';

/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
import LinesListToolbar from '@/components/lines/LinesListToolbar';
import LinesListViewAll from '@/components/lines/LinesListViewAll';
import LinesListViewFavorites from '@/components/lines/LinesListViewFavorites';
import { useLinesListContext } from '@/contexts/LinesList.context';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesContext = useLinesListContext();

	//
	// B. Render components

	return (
		<>
			<LinesListToolbar />
			{linesContext.flags.is_loading && (
				<Section withTopBorder={true} withTopPadding={false}>
					{[200, 120, 180, 200, 100, 120, 250, 120, 130, 220, 90].map((width, index) => (
						<RegularListItem key={index} href="#">
							<LineDisplay width={width} />
						</RegularListItem>
					))}
				</Section>
			)}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'all') && <LinesListViewAll />}
			{(!linesContext.flags.is_loading && linesContext.filters.by_current_view === 'favorites') && <LinesListViewFavorites />}
		</>
	);

	//
}
