'use client';

/* * */

import StopDetailAlerts from '@/components/stops/StopDetailAlerts';
import StopDetailContent from '@/components/stops/StopDetailContent';
import StopDetailToolbar from '@/components/stops/StopDetailToolbar';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function StopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopDetailToolbar />
			<StopDetailAlerts />
			<StopDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
