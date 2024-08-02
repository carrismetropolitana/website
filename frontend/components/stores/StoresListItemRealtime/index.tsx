/* * */

import type { Store } from '@/types/stores.types';

import LiveIcon from '@/components/common/LiveIcon';
import { IconClockHour3, IconUserStar, IconUsers } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface StoresListItemRealtime {
	data: Store
}

/* * */

export default function Component({ data }: StoresListItemRealtime) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListItemRealtime');

	//
	// B. Transform data

	const expectedWaitTimeInMinutes = Math.round(data.expected_wait_time / 60);

	//
	// C. Render components

	if (data.current_status === 'open') {
		return (
			<div className={`${styles.container} ${styles.isOpen}`}>
				<div className={styles.label}>
					{t('current_status.open')}
					<LiveIcon color="var(--color-status-ok-text)" />
				</div>
				<div className={styles.value}>
					<IconUsers size={16} />
					{t('people_waiting', { count: data.currently_waiting })}
				</div>
				<div className={styles.value}>
					<IconUserStar size={16} />
					{t('desks_open', { count: data.active_counters })}
				</div>
				<div className={styles.value}>
					<IconClockHour3 size={16} />
					{t('expected_wait_time', { count: expectedWaitTimeInMinutes })}
				</div>
			</div>
		);
	}

	if (data.current_status === 'busy') {
		return (
			<div className={`${styles.container} ${styles.isBusy}`}>
				<div className={styles.label}>
					{t('current_status.busy')}
					<LiveIcon color="var(--color-status-warning-text)" />
				</div>
				<div className={styles.value}>
					<IconUsers size={16} />
					{t('people_waiting', { count: data.currently_waiting })}
				</div>
				<div className={styles.value}>
					<IconUserStar size={16} />
					{t('desks_open', { count: data.active_counters })}
				</div>
				<div className={styles.value}>
					<IconClockHour3 size={16} />
					{t('expected_wait_time', { count: expectedWaitTimeInMinutes })}
				</div>
			</div>
		);
	}

	if (data.current_status === 'closed') {
		return (
			<div className={`${styles.container} ${styles.isClosed}`}>
				<div className={styles.label}>{t('current_status.closed')}</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${styles.isUnknown}`}>
			<div className={styles.label}>{t('current_status.unknown')}</div>
		</div>
	);

	//
}
