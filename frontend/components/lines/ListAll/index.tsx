/* * */

import RegularListItem from '@/components/layout/RegularListItem';
import Section from '@/components/layout/Section';
import LineDisplay from '@/components/lines/LineDisplay';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

import styles from './styles.module.css';

/* * */

const rowMeasurementsCache = new CellMeasurerCache({
	defaultHeight: 70,
	fixedWidth: true,
});

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesContext = useLinesListContext();

	//
	// B. Handle actions

	function handleResize() {
		rowMeasurementsCache.clearAll();
	}

	//
	// C. Render components

	return (
		<Section childrenWrapperStyles={styles.container} withChildrenPadding={false} withTopPadding={false}>
			<AutoSizer disableHeight={true} onResize={handleResize}>
				{({ width }) => (
					<WindowScroller>
						{({ height, isScrolling, registerChild, scrollTop }) => (
							<div ref={registerChild as (element: Element | null) => void /* It works, but the types don't match up */}>
								<List
									deferredMeasurementCache={rowMeasurementsCache}
									height={height}
									isScrolling={isScrolling}
									rowCount={linesContext.data.filtered.length}
									rowHeight={rowMeasurementsCache.rowHeight}
									scrollTop={scrollTop}
									width={width}
									rowRenderer={({ index, key, parent, style }) => {
										const lineData = linesContext.data.filtered[index];
										return lineData && (
											<CellMeasurer key={key} cache={rowMeasurementsCache} index={index} parent={parent}>
												{({ registerChild }) => (
													<RegularListItem key={lineData.line_id} href={`/lines/${lineData.line_id}`} refFn={(element: Element | null) => registerChild && registerChild(element || undefined)} style={style}>
														<LineDisplay line={lineData} />
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
	);

	//
}
