'use client';

/* * */

import { useProfileContext } from '@/contexts/Profile.context';
import { IconHeartFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	backgroundColor?: string
	foregroundColor?: string
	isFirstStop?: boolean
	isLastStop?: boolean
	isSelected: boolean
	stopId: string
}

/* * */

export default function Component({ backgroundColor, foregroundColor, isFirstStop, isLastStop, isSelected, stopId }: Props) {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();

	//
	// B. Transform data

	const isFavoriteStop = !!profileContext.data.profile?.favorite_stops?.includes(stopId);

	//
	// C. Render components

	return (
		<div
			className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}
			style={{ backgroundColor: backgroundColor }}
		>
			{!isFavoriteStop && <div className={styles.marker} style={{ backgroundColor: foregroundColor }} />}
			{isFavoriteStop && <IconHeartFilled className={`${styles.marker} ${styles.favorite}`} color={foregroundColor} />}
		</div>
	);

	//
}
