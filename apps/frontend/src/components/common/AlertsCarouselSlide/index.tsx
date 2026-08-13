/* * */

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { type SimplifiedAlert } from '@/types/alerts.types';
import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	alert: SimplifiedAlert
	target?: '_blank' | '_self'
}

/* * */

export function AlertsCarouselSlide({ alert, target = '_blank' }: Props) {
	//

	//
	// A. Setup variables

	const analyticsContext = useAnalyticsContext();

	//
	// B. Handle actions

	const handleAlertClick = () => {
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alert.alert_id, alert_title: alert.title }));
	};

	//
	// C. Render components

	return (
		<Link className={styles.container} href={`/alerts/${alert.alert_id}`} onClick={handleAlertClick} target={target}>
			<AlertActivePeriodStart date={alert.start_date} size="sm" />
			<p className={styles.title}>
				{alert.title}
				<IconCircleArrowRightFilled className={styles.icon} size={16} />
			</p>
		</Link>
	);

	//
}
