/* * */

import type { SimplifiedAlert } from '@/types/alerts.types';

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { RoutesSchedule } from '@/utils/routes';
import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	alert: SimplifiedAlert
}

/* * */

export default function Component({ alert }: Props) {
	//

	//
	// A. Setup Variables

	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleAlertClick = () => {
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alert.alert_id, alert_title: alert.title }));
	};

	//
	return (
		<Link className={styles.container} href={`${RoutesSchedule.ALERTS.route}/${alert.alert_id}`} onClick={handleAlertClick} target="_blank">
			<AlertActivePeriodStart date={alert.start_date} size="sm" />
			<p className={styles.title}>
				{alert.title}
				<IconCircleArrowRightFilled className={styles.icon} size={16} />
			</p>
		</Link>
	);

	//
}
