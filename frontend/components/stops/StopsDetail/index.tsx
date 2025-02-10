'use client';

/* * */

import { StopInquiry } from '@/components/stops/StopInquiry';
import { StopsDetailAlerts } from '@/components/stops/StopsDetailAlerts';
import { StopsDetailContent } from '@/components/stops/StopsDetailContent';
import { StopsDetailHeader } from '@/components/stops/StopsDetailHeader';

/* * */

export function StopsDetail() {
	return (
		<>
			<StopsDetailHeader />
			<StopInquiry />
			<StopsDetailAlerts />
			<StopsDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
