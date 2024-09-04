'use client';

/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import Section from '@/components/layout/Section';
import LineMap from '@/components/lines/LineMap';
import StopList from '@/components/lines/StopList';
import { useLinesSingleContext } from '@/contexts/LinesSingle.context';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const linesSingleContext = useLinesSingleContext();

	//
	// B. Render components

	if (!linesSingleContext.data.active_pattern_group) {
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
