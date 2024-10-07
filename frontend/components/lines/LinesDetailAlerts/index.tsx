'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.line || !linesDetailContext.data.active_alerts || linesDetailContext.data.active_alerts?.length === 0) {
		return null;
	}

	return (
		<Surface>
			<AlertsCarousel alerts={linesDetailContext.data.active_alerts} />
		</Surface>
	);

	//
}
