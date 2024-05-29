'use client';

import styles from './FrontendStopsTimetableDividerLine.module.css';

export default function FrontendStopsTimetableDividerLine() {
	//

	//
	// A. Setup variables

	const currentTime = (new Date());
	const currentTimeFormatted = currentTime.toLocaleString('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Lisbon' });
	const [hours, minutes] = currentTimeFormatted.split(':');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.circle} />
			<div className={styles.line} />
			<div className={styles.time}>
				{hours}
				<span>:</span>
				{minutes}
			</div>
		</div>
	);
}
