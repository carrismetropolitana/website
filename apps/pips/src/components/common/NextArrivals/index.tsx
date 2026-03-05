/* * */

import type { ArrivalStatus } from '@/types/stops.types';

import { LiveIcon } from '@/components/common/LiveIcon';
import { IconAlertCircleFilled, IconClockHour9 } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import { computeFormattedArrivals, type FormattedArrival } from './utils';

/* * */

interface Props {
	allowPastArrivals?: boolean
	arrivals: number[]
	size?: 'lg' | 'md'
	status: ArrivalStatus
	withIcon?: boolean
}

/* * */

const cx = classNames.bind(styles);

/* * */

export function NextArrivals({ allowPastArrivals = true, arrivals, size, status, withIcon = true }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.NextArrivals');

	const [allFormattedArrivals, setFormattedArrivals] = useState<FormattedArrival[]>([]);

	//
	// B. Transform data

	useEffect(() => {
		//

		const formatArrivals = () => {
			const nowInSeconds = DateTime.now().toSeconds();
			setFormattedArrivals(computeFormattedArrivals({ allowPastArrivals, arrivals, nowInSeconds, status, t }));
		};

		formatArrivals();

		const interval = setInterval(formatArrivals, 1000);

		return () => clearInterval(interval);

		//
	}, [allowPastArrivals, arrivals, status, t]);

	//
	// C. Render components

	if (!allFormattedArrivals || allFormattedArrivals.length === 0) {
		return null;
	}

	if (status === 'realtime') {
		return (
			<div className={`${styles.container} ${styles.realtime}`}>
				{withIcon && (
					<div className={styles.icon}>
						<LiveIcon />
					</div>
				)}
				<div className={styles.list}>
					{allFormattedArrivals.map(formattedArrival => (
						<p key={formattedArrival.estimated_arrival_unix} className={cx({ arrival: true, lg: size === 'lg', md: size === 'md' })}>
							{formattedArrival.label}
						</p>
					))}
				</div>
			</div>
		);
	}

	if (status === 'scheduled') {
		return (
			<div className={`${styles.container} ${styles.scheduled}`}>
				{withIcon && (
					<div className={styles.icon}>
						<IconClockHour9 />
					</div>
				)}
				<div className={styles.list}>
					{allFormattedArrivals.map(formattedArrival => (
						<p key={formattedArrival.estimated_arrival_unix} className={cx({ arrival: true, lg: size === 'lg', md: size === 'md' })}>
							{formattedArrival.label}
						</p>
					))}
				</div>
			</div>
		);
	}

	if (status === 'passed') {
		return (
			<div className={`${styles.container} ${styles.passed}`}>
				<div className={styles.list}>
					{allFormattedArrivals.map(formattedArrival => (
						<p key={formattedArrival.estimated_arrival_unix} className={cx({ arrival: true, lg: size === 'lg', md: size === 'md' })}>
							{formattedArrival.label}
						</p>
					))}
				</div>
			</div>
		);
	}

	if (status === 'canceled') {
		return (
			<div className={`${styles.container} ${styles.canceled}`}>
				{withIcon && (
					<div className={styles.icon}>
						<IconAlertCircleFilled />
					</div>
				)}
				<div className={styles.list}>
					{allFormattedArrivals.map(formattedArrival => (
						<p key={formattedArrival.estimated_arrival_unix} className={cx({ arrival: true, lg: size === 'lg', md: size === 'md' })}>
							{formattedArrival.label}
						</p>
					))}
				</div>
			</div>
		);
	}

	//
}
