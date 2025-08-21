'use client';

/* * */

import { DraggableAllPins } from './components/BeachPins/DraggableAllPins';
// Line-specific overlays
import styles from './styles.module.css';
// Base and overlays
import type { ArrabidaMapProps } from './types';

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
				<DraggableAllPins
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
