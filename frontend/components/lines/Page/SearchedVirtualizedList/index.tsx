import { useProfileContext } from '@/contexts/ProfileContext';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { Line } from '@/utils/types.js';
import { useEffect, useMemo } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

import LineItem from '../LineItem';

const cache = new CellMeasurerCache({
	defaultHeight: 70,
	fixedWidth: true,
});

export default function Component({ data, searchText, setFoundNumber }: { data: Line[], searchText: string, setFoundNumber: (_: number) => void }) {
	const { profile } = useProfileContext();

	const { search } = useMemo(() => {
		const boostedData = data.map(e => ({ ...e, boost: profile.favoriteLines.includes(e.id) }));
		return createDocCollection(boostedData, {
			id: 3,
			localities: 1,
			long_name: 1,
			short_name: 1,
		});
	}, [data, profile.favoriteLines]);
	const results = search(searchText);

	const renderableData = useMemo(() => searchText !== ''
		? results : data ?? [], [data, results, searchText]);
	useEffect(() => {
		setFoundNumber(renderableData.length);
	}, [renderableData.length, setFoundNumber]);

	function onResize() {
		cache.clearAll();
	}
	return (
		<AutoSizer disableHeight={true} onResize={onResize}>
			{({ width }) => (
				<WindowScroller>
					{({ height, isScrolling, registerChild, scrollTop }) => (
						<div
							// It works, but the types don't match up
							ref={registerChild as (element: Element | null) => void}
						>

							<List
								deferredMeasurementCache={cache}
								height={height}
								isScrolling={isScrolling}
								rowCount={renderableData.length}
								rowHeight={cache.rowHeight}
								scrollTop={scrollTop}
								width={width}
								rowRenderer={function cellRenderer({ index, key, parent, style }) {
									const line = renderableData[index];
									return (
										<CellMeasurer
											key={key}
											cache={cache}
											index={index}
											parent={parent}
										>
											{({ registerChild }) => (
												<LineItem line={line} refFn={(element: Element | null) => registerChild && registerChild(element || undefined)} style={style} />
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
	);
}
