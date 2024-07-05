import { Line } from '@/utils/types';
import { IconArrowRight } from '@tabler/icons-react';
import Fuse from 'fuse.js/min-basic';
import { useEffect, useMemo } from 'react';
import { CellMeasurer, CellMeasurerCache, List, WindowScroller } from 'react-virtualized';

import styles from '../styles.module.css';

const cache = new CellMeasurerCache({
	defaultHeight: 60,
	fixedWidth: true,
});

export default function Component({ data, searchText, setFoundNumber }: { data: Line[], searchText: string, setFoundNumber: (_: number) => void }) {
	const arrow = useMemo(() => <IconArrowRight className={styles.arrow} size={24} />, []);

	const fuse = new Fuse(data ?? [], {
		includeScore: true,
		isCaseSensitive: false,
		keys: ['short_name', 'long_name'],
		shouldSort: true,
	});
	console.time('filter');
	const filteredData = searchText !== '' ? fuse.search(searchText).map(result => result.item) : data ?? [];
	useEffect(() => {
		setFoundNumber(filteredData.length);
	}, [filteredData.length, setFoundNumber]);
	console.timeEnd('filter');
	return (
		<WindowScroller>
			{({ height, isScrolling, scrollTop, width }) => (
				<List
					deferredMeasurementCache={cache}
					height={height}
					isScrolling={isScrolling}
					rowCount={filteredData.length}
					rowHeight={cache.rowHeight}
					scrollTop={scrollTop}
					width={width}
					rowRenderer={function cellRenderer({ index, key, parent, style }) {
						const line = filteredData[index];
						return (
							<CellMeasurer
								key={key}
								cache={cache}
								index={index}
								parent={parent}
							>
								{({ registerChild }) => (
									<div key={key} ref={(element: Element | null) => registerChild && registerChild(element || undefined)} className={styles.line} style={style}>
										<div className={styles.label}>
											<div className={styles.badge} style={{ backgroundColor: line.color, color: line.text_color }}>{line.short_name}</div>
											<div className={styles.name}>{line.long_name}</div>
										</div>
										{arrow}
									</div>
								)}
							</CellMeasurer>
						);
					}}
					autoHeight
				/>

			)}
		</WindowScroller>
	);
}
