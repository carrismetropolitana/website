/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { Link } from '@/i18n/routing';
import { IconCircleArrowRightFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props {
	alert: SimplifiedAlert
}

/* * */

export default function Component({ alert }: Props) {
	//

	return (
		<Link className={styles.container} href={`/alerts/${alert.alert_id}`} target="_blank">
			<AlertActivePeriodStart date={alert.start_date} size="sm" />
			<p className={styles.title}>
				{alert.title}
				<IconCircleArrowRightFilled className={styles.icon} size={16} />
			</p>
		</Link>
	);

	//
}
