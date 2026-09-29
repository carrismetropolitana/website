/* * */

import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
// import { LinesDetailMetricsDemand } from '@/components/lines/LinesDetailMetricsDemand';
// import { LinesDetailMetricsService } from '@/components/lines/LinesDetailMetricsService';
import { MetricsContextProvider } from '@/contexts/Metrics.context';

/* * */

export function LinesDetailMetrics() {
	return (
		<MetricsContextProvider>
			<NoDataLabel text="Dados de qualidade de serviço em atualização" />
			{/* <Grid columns="ab" vAlign="start" withGap>
				<LinesDetailMetricsDemand />
				<LinesDetailMetricsService />
			</Grid> */}
		</MetricsContextProvider>
	);
}
