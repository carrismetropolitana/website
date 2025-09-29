/* * */

import { Grid } from '@/components/layout/Grid';
import { LinesDetailMetricsDemand } from '@/components/lines/LinesDetailMetricsDemand';
import { LinesDetailMetricsService } from '@/components/lines/LinesDetailMetricsService';

/* * */

export function LinesDetailMetrics() {
	return (
		<Grid columns="ab" vAlign="start" withGap>
			<LinesDetailMetricsDemand />
			<LinesDetailMetricsService />
		</Grid>
	);
}
