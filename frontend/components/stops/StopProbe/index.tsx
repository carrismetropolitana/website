'use client';

/* * */

import { StopProbeSection } from '@/components/stops/StopProbeSection';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useTranslations } from 'next-intl';

/* * */

export function StopProbe() {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');

	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Render Components

	return (
		<StopProbeSection description={t('description')} selectedStop={stopsDetailContext.data.active_stop_id} title={t('title')} />
	);

	//
}
