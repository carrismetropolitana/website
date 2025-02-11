/* * */

import { StopProbeSection } from '@/components/stops/StopProbeSection';
import { useTranslations } from 'next-intl';

/* * */

export function StopProbe() {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');

	//
	// B. Render Components

	return (
		<StopProbeSection description={t('description')} title={t('title')} />
	);

	//
}
