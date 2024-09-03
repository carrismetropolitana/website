import LineBadge from '@/components/common/LineBadge';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { StopRealtime } from '@/types/stops.types';

import styles from './styles.module.css';

export function NextBusRow({ realtime }: { realtime: StopRealtime }) {
	const stopsSingleContext = useStopsSingleContext();
	// return (
	// 	<div className={`${styles.container} ${styles[tripRealtimeStatus]} ${FrontendStopsContext.entities.trip_id === tripData.trip_id && styles.selected}`} onClick={handleSelectTrip}>
	// 		<div className={styles.tripSummary}>
	// 			<LineDisplay color={patternData?.color} long_name={patternData?.headsign} short_name={tripData.line_id} text_color={patternData?.text_color} />
	// 			{tripRealtimeStatus === 'passed'
	// 			&& (
	// 				<div className={styles.arrivalEstimate}>
	// 					<p>{t('trip_realtime_status.passed', { value: tripEtaString })}</p>
	// 				</div>
	// 			)}
	// 			{tripRealtimeStatus === 'arriving_now'
	// 			&& (
	// 				<div className={styles.arrivalEstimate}>
	// 					<LiveIcon />
	// 					<p>{t('trip_realtime_status.arriving_now')}</p>
	// 				</div>
	// 			)}
	// 			{tripRealtimeStatus === 'realtime'
	// 			&& (
	// 				<div className={styles.arrivalEstimate}>
	// 					<LiveIcon />
	// 					<p>{t('trip_realtime_status.realtime', { value: tripEtaMinutes })}</p>
	// 				</div>
	// 			)}
	// 			{tripRealtimeStatus === 'scheduled'
	// 			&& (
	// 				<div className={styles.arrivalEstimate}>
	// 					<p>{t('trip_realtime_status.scheduled', { value: tripEtaString })}</p>
	// 				</div>
	// 			)}
	// 		</div>

	// 		<div className={styles.tripDetails}>
	// 			{debugContext.isDebug
	// 			&& (
	// 				<div className={styles.testData} onClick={e => e.stopPropagation()}>
	// 					<CopyBadge label={`stop_id: ${FrontendStopsContext.entities.stop?.id}`} value={FrontendStopsContext.entities.stop?.id} />
	// 					<CopyBadge label={`trip_id: ${tripData.trip_id}`} value={tripData.trip_id} />
	// 					<CopyBadge label={`stop_seq: ${tripData.stop_sequence}`} value={tripData.stop_sequence} />
	// 					<CopyBadge label={`vehicle_id: ${tripData.vehicle_id}`} value={tripData.vehicle_id} />
	// 					<CopyBadge label={`Observado: ${tripData.observed_arrival}`} value={tripData.observed_arrival} />
	// 					<CopyBadge label={`Estimado: ${tripData.estimated_arrival}`} value={tripData.estimated_arrival} />
	// 					<CopyBadge label={`Planeado: ${tripData.scheduled_arrival}`} value={tripData.scheduled_arrival} />
	// 				</div>
	// 			)}

	// 			{(tripRealtimeStatus === 'realtime' || tripRealtimeStatus === 'arriving_now' || tripRealtimeStatus === 'passed') && tripEtaMinutes > -10 && tripData.vehicle_id && !debugContext.isDebug && <FrontendStopsTimetableFeedback tripData={tripData} />}

	// 			<div className={styles.localitiesPerLine}>
	// 				<p>Passa por</p>
	// 				<p className={styles.localities}>
	// 					{patternData?.localities?.length > 0
	// 					&& patternData.localities.map((locality, index) => (
	// 						<span key={index}>
	// 							{index > 0 && <span className={styles.localitySeparator}> • </span>}
	// 							<span className={styles.localityName}>{locality}</span>
	// 						</span>
	// 					),

	// 					)}
	// 				</p>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return <div>stophere</div>;
}
