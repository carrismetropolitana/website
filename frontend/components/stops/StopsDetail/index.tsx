'use client';

/* * */

import { StopProbe } from '@/components/stops/StopProbe';
import { StopsDetailAlerts } from '@/components/stops/StopsDetailAlerts';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function StopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopProbe />
			<StopsDetailAlerts />
			<StopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
