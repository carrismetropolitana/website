/* * */

import styles from './styles.module.css';

import { Review2025BadgeToIcon, Review2025CardContentItemBadge } from '../_data/cards';
import * as Icons from '../_data/icons';

/* * */

export default function Review2025ContentItemBadge({ item }: { item: Review2025CardContentItemBadge }) {
	const IconComponent = Icons[Review2025BadgeToIcon[item.badge]];

	if (!IconComponent) {
		return null;
	}

	return (
		<div className={styles.container}>
			<IconComponent />
			<div>
				<p className={styles.contentDescription}>{item.description}</p>
				<p className={styles.contentValue}>{item.value}</p>
			</div>
		</div>
	);
}
