/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { IconClockHour3, IconUserStar, IconUsers } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface StoreItemProps {
	data: EncmProps
}

interface EncmProps {
	active_counters: number
	address: string
	currently_waiting: number
	expected_wait_time: number
	hours_friday: string[]
	hours_monday: string[]
	hours_saturday: string[]
	hours_special: string
	hours_sunday: string[]
	hours_thursday: string[]
	hours_tuesday: string[]
	hours_wednesday: string[]
	id: string
	is_open: boolean
	lat: number
	locality: string
	lon: number
	municipality_id: string
	municipality_name: string
	name: string
	parish_id: string
	parish_name: string
	phone: string
	postal_code: string
	region_id: string
	region_name: string
	short_name: string
}

/* * */

export default function Component({ data }: StoreItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('StoresStoreItemRealtime');

	//
	// B. Transform data

	const expectedWaitTimeInMinutes = Math.round(data.expected_wait_time / 60);

	const openDesksToPeopleWaitingRatio = data.active_counters / data.currently_waiting;

	//
	// C. Render components

	if (data.is_open && openDesksToPeopleWaitingRatio > 0.1) {
		return (
			<div className={`${styles.container} ${styles.isOpen}`}>
				<div className={styles.label}>
					{t('is_open')}
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

	if (data.is_open) {
		return (
			<div className={`${styles.container} ${styles.isBusy}`}>
				<div className={styles.label}>
					{t('is_busy')}
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

	return (
		<div className={`${styles.container} ${styles.isClosed}`}>
			<div className={styles.label}>{t('is_closed')}</div>
		</div>
	);

	//
}
