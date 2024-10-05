'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import Section from '@/components/layout/Section';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render components

	if (!stopsDetailContext.data.stop) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			{stopsDetailContext.data.active_alerts && stopsDetailContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={stopsDetailContext.data.active_alerts} />
			)}
		</>
	);

	//
}
