'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

import LinesDetailMetricsDemand from '../LinesDetailMetricsDemand';
import LinesDetailMetricsService from '../LinesDetailMetricsService';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables
	const linesDetailContext = useLinesDetailContext();
	//
	// C. Render components

	if (!linesDetailContext.data.line || !linesDetailContext.data.demand) {
		return null;
	}

	return (
		<Grid columns="ab" withGap>
			<LinesDetailMetricsService />
			<LinesDetailMetricsDemand />
		</Grid>

	);

	//
}
