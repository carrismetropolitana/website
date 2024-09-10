/* * */

import LineBadge from '@/components/lines/LineBadge';
import StopName from '@/components/stops/StopName';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { useStopsListContext } from '@/contexts/StopsList.context';
import { Notification } from '@/types/notification.type';
import { secondsToTime } from '@/utils/secondsToTime';
import { weekdaySort } from '@/utils/weekdaySort';
import { IconCalendar, IconClockHour3, IconClockPin, IconRulerMeasure } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ notification }: { notification: Notification }) {
	//
	// A. Setup variables
	const t = useTranslations('notifications.Card');
	const tWeek = useTranslations('common.weekdays');
	const linesContext = useLinesListContext();
	const stopsContext = useStopsListContext();

	const line = linesContext.data.raw.find(line => line.pattern_ids.find(pattern_id => pattern_id === notification.pattern_id));
	const stop = stopsContext.data.raw.find(stop => stop.id === notification.stop_id);
	const weekdays = weekdaySort(notification.week_days);

	//
	// B. Render components
	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<LineBadge line={line} size="md" /> <StopName longName={stop?.tts_name} size="md" />
			</div>
			{/* Distance */}
			<div className={styles.time_distance}>
				<div className={styles.distance}>
					{notification.distance_unit === 'min' ? <IconClockPin className={styles.icon} /> : <IconRulerMeasure className={styles.icon} /> } {notification.distance} {t(notification.distance_unit)}
				</div>
				<span>|</span>
				{/* Time */}
				<div className={styles.time}>
					<IconClockHour3 className={styles.icon} />
					{secondsToTime(notification.start_time)} - {secondsToTime(notification.end_time)}
				</div>
			</div>
			{/* Weekdays */}
			<div className={styles.weekdays}>
				<IconCalendar className={styles.icon} />
				{weekdays.map((day, index) => (
					<span key={index}>{
						tWeek(`short.${day}`)
					}{index < notification.week_days.length - 1 ? ',' : ''}
					</span>
				))}
			</div>
		</div>
	);
}
