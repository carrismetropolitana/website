'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Routes } from '@/utils/routes';
import { IconAlertTriangleFilled, IconBellRingingFilled, IconCircleCheckFilled, IconInfoCircleFilled } from '@tabler/icons-react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function GeneralStatus() {
	//

	//
	// A. Fetch data

	const { data: appStatusData } = useSWR(`${Routes.API}/status/message`);
	// const appStatusData = null;

	//
	// B. Handle actions

	const handleClick = () => {
		if (appStatusData.more_info) {
			window.open(appStatusData.more_info, '_blank');
		}
	};

	//
	// C. Render Components

	return (
		<Surface variant="success">
			<h1 className={styles.heading}>Lorem ipsum dolor sit amet</h1>
			<Section heading="Trânsito estabilizado na Ponte 25 Abril" variant="success" withPadding>
				<h3 className={styles.title}>Lorem ipsum dolor sit amet</h3>
			</Section>
		</Surface>
	);

	// return appStatusData && appStatusData.title && (
	// 	<div className={`${styles.container} ${appStatusData.more_info && styles.asLink} ${styles[`style_${appStatusData.style}`]}`} onClick={handleClick}>
	// 		<div className={styles.iconWrapper}>
	// 			{appStatusData.style === 'info' && <IconInfoCircleFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'ok' && <IconCircleCheckFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'warning' && <IconBellRingingFilled className={styles.icon} size={22} />}
	// 			{appStatusData.style === 'danger' && <IconAlertTriangleFilled className={styles.icon} size={22} />}
	// 		</div>
	// 		<div className={styles.messageWrapper}>
	// 			<h3 className={styles.title}>{appStatusData.title}</h3>
	// 		</div>
	// 	</div>
	// );

	//
}
