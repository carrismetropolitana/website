import LiveIcon from '@/components/common/LiveIcon';
import { useOperationalDayContext } from '@/contexts/OperationalDay.context';
import { IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';

import styles from './styles.module.css';

function formatDelta(ms: number) {
	let toReturn = '';
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	if (minutes <= 0) {
		return 'A chegar';
	}

	if (hours > 0) {
		toReturn += `${hours} hora${hours > 1 ? 's' : ''} `;
	}
	if (minutes > 0) {
		toReturn += `${minutes % 60} minuto${minutes > 1 ? 's' : ''} `;
	}
	return toReturn;
}

export default function SingleLineSimpleContent({ nextArrival }: { nextArrival: { type: 'realtime' | 'scheduled', unixTs: number } | undefined }) {
	// A. Setup variables
	const now = Date.now();
	const operationalDayContext = useOperationalDayContext();

	// D. Render components
	return (
		<> {
			nextArrival != undefined
			&& operationalDayContext.flags.is_today_selected
			&& (nextArrival.type === 'realtime'
				? <div className={styles.live}><LiveIcon /> {formatDelta(nextArrival.unixTs - now)}</div>
				: nextArrival.unixTs
				&& <div className={styles.scheduled}><IconClock size={16} />{dayjs(nextArrival.unixTs).format('HH:mm')}</div>)
		}
		</>
	);
}
