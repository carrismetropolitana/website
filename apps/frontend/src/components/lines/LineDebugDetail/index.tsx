/* * */

import { CopyBadge } from '@/components/common/CopyBadge';
import { type Pattern } from '@carrismetropolitana/api-types/network';

import styles from './styles.module.css';

/* * */

interface Props {
	activePattern: null | Pattern
	lineColor: string
	totalStops: number | undefined
}

/* * */

export function LineDebugDetail({ activePattern, lineColor, totalStops }: Props) {
	return (
		<div className={styles.container}>
			<CopyBadge label={`Pattern ID: ${activePattern?.id || 'NULL'}`} value={activePattern?.id || 'NULL'} />
			<CopyBadge label={`Direction ID: ${activePattern?.direction_id || 'NULL'}`} value={activePattern?.direction_id || 'NULL'} />
			<CopyBadge label={`Headsign: ${activePattern?.headsign || 'NULL'}`} value={activePattern?.headsign || 'NULL'} />
			<CopyBadge label={`Line Color: ${lineColor}`} value={lineColor} />
			<CopyBadge label={`Total Stops: ${totalStops}`} value={totalStops || -1} />
			<CopyBadge label={`Pattern Version ID: ${activePattern?.version_id || 'NULL'}`} value={activePattern?.version_id || 'NULL'} />
		</div>
	);
}
