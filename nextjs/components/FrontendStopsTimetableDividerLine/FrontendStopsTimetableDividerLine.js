'use client';

import styles from './FrontendStopsTimetableDividerLine.module.css';

export default function FrontendStopsTimetableDividerLine() {
	//

	//
	// A. Setup variables

	const currentTime = new Date;
	const currentTimeFormatted = currentTime.toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' });
	const [hours, minutes] = currentTimeFormatted.split(':');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.circle}></div>
			<div className={styles.line}></div>
			<div className={styles.time}>
				{hours}<span>:</span>{minutes}
			</div>
		</div>
	);
}