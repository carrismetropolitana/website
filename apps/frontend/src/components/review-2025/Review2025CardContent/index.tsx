/* * */

import styles from '../Review2025Card/styles.module.css';

import { Review2025Card } from '../_data/cards';
import { Review2025ContentGroup } from '../Review2025ContentGroup';

/* * */

export function Review2025CardContent({ cardData, isOpen }: { cardData: Review2025Card, isOpen: boolean }) {
	//
	return (
		<div className={`${styles.content} ${styles.contentCollapsible}`} data-open={isOpen}>
			<p className={styles.contentDescription}>{cardData.description}</p>
			{cardData.content.map((group, index) => (
				<Review2025ContentGroup key={index} data={group} />
			))}
		</div>
	);
	//
}
