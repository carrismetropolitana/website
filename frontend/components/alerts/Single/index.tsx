'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertIcon';
import AlertsListItemImageThumbnail from '@/components/alerts/AlertsListItemImageThumbnail';
import Button from '@/components/common/Button';
import Section from '@/components/layout/Section';
import { useAlertsContext } from '@/contexts/alerts.context';
import { Link } from '@/translations/navigation';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ alert_id }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.Page');
	const alertsContext = useAlertsContext();

	//
	// B. Transform data

	const simplifiedAlertData = alertsContext.actions.getSimplifiedAlertById(alert_id);

	//
	// C. Render components

	return (
		<>
			<Section backButtonHref="/alerts" childrenWrapperStyles={styles.infoBar} heading={simplifiedAlertData?.title} withGap={false} withTopBorder={false} withChildrenNudge withChildrenPadding>
				{simplifiedAlertData?.cause && <AlertCauseIcon cause={simplifiedAlertData.cause} withText />}
				{simplifiedAlertData?.effect && <AlertEffectIcon effect={simplifiedAlertData.effect} withText />}
				{simplifiedAlertData?.start_date && <AlertActivePeriodStart date={simplifiedAlertData.start_date} />}
				{simplifiedAlertData?.end_date && <AlertActivePeriodEnd date={simplifiedAlertData.end_date} />}
			</Section>
			<Section childrenWrapperStyles={styles.contentWrapper} withTopPadding={false} withChildrenNudge withChildrenPadding>
				{simplifiedAlertData?.description && <p className={styles.description}>{simplifiedAlertData.description}</p>}
				{simplifiedAlertData?.image_url && <AlertsListItemImageThumbnail alt={simplifiedAlertData?.title} blur="hover" href={simplifiedAlertData.image_url} size="lg" src={simplifiedAlertData.image_url} target="_blank" />}
				{simplifiedAlertData?.url && <Button href={simplifiedAlertData.url} label={t('more_info')} />}
			</Section>
		</>
	);

	//
}
