import { Line } from '@/utils/types.js';
import MiniSearch from 'minisearch';
import { useEffect, useMemo } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

import LineItem from '../LineItem';

const cache = new CellMeasurerCache({
	defaultHeight: 70,
	fixedWidth: true,
});

export default function Component({ data, searchText, setFoundNumber }: { data: Line[], searchText: string, setFoundNumber: (_: number) => void }) {
	const minisearch = useMemo(() => {
		const minisearch = new MiniSearch<Line>({
			fields: ['short_name', 'long_name'],
			idField: 'id',
			processTerm(term, fieldName) {
				if (fieldName === 'long_name') {
					return term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
				}
				return term.toLowerCase();
			},
			storeFields: ['short_name', 'long_name', 'color', 'text_color'],
		});
		minisearch.addAll(data);
		return minisearch;
	}, []);

	console.time('filter');
	const results = useMemo(() => {
		const shortRes = minisearch.search(searchText, { fields: ['short_name'], prefix: true });
		const longRes = minisearch.search(searchText, { fields: ['long_name'], fuzzy: 0.2 });
		// Merge the two arrays
		const merged = shortRes.concat(longRes.filter(e => !shortRes.some(e2 => e2.id === e.id)));

		return merged;
	}, [minisearch, searchText]);
	// const filteredData = useMemo(() => results.map(e => e.) , [data, results, searchText]);
	const renderableData = useMemo(() => searchText !== ''
		? results.map(e => (
			{
				color: e.color,
				id: e.id,
				long_name: e.long_name,
				short_name: e.short_name,
				text_color: e.text_color,
			})) : data ?? [], [data, results, searchText]);
	useEffect(() => {
		setFoundNumber(renderableData.length);
	}, [renderableData.length, setFoundNumber]);
	console.timeEnd('filter');

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
