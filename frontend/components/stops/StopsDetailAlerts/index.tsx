'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import { Surface } from '@/components/layout/Surface';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';

/* * */

export function StopsDetailAlerts() {
	//

	//
	// A. Setup variables

	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render components

	if (!stopsDetailContext.data.stop || !stopsDetailContext.data.active_alerts || stopsDetailContext.data.active_alerts?.length === 0) {
		return null;
	}

	return (
		<Surface>
			<AlertsCarousel alerts={stopsDetailContext.data.active_alerts} />
		</Surface>
	);

	//
}
