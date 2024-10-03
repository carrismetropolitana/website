'use client';

/* * */

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function StopsDetailContentListRealtimeClockLine() {
	//

	//
	// A. Setup variables

	const [currentTimeHours, setCurrentTimeHours] = useState('00');
	const [currentTimeMinutes, setCurrentTimeMinutes] = useState('00');

	//
	// B. Transform data

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = DateTime.now().setZone('Europe/Lisbon');
			setCurrentTimeHours(currentTime.toFormat('HH'));
			setCurrentTimeMinutes(currentTime.toFormat('mm'));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.circle} />
			<div className={styles.line} />
			<div className={styles.time}>
				{currentTimeHours}
				<span>:</span>
				{currentTimeMinutes}
			</div>
		</div>
	);

	//
}
