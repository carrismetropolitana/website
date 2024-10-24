/* * */

import { NextArrivals } from '@/components/common/NextArrivals';
import LineDisplay from '@/components/lines/LineDisplay';
import { useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { Arrival, ArrivalStatus } from '@/types/stops.types';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	arrivalData: Arrival
	status: ArrivalStatus
}

/* * */

export function StopsDetailContentTimetableRow({ arrivalData, status }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow');
	const stopsDetailContext = useStopsDetailContext();

	//
	// B. Transform data

	const isSelected = useMemo(() => {
		const isSameTripId = stopsDetailContext.data.active_trip_id === arrivalData.trip_id;
		const isSameStopSequence = stopsDetailContext.data.active_stop_sequence === arrivalData.stop_sequence;
		return isSameTripId && isSameStopSequence;
	}, [stopsDetailContext.data.active_trip_id, stopsDetailContext.data.active_stop_sequence, arrivalData.trip_id, arrivalData.stop_sequence]);

	// This is needed to avoid rerendering the component when the time changes
	const thisPattern = stopsDetailContext.data.valid_pattern_groups?.find(pattern => pattern.id === arrivalData.id);

	//
	// C. Handle actions

	const handleSelectTrip = useCallback(() => {
		if (isSelected) {
			stopsDetailContext.actions.resetActiveTripId();
			return;
		}
		stopsDetailContext.actions.setActiveTripId(arrivalData.trip_id, arrivalData.stop_sequence);
	}, [arrivalData.trip_id, arrivalData.stop_sequence, stopsDetailContext.actions.setActiveTripId]);

	//
	// D. Render components

	if (!thisPattern) {
		return null;
	}

	return (
		<div className={`${styles.container} ${styles[status]} ${isSelected && styles.isSelected}`} onClick={handleSelectTrip}>

			<div className={styles.summary}>
				<LineDisplay
					color={thisPattern.color}
					longName={thisPattern.headsign}
					shortName={thisPattern.line_id}
					textColor={thisPattern.text_color}
				/>
				<NextArrivals
					arrivals={[arrivalData.estimated_arrival_unix || arrivalData.scheduled_arrival_unix]}
					status={status}
					withIcon={true}
				/>
			</div>

			{isSelected && (
				<div className={styles.details}>

					{thisPattern.localities.length > 0 && (
						<div className={styles.localitiesListWrapper}>
							<p className={styles.localitiesLabel}>{t('localities.label')}</p>
							<p>
								{thisPattern.localities.map((locality, index) => (
									<span key={index}>
										{index > 0 && <span className={styles.localitySeparator}> • </span>}
										<span className={styles.localityName}>{locality}</span>
									</span>
								))}
							</p>
						</div>
					)}

				</div>
			)}

		</div>
	);
}
