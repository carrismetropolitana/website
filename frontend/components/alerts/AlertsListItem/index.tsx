'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertEffectIcon } from '@/components/alerts/AlertIcon';
import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import { useAlertsListContext } from '@/contexts/alerts.list.context';
import { Accordion } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface AlertsListItemProps {
	alert_id: string
}

/* * */

export default function Component({ alert_id }: AlertsListItemProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsListItem');
	const alertsContext = useAlertsListContext();

	//
	// B. Transform data

	const alertHref = `/alerts/${alert_id}`;

	const simplifiedAlertData = alertsContext.actions.getSimplifiedAlertById(alert_id);

	//
	// C. Render components

	return (
		<Accordion.Item value={alert_id}>
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
