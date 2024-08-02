'use client';

/* * */

import type { Alert } from '@/types/alerts.types';

// import AlertsListItemRealtime from '@/components/alerts/AlertsListItemRealtime';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface AlertsListItemProps {
	data: Alert
}

/* * */

export default function Component({ data }: AlertsListItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListItem');

	//
	// B. Transform data

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.alertBrand}>{data.brand_name}</h3>
				<h3 className={styles.alertName}>{data.short_name}</h3>
			</div>
			<div className={styles.infoGroupWrapper}>
				<p className={styles.label}>{t('address')}</p>
				<p className={styles.value}>{data.address}</p>
				<p className={styles.value}>{data.postal_code} {data.locality}</p>
			</div>
		</div>
	);

	//
}
