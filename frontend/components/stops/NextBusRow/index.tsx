import CopyBadge from '@/components/common/CopyBadge';
import LiveIcon from '@/components/common/LiveIcon';
import { useDebugContext } from '@/contexts/Debug.context';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { StopRealtime } from '@/types/stops.types';
import { useWhatChanged } from '@simbathesailor/use-what-changed';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import LineDisplay from '../LineDisplay';
import styles from './styles.module.css';

function getTripRealtimeStatus(tripData: StopRealtime) {
	const consideredTime = tripData.estimated_arrival_unix || tripData.scheduled_arrival_unix;
	const currentTime = new Date().getTime() / 1000;

	const timeDifference = consideredTime - currentTime;

	if (timeDifference < -10) return 'passed';
	if (timeDifference < 60) return 'arriving_now';

	if (tripData.estimated_arrival_unix) return 'realtime';
	return 'scheduled';
}

export function NextBusRow({ realtime }: { realtime: StopRealtime }) {
	// A. Setup variables
	const stopsSingleContext = useStopsSingleContext();
	const debugContext = useDebugContext();
	const t = useTranslations('stops.NextBusRow');

	// B. Transform data
	const tripRealtimeStatus = getTripRealtimeStatus(realtime);
	const bestTime = realtime.estimated_arrival_unix || realtime.scheduled_arrival_unix;
	const isSelectedRow = stopsSingleContext.data.active_trip_id === realtime.trip_id;

	// in format HH:mm
	const tripEtaString = dayjs.unix(bestTime).format('HH:mm');

	// This is needed to avoid rerendering the component when the time changes
	const tripEtaMinutes = tripRealtimeStatus === 'realtime' && Math.floor((bestTime - (new Date().getTime() / 1000)) / 60);
	const thisPattern = stopsSingleContext.data.valid_pattern_groups?.find(pattern => pattern.pattern_id === realtime.pattern_id);

	// C. Handle events
	const handleSelectTrip = useCallback(() => {
		stopsSingleContext.actions.setActiveTripId(realtime.trip_id);
	}, [realtime.trip_id, stopsSingleContext.actions.setActiveTripId]);
	if (!thisPattern) return null;

	// D. Render component
	return (
		<div className={`${styles.container} ${styles[tripRealtimeStatus]} ${isSelectedRow && styles.selected}`} onClick={handleSelectTrip}>
			<div className={styles.tripSummary}>
				<LineDisplay color={thisPattern.color} long_name={thisPattern.headsign} short_name={thisPattern.line_id} text_color={thisPattern.text_color} />
				{tripRealtimeStatus === 'passed'
				&& (
					<div className={styles.arrivalEstimate}>
						<p>{t('passed', { value: tripEtaString })}</p>
					</div>
				)}
				{tripRealtimeStatus === 'arriving_now'
				&& (
					<div className={styles.arrivalEstimate}>
						<LiveIcon />
						<p>{t('arriving_now')}</p>
					</div>
				)}
				{tripRealtimeStatus === 'realtime'
				&& (
					<div className={styles.arrivalEstimate}>
						<LiveIcon />
						<p>{t('realtime', { value: tripEtaMinutes })}</p>
					</div>
				)}
				{tripRealtimeStatus === 'scheduled'
				&& (
					<div className={styles.arrivalEstimate}>
						<p>{t('scheduled', { value: tripEtaString })}</p>
					</div>
				)}
			</div>

			<div className={styles.tripDetails}>
				{debugContext.flags.is_debug_mode
				&& (
					<div className={styles.testData} onClick={e => e.stopPropagation()}>
						<CopyBadge label={`stop_id: ${stopsSingleContext.data.stop?.id}`} value={stopsSingleContext.data.stop?.id || 'None'} />
						<CopyBadge label={`trip_id: ${realtime.trip_id}`} value={realtime.trip_id} />
						<CopyBadge label={`stop_seq: ${realtime.stop_sequence}`} value={realtime.stop_sequence} />
						<CopyBadge label={`vehicle_id: ${realtime.vehicle_id}`} value={realtime.vehicle_id || 'None'} />
						<CopyBadge label={`Observado: ${realtime.observed_arrival}`} value={realtime.observed_arrival || 'None'} />
						<CopyBadge label={`Estimado: ${realtime.estimated_arrival}`} value={realtime.estimated_arrival || 'None'} />
						<CopyBadge label={`Planeado: ${realtime.scheduled_arrival}`} value={realtime.scheduled_arrival} />
					</div>
				)}

				{/* //TODO - Implement feedback */}
				{/* {(tripRealtimeStatus === 'realtime' || tripRealtimeStatus === 'arriving_now' || tripRealtimeStatus === 'passed') && tripEtaMinutes > -10 && realtime.vehicle_id && !debugContext.flags.is_debug_mode && <FrontendStopsTimetableFeedback realtime={realtime} />} */}

				<div className={styles.localitiesPerLine}>
					<p>Passa por</p>
					<p className={styles.localities}>
						{thisPattern.localities.length > 0
						&& thisPattern.localities.map((locality, index) => (
							<span key={index}>
								{index > 0 && <span className={styles.localitySeparator}> • </span>}
								<span className={styles.localityName}>{locality}</span>
							</span>
						),

						)}
					</p>
				</div>
			</div>
		</div>
	);
}
