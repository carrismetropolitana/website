/* * */

import styles from './styles.module.css';

import { Review2025CardContentGroup } from '../_data/cards';
import Review2025ContentItemBadge from '../Review2025ContentItemBadge';
import Review2025ContentItemLine from '../Review2025ContentItemLine';

/* * */

export function Review2025ContentGroup({ data }: { data: Review2025CardContentGroup }) {
	return (
		<div className={styles.container}>
			{data.title && <p className={styles.title}>{data.title}</p>}
			{data.items.map((item, index) => {
				return item.type === 'badge'
					? <Review2025ContentItemBadge key={index} item={item} />
					: <Review2025ContentItemLine key={index} item={item} />;
			})}
		</div>
	);
}
