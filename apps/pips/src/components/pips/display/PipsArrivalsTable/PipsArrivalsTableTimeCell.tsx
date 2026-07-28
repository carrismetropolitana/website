/* * */

'use client';

/* * */

import type { ArrivalStatus } from '@/types/stops.types';

import { NextArrivals } from '@/components/common/NextArrivals';

/* * */

interface Props {
	arrivalUnix: number
	size?: 'lg' | 'md'
	status: ArrivalStatus
}

/* * */

export function PipsArrivalsTableTimeCell({ arrivalUnix, size = 'lg', status }: Props) {
	return (
		<NextArrivals
			allowPastArrivals={false}
			arrivals={[arrivalUnix]}
			size={size}
			status={status}
		/>
	);
}
