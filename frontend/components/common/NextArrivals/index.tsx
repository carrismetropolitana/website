/* * */

import type { ArrivalStatus } from '@/types/stops.types';

import LiveIcon from '@/components/common/LiveIcon';
import { IconAlertCircleFilled, IconClockHour9 } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	allowPastArrivals?: boolean
	arrivals: number[]
	status: ArrivalStatus
	withIcon?: boolean
}

interface NextArrival {
	estimated_arrival_hours: number
	estimated_arrival_minutes: number
	estimated_arrival_seconds: number
	estimated_arrival_unix: number
	label: string
}

/* * */

export function NextArrivals({ allowPastArrivals = true, arrivals, status, withIcon = true }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.NextArrivals');

	const [allFormattedArrivals, setFormattedArrivals] = useState<NextArrival[]>([]);

	//
	// B. Transform data

	useEffect(() => {
		//

		const formatArrivals = () => {
			//
			const nowInSeconds = DateTime.now().toSeconds();
			const allFormattedArrivalsResult: NextArrival[] = [];
			//
			for (const unixTimestamp of arrivals) {
				// Check if arrival is in the past
				if (!allowPastArrivals && unixTimestamp < nowInSeconds) continue;
				// Prepare the time values
				const secondsUntilArrival = Math.floor(unixTimestamp - nowInSeconds);
				const minutesUntilArrival = Math.floor(secondsUntilArrival / 60);
				const hoursUntilArrival = Math.floor(minutesUntilArrival / 60);

				// For realtime arrivals we calculate a relative time to the current time
				// (ex: "a chegar", "5 min", "1 hora", "1 hora 30 min")
				if (status === 'realtime') {
				//
					let labelResult = '';
					//
					if (minutesUntilArrival <= 0) {
						labelResult = t('arriving');
					}
					if (hoursUntilArrival > 0) {
						labelResult += `${hoursUntilArrival} ${t('hours')} `;
					}
					if (minutesUntilArrival > 0) {
						labelResult += `${minutesUntilArrival % 60} ${t('minutes')}`;
					}
					//
					allFormattedArrivalsResult.push({
						estimated_arrival_hours: hoursUntilArrival,
						estimated_arrival_minutes: minutesUntilArrival,
						estimated_arrival_seconds: secondsUntilArrival,
						estimated_arrival_unix: unixTimestamp,
						label: labelResult.trim(),
					});
				}

				// For scheduled arrivals we just display the absolute arrival value in hours and minutes
				// (ex: "13:45", "14:30")
				if (status === 'scheduled' || status === 'passed' || status === 'canceled') {
					allFormattedArrivalsResult.push({
						estimated_arrival_hours: hoursUntilArrival,
						estimated_arrival_minutes: minutesUntilArrival,
						estimated_arrival_seconds: secondsUntilArrival,
						estimated_arrival_unix: unixTimestamp,
						label: DateTime.fromSeconds(unixTimestamp).toFormat('HH:mm'),
					});
				}
			}

			setFormattedArrivals(allFormattedArrivalsResult);

			//
		};

		formatArrivals();

		const interval = setInterval(formatArrivals, 1000);

		return () => clearInterval(interval);

		//
	}, [arrivals, status]);

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
						<p key={formattedArrival.estimated_arrival_unix} className={styles.arrival}>
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
						<p key={formattedArrival.estimated_arrival_unix} className={styles.arrival}>
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
						<p key={formattedArrival.estimated_arrival_unix} className={styles.arrival}>
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
						<p key={formattedArrival.estimated_arrival_unix} className={styles.arrival}>
							{formattedArrival.label}
						</p>
					))}
				</div>
			</div>
		);
	}

	//
}
