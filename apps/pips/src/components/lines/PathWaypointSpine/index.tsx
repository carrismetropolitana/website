'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
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
	stopSequence: number
}

/* * */

export function PathWaypointSpine({ backgroundColor, foregroundColor, isFirstStop, isLastStop, isSelected, stopId, stopSequence }: Props) {
	//

	//
	// A. Setup variables

	const profileContext = useProfileContext();
	const debugContext = useDebugContext();

	//
	// B. Transform data

	const isFavoriteStop = !!profileContext.data.favorite_stops?.includes(stopId);

	//
	// C. Render components

	return (
		<div
			className={`${styles.container} ${isFirstStop && styles.isFirstStop} ${isLastStop && styles.isLastStop} ${isSelected && styles.isSelected}`}
			style={{ backgroundColor: backgroundColor }}
		>
			{debugContext.flags.is_debug_mode && <div className={`${styles.marker} ${styles.stopSequence}`} style={{ color: foregroundColor }}>{stopSequence}</div>}
			{!debugContext.flags.is_debug_mode && isFavoriteStop && <IconHeartFilled className={`${styles.marker} ${styles.favorite}`} color={foregroundColor} />}
			{!debugContext.flags.is_debug_mode && !isFavoriteStop && <div className={styles.marker} style={{ backgroundColor: foregroundColor }} />}
		</div>
	);

	//
}
