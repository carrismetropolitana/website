'use client';

/* * */

import StopDetailAlerts from '@/components/stops/StopDetailAlerts';
import StopDetailContent from '@/components/stops/StopDetailContent';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function StopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopDetailAlerts />
			<StopDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
