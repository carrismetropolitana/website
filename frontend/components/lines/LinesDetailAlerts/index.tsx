'use client';

/* * */

import AlertsCarousel from '@/components/common/AlertsCarousel';
import { Section } from '@/components/layout/Section';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesDetailContext = useLinesDetailContext();

	//
	// B. Render components

	if (!linesDetailContext.data.line) {
		return <Section withTopBorder={false} backRouter withChildrenPadding />;
	}

	return (
		<>
			{linesDetailContext.data.active_alerts && linesDetailContext.data.active_alerts?.length > 0 && (
				<AlertsCarousel alerts={linesDetailContext.data.active_alerts} />
			)}
		</>
	);

	//
}
