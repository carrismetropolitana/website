'use client';

/* * */

import { LineDisplay } from '@/components/lines/LineDisplay';
import { StopsDetailContentTimetableClock } from '@/components/stops/StopsDetailContentTimetableClock';
import { StopsDetailViewTimetableRowArrival } from '@/components/stops/StopsDetailContentTimetableRowArrival';
import { StopsDetailViewTimetableData } from '@/contexts/StopsDetail.context';
import { useSelectedTrip } from '@/hooks/use-selected-trip';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface StopsDetailViewTimetableRowProps {
	data: StopsDetailViewTimetableData
	withClock: boolean
}

/* * */

export function StopsDetailViewTimetableRow({ data, withClock }: StopsDetailViewTimetableRowProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailViewTimetableRow');

	const { selectedTripData, setSelectedTrip } = useSelectedTrip();

	//
	// B. Transform data

	const isSelected = useMemo(() => {
		const isSamePatternId = selectedTripData.patternId === data.pattern_id;
		const isSameTripId = selectedTripData.tripId === data.trip_ids[0];
		const isSameStopSequence = selectedTripData.stopSequence === data.stop_sequence;
		return isSamePatternId && isSameTripId && isSameStopSequence;
	}, [selectedTripData, data]); ;

	//
	// C. Handle actions

	const handleClick = () => {
		setSelectedTrip(data.pattern_id, data.trip_ids[0], data.stop_sequence);
	};

	//
	// D. Render components

	return (
		<>

			{withClock && (
				<div className={styles.clockWrapper}>
					<StopsDetailContentTimetableClock />
				</div>
			)}

			<div
				className={styles.container}
				data-is-past={data.is_past}
				data-is-selected={isSelected}
				data-with-clock={withClock}
				onClick={handleClick}
			>

				<div className={styles.summary}>
					<LineDisplay
						agencyId={data.agency_id}
						color={data.color}
						longName={data.headsign}
						shortName={data.short_name}
						textColor={data.text_color}
					/>
					<StopsDetailViewTimetableRowArrival data={data} />
				</div>

				{data.locality_names?.length > 0 && (
					<div className={styles.details}>
						<p className={styles.localitiesList}>{t('localities', { localities: data.locality_names.join(', ') })}</p>
					</div>
				)}

			</div>

		</>
	);
}
