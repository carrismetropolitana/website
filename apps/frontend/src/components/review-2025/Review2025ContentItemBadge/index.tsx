/* * */

import styles from './styles.module.css';

import { Review2025CardContentItemBadge } from '../_data/cards';

/* * */

export default function Review2025ContentItemBadge({ item }: { item: Review2025CardContentItemBadge }) {
	return (
		<div className={styles.container}>
			<img alt={item.badge} className={styles.badge} src={`/assets/review-2025/images/${item.badge}.svg`} />
			<div>
				<p className={styles.contentDescription}>{item.description}</p>
				<p className={styles.contentValue}>{item.value}</p>
			</div>
		</div>
	);
}
