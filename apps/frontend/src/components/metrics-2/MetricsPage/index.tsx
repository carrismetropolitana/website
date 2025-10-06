/* * */

import { MetricsPageAboutOpenData } from '@/components/metrics-2/MetricsPageAboutOpenData';
import { MetricsPageAlerts } from '@/components/metrics-2/MetricsPageAlerts';
import { MetricsPageComplaints } from '@/components/metrics-2/MetricsPageComplaints';
import { MetricsPageIntro } from '@/components/metrics-2/MetricsPageIntro';
import { MetricsPageLines } from '@/components/metrics-2/MetricsPageLines';
import { MetricsPagePassengers } from '@/components/metrics-2/MetricsPagePassengers';
import { MetricsPageRecords } from '@/components/metrics-2/MetricsPageRecords';
import { MetricsPageService } from '@/components/metrics-2/MetricsPageService';

/* * */

export function MetricsPage() {
	return (
		<>
			<MetricsPageIntro />
			<MetricsPageAboutOpenData />
			<MetricsPagePassengers />
			<MetricsPageRecords />
			<MetricsPageLines />
			<MetricsPageService />
			<MetricsPageAlerts />
			<MetricsPageComplaints />
		</>
	);
}
