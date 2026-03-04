/* * */

'use client';

/* * */

import type { ArrivalStatus } from '@/types/stops.types';

import { LiveIcon } from '@/components/common/LiveIcon';
import { computeFormattedArrivals } from '@/components/common/NextArrivals/utils';
import { IconClockHour9 } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';

import nextArrivalsStyles from '@/components/common/NextArrivals/styles.module.css';

/* * */

interface Props {
	arrivalUnix: number
	nowInSeconds: number
	size?: 'lg' | 'md'
	status: ArrivalStatus
}

const cx = classNames.bind(nextArrivalsStyles);

/* * */

export function PipsArrivalsTableTimeCell({ arrivalUnix, nowInSeconds, size = 'lg', status }: Props) {
	const t = useTranslations('common.NextArrivals');

	const formatted = computeFormattedArrivals({
		allowPastArrivals: false,
		arrivals: [arrivalUnix],
		nowInSeconds,
		status,
		t,
	})[0];

	if (!formatted) {
		return null;
	}

	return (
		<div className={`${nextArrivalsStyles.container} ${nextArrivalsStyles[status]}`}>
			<div className={nextArrivalsStyles.list}>
				{status === 'realtime' ? <LiveIcon /> : <IconClockHour9 size={15} />}
				<p className={cx({ arrival: true, lg: size === 'lg', md: size === 'md' })}>
					{formatted.label}
				</p>
			</div>
		</div>
	);
}
