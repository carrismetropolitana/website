'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Routes } from '@/utils/routes';
import { Accordion } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	alertId: string
}

/* * */

export default function Component({ alertId }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListItem');
	const alertsContext = useAlertsContext();
	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	const simplifiedAlertData = alertsContext.actions.getSimplifiedAlertById(alertId);

	//
	// C. Handle Actions

	const handleAlertDetailClick = () => {
		analyticsContext.actions.capture(ampli => ampli.alertClicked({ alert_id: alertId, alert_title: simplifiedAlertData?.title || '' }));
	};

	//
	// D. Render components

	return (
		<Accordion.Item value={alertId}>
			<Accordion.Control icon={<AlertEffectIcon effect={simplifiedAlertData?.effect} />}>{simplifiedAlertData?.title}</Accordion.Control>
			<Accordion.Panel classNames={{ content: styles.contentWrapper }}>
				<div className={styles.infoBar}>
					<AlertActivePeriodStart date={simplifiedAlertData?.start_date} size="sm" />
					<AlertActivePeriodEnd date={simplifiedAlertData?.end_date} size="sm" />
				</div>
				<p className={styles.description}>{simplifiedAlertData?.description}</p>
				{simplifiedAlertData?.image_url && <AlertsListItemImageThumbnail alertId={simplifiedAlertData?.alert_id || ''} alertTitle={simplifiedAlertData?.title || ''} alt={simplifiedAlertData?.title} href={`${Routes.ALERTS.route}/${alertId}`} src={simplifiedAlertData.image_url} />}
				<div onClick={handleAlertDetailClick}>
					<Button href={`${Routes.ALERTS.route}/${alertId}`} icon={<IconArrowUpRight size={16} />} label={t('open')} variant="pill" />
				</div>
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
