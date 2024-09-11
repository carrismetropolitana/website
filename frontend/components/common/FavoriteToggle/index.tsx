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

export default function FavoriteToggle({ classNames, color, isActive, onToggle }: Props) {
	//

	//
	// A. Render component

	if (isActive === null) {
		return (
			<div className={styles.container + ' ' + classNames}>
				<Loader size={18} visible />
			</div>
		);
	}

	if (isActive) {
		return (
			<div className={styles.container + ' ' + classNames} onClick={onToggle} style={{ color: color }}>
				<IconHeartFilled size={24} />
			</div>
		);
	}

	return (
		<div className={styles.container + ' ' + classNames} onClick={onToggle}>
			<IconHeart size={24} />
		</div>
	);

	//
}
