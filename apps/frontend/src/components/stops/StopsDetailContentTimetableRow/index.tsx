'use client';

/* * */

import { NextArrivals } from '@/components/common/NextArrivals';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { StopsDetailContentTimetableClock } from '@/components/stops/StopsDetailContentTimetableClock';
import { StopsDetailContentTimetableRowDebug } from '@/components/stops/StopsDetailContentTimetableRowDebug';
import { useDebugContext } from '@/contexts/Debug.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { type StopsDetailViewTimetableData, useStopsDetailContext } from '@/contexts/StopsDetail.context';
import { useSelectedTrip } from '@/hooks/use-selected-trip';
import { type Arrival, type ArrivalStatus } from '@/types/stops.types';
import { normalizeReferenceId } from '@/utils/alerts';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	data: StopsDetailViewTimetableData
	status: ArrivalStatus
	withClock: boolean
}

/* * */

export function StopsDetailViewTimetableRow({ data, status, withClock }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.StopsDetailContentTimetableRow');
	const debugContext = useDebugContext();
	const operationalDateContext = useOperationalDateContext();
	const stopsDetailContext = useStopsDetailContext();
	const { selectedTripData, setSelectedTrip } = useSelectedTrip();

	//
	// B. Transform data

	const isSamePatternId = selectedTripData.patternId === data.pattern_id;
	const isSameTripId = selectedTripData.tripId === data.trip_ids[0];
	const isSameStopSequence = selectedTripData.stopSequence === data.stop_sequence;
	const isSelected = isSamePatternId && isSameTripId && isSameStopSequence;

	const lineId = normalizeReferenceId(data.line_id);
	const scheduledArrivalUnix = data.arrival_scheduled_ms / 1_000;
	const effectiveArrivalUnix = (data.arrival_effective_ms ?? data.arrival_scheduled_ms) / 1_000;

	const debugArrivalData: Arrival = {
		estimated_arrival: null,
		estimated_arrival_unix: data.arrival_estimated_ms ? data.arrival_estimated_ms / 1_000 : null,
		headsign: data.headsign,
		line_id: data.line_id,
		observed_arrival: null,
		observed_arrival_unix: null,
		pattern_id: data.pattern_id,
		related_trip_ids: data.trip_ids,
		route_id: '',
		scheduled_arrival: '',
		scheduled_arrival_unix: scheduledArrivalUnix,
		stop_sequence: data.stop_sequence,
		trip_id: data.trip_ids[0],
		vehicle_id: null,
	};

	//
	// C. Handle actions

	const handleClick = () => {
		setSelectedTrip(data.pattern_id, data.trip_ids[0], data.stop_sequence);
		if (isSelected) stopsDetailContext.actions.resetActiveTripId();
		else stopsDetailContext.actions.setActiveTripId(data.trip_ids[0]);
	};

	//
	// D. Render components

	return (
		<>

			{withClock && <StopsDetailContentTimetableClock />}

			<div className={`${styles.container} ${styles[status]} ${isSelected && styles.isSelected}`} onClick={handleClick}>

				<div className={styles.summary}>
					<LineDisplay
						color={data.color}
						longName={data.headsign}
						shortName={data.short_name}
						textColor={data.text_color}
					/>
					{status === 'passed' && debugContext.flags.is_debug_mode && (
						<NextArrivals
							arrivals={[scheduledArrivalUnix]}
							status="scheduled"
							withIcon
						/>
					)}
					<NextArrivals
						arrivals={[status === 'realtime' ? effectiveArrivalUnix : scheduledArrivalUnix]}
						status={status}
						withIcon
					/>
				</div>

				{isSelected && debugContext.flags.is_debug_mode && (
					<div className={styles.details} onClick={event => event.stopPropagation()}>
						<StopsDetailContentTimetableRowDebug arrivalData={debugArrivalData} />
					</div>
				)}

				{isSelected && (
					<div className={styles.details}>
						<Link
							className={styles.openLinePage}
							href={`/lines/${lineId}?date=${operationalDateContext.data.selected_date?.operational_date}&active_pattern_id=${data.pattern_id}`}
							onClick={event => event.stopPropagation()}
							target="_blank"
						>
							{t('open_line_page')}
						</Link>
						{data.locality_names.length > 0 && (
							<div className={styles.localitiesListWrapper}>
								<p className={styles.localitiesListLabel}>{t('localities.label')}</p>
								<p>
									{data.locality_names.map((localityName, index) => (
										<span key={`${localityName}-${index}`}>
											{index > 0 && <span className={styles.localitySeparator}> • </span>}
											<span className={styles.localityName}>{localityName}</span>
										</span>
									))}
								</p>
							</div>
						)}
					</div>
				)}

			</div>

		</>
	);
}
