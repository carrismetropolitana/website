/* * */

import Loader from '@/components/common/Loader';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	classNames?: string
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
				<Loader visible />
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={styles.container} onClick={onToggle} style={{ color: color }}>
				<IconHeartFilled />
			</div>
		);
	}

	return (
		<div className={styles.container} onClick={onToggle}>
			<IconHeart />
		</div>
	);

	//
}
