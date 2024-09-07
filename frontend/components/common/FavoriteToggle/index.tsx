/* * */

import Loader from '@/components/common/Loader';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	color: string
	isActive: boolean | null
	onToggle: () => void
}

/* * */

export default function FavoriteToggle({ color, isActive, onToggle }: Props) {
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
				<IconHeartFilled size={24} />
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={onToggle}>
			<IconHeart size={24} />
		</div>
	);

	//
}
