/* * */

// import { MetricsPageAlerts } from '@/components/metrics/alerts/MetricsPageAlerts';
import { MetricsPageAboutOpenData } from '@/components/metrics/MetricsPageAboutOpenData';
import { MetricsPageComplaints } from '@/components/metrics/MetricsPageComplaints';
import { MetricsPageIntro } from '@/components/metrics/MetricsPageIntro';
import { MetricsPageLines } from '@/components/metrics/MetricsPageLines';
import { MetricsPagePassengers } from '@/components/metrics/MetricsPagePassengers';
import { MetricsPageRecords } from '@/components/metrics/MetricsPageRecords';
import { MetricsPageService } from '@/components/metrics/MetricsPageService';
import { MetricsContextProvider } from '@/contexts/Metrics.context';

/* * */

export function MetricsPage() {
	return (
		<MetricsContextProvider>
			<MetricsPageIntro />
			<MetricsPageAboutOpenData />
			<MetricsPagePassengers />
			<MetricsPageRecords />
			<MetricsPageLines />
			<MetricsPageService />
			{/* <MetricsPageAlerts /> */}
			<MetricsPageComplaints />
		</MetricsContextProvider>
	);
}
