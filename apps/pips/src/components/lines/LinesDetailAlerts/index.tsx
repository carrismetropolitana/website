'use client';

/* * */

import { AlertsCarousel } from '@/components/common/AlertsCarousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useTranslations } from 'next-intl';

/* * */

export function LinesDetailAlerts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetailAlerts');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.line || !linesDetailContext.data.active_alerts || linesDetailContext.data.active_alerts?.length === 0) {
		return null;
	}

	return (
		<Surface variant="alerts">
			<Section heading={t('heading')} withGap>
				<AlertsCarousel alerts={linesDetailContext.data.active_alerts} />
			</Section>
		</Surface>
	);

	//
}
