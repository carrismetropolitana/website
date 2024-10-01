'use client';

/* * */

import { IconAlertTriangleFilled, IconBellRingingFilled, IconCircleCheckFilled, IconInfoCircleFilled } from '@tabler/icons-react';
// import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Fetch data

	// const { data: appStatusData } = useSWR(`${Routes.API}/status/message`);
	const appStatusData = null;

	//
	// B. Handle actions

	const handleClick = () => {
		if (appStatusData.more_info) {
			window.open(appStatusData.more_info, '_blank');
		}
	};

	//
	// C. Render Components

	return appStatusData && appStatusData.title && (
		<div className={`${styles.container} ${appStatusData.more_info && styles.asLink} ${styles[`style_${appStatusData.style}`]}`} onClick={handleClick}>
			<div className={styles.iconWrapper}>
				{appStatusData.style === 'info' && <IconInfoCircleFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'ok' && <IconCircleCheckFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'warning' && <IconBellRingingFilled className={styles.icon} size={22} />}
				{appStatusData.style === 'danger' && <IconAlertTriangleFilled className={styles.icon} size={22} />}
			</div>
			<div className={styles.messageWrapper}>
				<h3 className={styles.title}>{appStatusData.title}</h3>
			</div>
		</div>
	);

	//
}
