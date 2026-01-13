/* * */

import styles from './styles.module.css';

import { Review2025CardSchemaContentGroup } from '../_data/cards';
import Review2025GroupBadgeItem from '../Review2025GroupBadgeItem';

/* * */

export function Review2025Group({ data }: { data: Review2025CardSchemaContentGroup }) {
	return (
		<div className={styles.container}>
			{data.title && <p className={styles.title}>{data.title}</p>}
			{data.items.map((item, index) => {
				return item.type === 'badge'
					? <Review2025GroupBadgeItem key={index} item={item} />
					: <p key={index} className={styles.lineName}>{item.line_name}</p>;
			})}
		</div>
	);
}
