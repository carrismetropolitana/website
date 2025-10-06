'use client';

/* * */

import type { ArrabidaMapProps } from './types';

import styles from './styles.module.css';

import { DraggableMapLayers } from './components';
import { BEACH_PINS } from './constants';

/* * */

export function ArrabidaMap({
	onPinClick,
	selectedAccordionId,
	selectedLineId,
}: ArrabidaMapProps = {}) {
	const getLineToShow = () => {
		if (selectedLineId) return selectedLineId;

		if (selectedAccordionId) {
			const selectedBeach = BEACH_PINS.find(beach => beach.accordionId === selectedAccordionId);
			return selectedBeach?.lineIds?.[0] || null;
		}

		return null;
	};

	const displayLineId = getLineToShow();

	return (
		<div className={styles.container}>
			<div className={styles.mapContainer}>
				<DraggableMapLayers
					enableDoubleClickReset={true}
					onPinClick={onPinClick}
					selectedAccordionId={selectedAccordionId}
					selectedLineId={displayLineId}
					style={{ display: 'block', height: '100%', width: '100%' }}
				/>
			</div>
		</div>
	);
}
