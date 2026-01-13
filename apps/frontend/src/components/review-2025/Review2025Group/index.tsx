/* * */

import styles from './styles.module.css';

import { Review2025CardSchemaContentGroup } from '../_data/cards';
import Review2025GroupBadgeItem from '../Review2025GroupBadgeItem';

/* * */

export function Review2025Group({ data }: { data: Review2025CardSchemaContentGroup }) {
	return (
		<div className={styles.contentGroupWrapper}>
			{data.items.map((item, index) => (
				<div key={index} className={styles.contentGroupItem}>
					{item.type === 'badge' ? (
						<Review2025GroupBadgeItem item={item} />
					) : (
						<p>{item.line_name}</p>
					)}
				</div>
			))}
		</div>
	);
}
