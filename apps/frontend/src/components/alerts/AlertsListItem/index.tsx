'use client';

/* * */

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { useEnvironmentContext } from '@/contexts/Environment.context';
import { Accordion } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	alertId: string
}

/* * */

export function AlertListItem({ alertId }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListItem');
	const alertsContext = useAlertsContext();
	const analyticsContext = useAnalyticsContext();
	const environmentContext = useEnvironmentContext();

	//
	// B. Transform data

	const alertData = alertsContext.actions.getAlertById(alertId);
	const alertHref = environmentContext.actions.getNormalizedHref(`/alerts/${alertId}`);

	//
	// C. Handle Actions

	const handleAlertDetailClick = () => {
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alertId, alert_title: alertData?.title || '' }));
	};

	//
	// D. Render components

	return (
		<Accordion.Item value={alertId}>
			<Accordion.Control icon={<AlertEffectIcon effect={alertData?.effect} />}>{alertData?.title}</Accordion.Control>
			<Accordion.Panel classNames={{ content: styles.contentWrapper }}>
				<div className={styles.infoBar}>
					<AlertActivePeriodStart date={new Date(alertData?.active_period_start_date)} size="sm" />
				</div>
				<p className={styles.description}>{alertData?.description}</p>
				{alertData?.image_url && <AlertsListItemImageThumbnail alertId={alertData?._id || ''} alertTitle={alertData?.title || ''} alt={alertData?.title} href={`/alerts/${alertId}`} src={alertData.image_url} />}
				<div onClick={handleAlertDetailClick}>
					<Button href={alertHref} icon={<IconArrowUpRight size={16} />} label={t('open')} variant="pill" />
				</div>
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
