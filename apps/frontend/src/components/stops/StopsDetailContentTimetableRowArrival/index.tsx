'use client';

import { LiveIcon } from '@/components/common/LiveIcon';
import { type StopsDetailViewTimetableData } from '@/contexts/StopsDetail.context';
import { IconClockHour9 } from '@tabler/icons-react';
import { Dates } from '@tmlmobilidade/dates';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface StopsDetailViewTimetableRowArrivalProps {
	data: StopsDetailViewTimetableData
}

/* * */

export function StopsDetailViewTimetableRowArrival({ data }: StopsDetailViewTimetableRowArrivalProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.NextArrivals');

	const [formattedArrivalLabel, setFormattedArrivalLabel] = useState<string>('•••');

	//
	// B. Transform data

	useEffect(() => {
		const formatArrivals = () => {
			// Prepare the time values
			const nowUnixTimestamp = Dates.now('Europe/Lisbon').unix_timestamp;
			const relativeArrivalMs = data.arrival_effective_ms - nowUnixTimestamp;
			// If arrival is in the past
			if (relativeArrivalMs <= 0) {
				const absoluteArrivalLabel = Dates
					.fromUnixTimestamp(data.arrival_scheduled_ms)
					.setZone('Europe/Lisbon', 'offset_only')
					.toFormat('HH:mm');
				setFormattedArrivalLabel(absoluteArrivalLabel);
				return;
			};
			// Get the hours, minutes, and seconds until arrival
			const hoursUntilArrival = Math.floor(relativeArrivalMs / 1000 / 3600);
			const minutesUntilArrival = Math.floor((relativeArrivalMs % (1000 * 3600)) / (1000 * 60));
			// const secondsUntilArrival = Math.floor((relativeArrivalMs / 1000) % 60);
			// If realtime, format the arrival label
			// in relative time (ex: "5 min", "1 hour", 'A chegar')
			if (data.is_realtime) {
				let labelResult = '';
				if (minutesUntilArrival <= 0) labelResult = t('arriving');
				if (hoursUntilArrival > 0) labelResult += `${hoursUntilArrival} ${t('hours')} `;
				if (minutesUntilArrival > 0) labelResult += `${minutesUntilArrival % 60} ${t('minutes')}`;
				// if (secondsUntilArrival > 0) labelResult += `${secondsUntilArrival} seg`;
				setFormattedArrivalLabel(labelResult.trim());
			}
			// If scheduled, format the arrival label as absolute HH:mm
			if (!data.is_realtime) {
				const absoluteArrivalLabel = Dates
					.fromUnixTimestamp(data.arrival_scheduled_ms)
					.setZone('Europe/Lisbon', 'offset_only')
					.toFormat('HH:mm');
				setFormattedArrivalLabel(absoluteArrivalLabel);
			}
		};
		formatArrivals();
		const interval = setInterval(formatArrivals, 1_000);
		return () => clearInterval(interval);
	}, [data.arrival_effective_ms, data.arrival_scheduled_ms, data.is_realtime, t]);

	//
	// C. Render components

	if (data.is_past) {
		return (
			<div className={styles.container} data-is-past>
				<p className={styles.label}>{formattedArrivalLabel}</p>
			</div>
		);
	}

	return (
		<div className={styles.container} data-is-realtime={data.is_realtime}>
			{data.is_realtime && <div className={styles.beta}>BETA</div>}
			{data.is_realtime ? <LiveIcon color="var(--color-status-warning-primary)" /> : <IconClockHour9 size={18} />}
			<p className={styles.label}>{formattedArrivalLabel}</p>
		</div>
	);
}
