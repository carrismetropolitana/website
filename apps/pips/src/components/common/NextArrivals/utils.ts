import type { ArrivalStatus } from '@/types/stops.types';

import { DateTime } from 'luxon';

/* * */

export interface FormattedArrival {
	estimated_arrival_hours: number
	estimated_arrival_minutes: number
	estimated_arrival_seconds: number
	estimated_arrival_unix: number
	label: string
}

interface ComputeFormattedArrivalsArgs {
	allowPastArrivals: boolean
	arrivals: number[]
	nowInSeconds: number
	status: ArrivalStatus
	t: (key: string) => string
}

/* * */

export function computeFormattedArrivals({ allowPastArrivals, arrivals, nowInSeconds, status, t }: ComputeFormattedArrivalsArgs) {
	const result: FormattedArrival[] = [];

	for (const unixTimestamp of arrivals) {
		if (!allowPastArrivals && unixTimestamp < nowInSeconds) continue;

		const secondsUntilArrival = Math.floor(unixTimestamp - nowInSeconds);
		const minutesUntilArrival = Math.floor(secondsUntilArrival / 60);
		const hoursUntilArrival = Math.floor(minutesUntilArrival / 60);

		if (status === 'realtime') {
			let label = '';

			if (minutesUntilArrival <= 0) {
				label = t('arriving');
			}
			else {
				if (hoursUntilArrival > 0) {
					label += `${hoursUntilArrival} ${t('hours')} `;
				}
				label += `${minutesUntilArrival % 60} ${t('minutes')}`;
			}

			result.push({
				estimated_arrival_hours: hoursUntilArrival,
				estimated_arrival_minutes: minutesUntilArrival,
				estimated_arrival_seconds: secondsUntilArrival,
				estimated_arrival_unix: unixTimestamp,
				label: label.trim(),
			});
		}

		if (status === 'scheduled' || status === 'passed' || status === 'canceled') {
			result.push({
				estimated_arrival_hours: hoursUntilArrival,
				estimated_arrival_minutes: minutesUntilArrival,
				estimated_arrival_seconds: secondsUntilArrival,
				estimated_arrival_unix: unixTimestamp,
				label: DateTime.fromSeconds(unixTimestamp).toFormat('HH:mm'),
			});
		}
	}

	return result;
}
