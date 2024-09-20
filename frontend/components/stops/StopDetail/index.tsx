'use client';
/* * */

import StopDetailAlerts from '@/components/stops/StopDetailAlerts';
import StopDetailContent from '@/components/stops/StopDetailContent';
import StopDetailHeader from '@/components/stops/StopDetailHeader';
import StopDetailToolbar from '@/components/stops/StopDetailToolbar';

/* * */

export default function Component() {
	return (
		<>
			<StopDetailHeader />
			<StopDetailToolbar />
			<StopDetailAlerts />
			<StopDetailContent />
			{/* TODO */}
			{/* <StopDetailMetrics /> */}
		</>
	);
}
