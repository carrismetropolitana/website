/* * */

import { StopProbeSection } from '@/components/stops/StopProbeSection';
import { useTranslations } from 'next-intl';

/* * */

export function StopProbe() {
	//

	//
	// A. Setup Variables

	const t = useTranslations('stops.Probe');
	const url = window.location.href;
	const selectedStop = url.split('/').pop();

	//
	// B. Render Components

	return (
		<StopProbeSection description={t('description')} selectedStop={selectedStop || ''} title={t('title')} />
	);

	//
}
