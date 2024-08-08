/* * */

import Loader from '@/components/common/Loader';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface FavoriteToggleProps {
	color: string
	isActive: boolean | null
	onToggle: () => void
}

/* * */

export default function Component({ color, isActive, onToggle }: FavoriteToggleProps) {
	//

	//
	// A. Render component

	if (isActive === null) {
		return (
			<div className={styles.container}>
				<Loader size={18} visible />
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={styles.container} onClick={onToggle} style={{ color: color }}>
				<IconHeartFilled className={`${styles.icon} ${styles.isActive}`} size={24} />
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={onToggle}>
			<IconHeart className={styles.icon} size={24} />
		</div>
	);

	//
}
