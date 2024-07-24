// import { Line } from '@/utils/types.js';
// import { IconArrowRight } from '@tabler/icons-react';
// import Fuse, { FuseResult } from 'fuse.js/min-basic';
// import React, { useEffect, useMemo } from 'react';
// import { AutoSizer, CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

// import styles from '../styles.module.css';

// const cache = new CellMeasurerCache({
// 	defaultHeight: 70,
// 	fixedWidth: true,
// });

// export default function Component({ data, searchText, setFoundNumber }: { data: Line[], searchText: string, setFoundNumber: (_: number) => void }) {
// 	const arrow = useMemo(() => <IconArrowRight className={styles.arrow} size={24} />, []);

// 	const fuse = useMemo(() => new Fuse(data ?? [], {
// 		includeMatches: true,
// 		includeScore: true,
// 		isCaseSensitive: false,
// 		keys: [{ name: 'short_name' }, {
// 			getFn: (obj: Line) => obj.long_name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
// 			name: 'long_name',
// 		}],
// 		minMatchCharLength: 2,
// 		shouldSort: true,
// 		threshold: 0.2,
// 	}), [data]);

// 	console.time('filter');
// 	const results = useMemo(() => fuse.search(searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), { limit: 10 }), [fuse, searchText]);
// 	const filteredData = useMemo(() => searchText !== '' ? results.map(e => e.item) : data ?? [], [data, results, searchText]);
// 	useEffect(() => {
// 		setFoundNumber(filteredData.length);
// 	}, [filteredData.length, setFoundNumber]);
// 	console.timeEnd('filter');

// 	function highlight(match: FuseResult<Line>, key: string) {
// 		const matches = match.matches ?? [];
// 		const str = match.item[key];
// 		let i = 0;
// 		const nodes: JSX.Element[] = [];
// 		for (const match of matches) {
// 			if (match.key !== key)
// 				continue;
// 			for (const [start, end] of match.indices) {
// 				nodes.push(str.slice(i, start));
// 				nodes.push(<span className={styles.highlight}>{str.slice(start, end + 1)}</span>);
// 				i = end + 1;
// 			}
// 		}
// 		nodes.push(str.slice(i));
// 		return nodes.map((v, i) => <React.Fragment key={i}>{v}</React.Fragment>);
// 	}

// 	function onResize() {
// 		cache.clearAll();
// 	}
// 	return (
// 		<AutoSizer disableHeight={true} onResize={onResize}>
// 			{({ width }) => (
// 				<WindowScroller>
// 					{({ height, isScrolling, registerChild, scrollTop }) => (
// 						<div
// 							// It works, but the types don't match up
// 							ref={registerChild as (element: Element | null) => void}
// 						>

// 							<List
// 								deferredMeasurementCache={cache}
// 								height={height}
// 								isScrolling={isScrolling}
// 								rowCount={filteredData.length}
// 								rowHeight={cache.rowHeight}
// 								scrollTop={scrollTop}
// 								width={width}
// 								rowRenderer={function cellRenderer({ index, key, parent, style }) {
// 									const matches = results[index];
// 									const line = filteredData[index];
// 									return (
// 										<CellMeasurer
// 											key={key}
// 											cache={cache}
// 											index={index}
// 											parent={parent}
// 										>
// 											{({ registerChild }) => (
// 												<div key={key} ref={(element: Element | null) => registerChild && registerChild(element || undefined)} className={styles.line} style={style}>
// 													<div className={styles.label}>
// 														<div className={styles.badge} style={{ backgroundColor: line.color, color: line.text_color }}>{matches ? highlight(matches, 'short_name') : line.short_name}</div>
// 														<div className={styles.name}>{matches ? highlight(matches, 'long_name') : line.long_name}</div>
// 													</div>
// 													{arrow}
// 												</div>
// 											)}
// 										</CellMeasurer>
// 									);
// 								}}
// 								autoHeight
// 							/>

// 						</div>

// 					)}
// 				</WindowScroller>
// 			)}
// 		</AutoSizer>
// 	);
// }
