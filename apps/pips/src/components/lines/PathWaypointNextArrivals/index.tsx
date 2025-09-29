/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { IconClockHour9 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function PathWaypointNextArrivals({ realtimeArrivals, scheduledArrivals }: { realtimeArrivals: { type: 'realtime' | 'scheduled', unixTs: number }[], scheduledArrivals: { type: 'realtime' | 'scheduled', unixTs: number }[] }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.PathStopNextArrivals');

	const now = Date.now();

	//
	// D. Render components

	if (realtimeArrivals.length === 0 && scheduledArrivals.length === 0) {
		return null;
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>{t('title')}</p>
			<div className={styles.arrivalsWrapper}>

				{realtimeArrivals.length > 0 && (
					<div className={styles.realtimeArrivalsWrapper}>
						<LiveIcon />
						<div className={styles.realtimeArrivalsList}>
							{realtimeArrivals.map(realtimeArrival => realtimeArrival != undefined && (
								<div key={realtimeArrival.unixTs} className={styles.realtimeArrival}>{formatDelta(realtimeArrival.unixTs - now)}</div>
							))}
						</div>
					</div>
				)}

				{scheduledArrivals.length > 0 && (
					<div className={styles.scheduledArrivalsWrapper}>
						<IconClockHour9 size={14} />
						<div className={styles.scheduledArrivalsList}>
							{scheduledArrivals.slice(0, realtimeArrivals.length > 0 ? 3 : 4).map(scheduledArrival => scheduledArrival != undefined && (
								<div key={scheduledArrival.unixTs} className={styles.scheduledArrival}>
									{dayjs(scheduledArrival.unixTs).format('HH:mm')}
								</div>
							))}
						</div>
					</div>
				)}

			</div>
		</div>
	);

	//
}

/* * */

function formatDelta(ms: number) {
	let toReturn = '';
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	if (minutes <= 0) {
		return 'A chegar';
	}

	if (hours > 0) {
		toReturn += `${hours} hora${hours > 1 ? 's' : ''} `;
	}
	if (minutes > 0) {
		toReturn += `${minutes % 60} min`;
	}
	return toReturn;
}
