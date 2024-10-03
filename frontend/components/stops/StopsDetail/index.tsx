'use client';

/* * */

import StopDetailAlerts from '@/components/stops/StopDetailAlerts';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function StopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopDetailAlerts />
			<StopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
