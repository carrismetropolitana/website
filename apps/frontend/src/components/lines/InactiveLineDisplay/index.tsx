/* * */

import { LineBadge } from '@/components/lines/LineBadge';
import { LineName } from '@/components/lines/LineName';

import styles from './styles.module.css';

/* * */

interface Props {
	lineId: string
	message: string
}

/* * */

export function InactiveLineDisplay({ lineId, message }: Props) {
	//

	return (
		<div className={styles.container}>
			<LineBadge
				color="var(--color-system-text-400)"
				shortName={lineId}
				size="md"
				textColor="var(--color-system-background-100)"
			/>
			<LineName longName={message} />
		</div>
	);

	//
}
