'use client';

/* * */

import styles from './MaintenanceWarning.module.css';
import { useTranslations } from 'next-intl';

/* * */

export default function MaintenanceWarning() {
	//

	const t = useTranslations('MaintenanceWarning');

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{t('title')}</h1>
			<h2 className={styles.subtitle}>{t('subtitle')}</h2>
		</div>
	);
}