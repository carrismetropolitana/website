'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import Section from '@/components/layout/Section';
import LinesDetailHeader from '@/components/lines/LinesDetailHeader';
import LinesDetailMetrics from '@/components/lines/LinesDetailMetrics';
import LinesDetailToolbar from '@/components/lines/LinesDetailToolbar';
import StopsAndMapGrid from '@/components/lines/StopsAndMapGrid';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// C. Render components

	if (!linesDetailContext.data.line) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			<LinesDetailHeader />
			<LinesDetailToolbar />
			{linesDetailContext.data.active_alerts && linesDetailContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={linesDetailContext.data.active_alerts} />
			)}
			<StopsAndMapGrid />
			{linesDetailContext.data.demand && (
				<Section childrenWrapperStyles={styles.headingSection} withGap={false} withTopPadding={false} withChildrenPadding>
					<LinesDetailMetrics />
				</Section>
			)}
		</>
	);

	//
}
