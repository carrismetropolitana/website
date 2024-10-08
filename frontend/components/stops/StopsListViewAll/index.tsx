/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { StopDisplay } from '@/components/stops/StopDisplay';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { RoutesSchedule } from '@/utils/routes';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

/* * */

const rowMeasurementsCache = new CellMeasurerCache({
	defaultHeight: 92,
	fixedWidth: true,
});

/* * */

export function StopsListViewAll() {
	//

	//
	// A. Setup variables

	const stopsListContext = useStopsListContext();

	//
	// B. Handle actions

	function handleResize() {
		rowMeasurementsCache.clearAll();
	}

	//
	// C. Render components

	return (
		<Surface forceOverflow>
			<Section>
				<AutoSizer disableHeight={true} onResize={handleResize}>
					{({ width }) => (
						<WindowScroller>
							{({ height, isScrolling, registerChild, scrollTop }) => (
								<div ref={registerChild as (element: Element | null) => void /* It works, but the types don't match up */}>
									<List
										deferredMeasurementCache={rowMeasurementsCache}
										height={height}
										isScrolling={isScrolling}
										rowCount={stopsListContext.data.filtered.length}
										rowHeight={rowMeasurementsCache.rowHeight}
										scrollTop={scrollTop}
										width={width}
										rowRenderer={({ index, key, parent, style }) => {
											const stopData = stopsListContext.data.filtered[index];
											return stopData && (
												<CellMeasurer key={key} cache={rowMeasurementsCache} index={index} parent={parent}>
													{({ registerChild }) => (
														<RegularListItem key={stopData.id} href={`${RoutesSchedule.STOPS.route}/${stopData.id}`} refFn={(element: Element | null) => registerChild && registerChild(element || undefined)} style={style}>
															<StopDisplay stop={stopData} />
														</RegularListItem>
													)}
												</CellMeasurer>
											);
										}}
										autoHeight
									/>
								</div>
							)}
						</WindowScroller>
					)}
				</AutoSizer>
			</Section>
		</Surface>
	);

	//
}
