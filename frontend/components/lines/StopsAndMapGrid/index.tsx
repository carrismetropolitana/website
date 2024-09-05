'use client';

/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import LineMap from '@/components/lines/LineMap';
import StopList from '@/components/lines/StopList';
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

	if (!linesDetailContext.data.active_pattern_group) {
		return (
			<Section childrenWrapperStyles={styles.noPatternWrapper} withTopPadding={false}>
				<NoDataLabel text="selecione um pattern" />
			</Section>
		);
	}

	return (
		<Section childrenWrapperStyles={styles.container} withTopPadding={false}>
			<StopList />
			<div className={styles.mapWrapper}>
				<LineMap />
			</div>
		</Section>
	);

	//
}
