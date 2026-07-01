/* * */

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { IconCircleArrowRightFilled } from '@tabler/icons-react';
import { type HubAlert } from '@tmlmobilidade/go-types-public-info';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface Props {
	alert: HubAlert
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
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alert._id, alert_title: alert.title }));
	};

	//
	// C. Render components

	return (
		<Link className={styles.container} href={`/alerts/${alert._id}`} onClick={handleAlertClick} target={target}>
			<AlertActivePeriodStart date={new Date(alert.active_period_start_date)} size="sm" />
			<p className={styles.title}>
				{alert.title}
				<IconCircleArrowRightFilled className={styles.icon} size={16} />
			</p>
		</Link>
	);

	//
}
