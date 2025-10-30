'use client';

/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

interface LastUpdatedAtProps {
	lastUpdated: Date | null | string
}

export function LastUpdatedAt({ lastUpdated }: LastUpdatedAtProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.LastUpdatedAt');

	// B. Transform data

	const lastUpdatedText = useMemo(() => {
		if (!lastUpdated) return '';

		const now = DateTime.now();

		let updated;
		if (typeof lastUpdated === 'string') {
			updated = DateTime.fromISO(lastUpdated);
		}
		else if (lastUpdated instanceof Date) {
			updated = DateTime.fromJSDate(lastUpdated);
		}
		else {
			console.error('Invalid date format:', lastUpdated);
			return '';
		}

		const diffInMinutes = Math.floor(now.diff(updated, 'minutes').minutes);

		let relativeText = '';

		if (diffInMinutes < 1) relativeText = t('updated.just_now'); // “Just now”
		else if (diffInMinutes < 60) relativeText = t('updated.minutes', { count: diffInMinutes }); // “X minutes ago”
		else if (diffInMinutes < 1440) relativeText = t('updated.hours', { count: Math.floor(diffInMinutes / 60) }); // “X hours ago”
		else relativeText = t('updated.days', { count: Math.floor(diffInMinutes / 1440) }); // “X days ago”

		return t('last_updated_relative', { value: relativeText });
	}, [lastUpdated, t]);

	//
	// C. Render components

	if (!lastUpdated) return null;

	return (
		<div className={styles.lastUpdatedWrapper}>
			<LiveIcon color="var(--color-brand)" />
			<p>{lastUpdatedText}</p>
		</div>
	);
};

export default LastUpdatedAt;
