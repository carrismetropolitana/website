'use client';

/* * */

import NoDataLabel from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import LinesDetailPathList from '@/components/lines/LinesDetailPathList';
import LinesDetailPathMap from '@/components/lines/LinesDetailPathMap';
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
			<Surface>
				<NoDataLabel text="selecione um pattern" withMinHeight />
			</Surface>
		);
	}

	return (
		<Surface>
			<Section>
				<div className={styles.container}>
					<LinesDetailPathList />
					<div className={styles.mapWrapper}>
						<LinesDetailPathMap />
					</div>
				</div>
			</Section>
		</Surface>
	);

	//
}
