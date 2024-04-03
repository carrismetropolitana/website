'use client';

import styles from './FrontendStopsTimetableDividerLine.module.css';

export default function FrontendStopsTimetableDividerLine() {
	//

	//
	// A. Setup variables

	const currentTime = new Date;

	const hoursFormatter = Intl.DateTimeFormat('pt-PT', { hour: '2-digit', timeZone: 'Europe/Lisbon' });
	const minutesFormatter = Intl.DateTimeFormat('pt-PT', { minute: '2-digit', timeZone: 'Europe/Lisbon' });

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.circle}></div>
			<div className={styles.line}></div>
			<div className={styles.time}>
				{hoursFormatter.format(currentTime)}
				<span>:</span>
				{minutesFormatter.format(currentTime)}
			</div>
		</div>
	);
}