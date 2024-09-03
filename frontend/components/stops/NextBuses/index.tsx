import LineBadge from '@/components/common/LineBadge';
import NoDataLabel from '@/components/layout/NoDataLabel';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';

import { NextBusRow } from '../NextBusRow';
import styles from './styles.module.css';

export default function NextBuses() {
	const stopsSingleContext = useStopsSingleContext();
	const realtimeData = stopsSingleContext.data.realtime;

	return realtimeData ? realtimeData.map(realtime => (
		<NextBusRow key={realtime.pattern_id + '-' + realtime.scheduled_arrival} realtime={realtime} />
	)) : <NoDataLabel text="Sem passagens" />;
}
