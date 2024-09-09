'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { useAlertsContext } from '@/contexts/Alerts.context';
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

	//
	// B. Transform data

	const alertHref = `/alerts/${alertId}`;

	const simplifiedAlertData = alertsContext.actions.getSimplifiedAlertById(alertId);

	//
	// C. Render components

	return (
		<Accordion.Item value={alertId}>
			<Accordion.Control icon={<AlertEffectIcon effect={simplifiedAlertData?.effect} />}>{simplifiedAlertData?.title}</Accordion.Control>
			<Accordion.Panel classNames={{ content: styles.contentWrapper }}>
				<div className={styles.infoBar}>
					<AlertActivePeriodStart date={simplifiedAlertData?.start_date} size="sm" />
					<AlertActivePeriodEnd date={simplifiedAlertData?.end_date} size="sm" />
				</div>
				<p className={styles.description}>{simplifiedAlertData?.description}</p>
				{simplifiedAlertData?.image_url && <AlertsListItemImageThumbnail alt={simplifiedAlertData?.title} href={alertHref} src={simplifiedAlertData.image_url} />}
				<Button href={alertHref} icon={<IconArrowUpRight size={16} />} label={t('open')} variant="pill" />
			</Accordion.Panel>
		</Accordion.Item>
	);

	//
}
