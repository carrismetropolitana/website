/* * */

import { Grid } from '@/components/layout/Grid';
import { LinesDetailMetricsDemand } from '@/components/lines/LinesDetailMetricsDemand';
import { LinesDetailMetricsService } from '@/components/lines/LinesDetailMetricsService';
import { MetricsContextProvider } from '@/contexts/Metrics.context';

/* * */

export function LinesDetailMetrics() {
	return (
		<MetricsContextProvider>
			<Grid columns="ab" vAlign="start" withGap>
				<LinesDetailMetricsDemand />
				<LinesDetailMetricsService />
			</Grid>
		</MetricsContextProvider>
	);
}
