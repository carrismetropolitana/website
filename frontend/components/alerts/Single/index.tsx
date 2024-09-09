'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertIcon';
import Button from '@/components/common/Button';
import Section from '@/components/layout/Section';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { Image } from '@mantine/core';
import { IconArrowUpRight, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component({ alert_id }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.Single');
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
				{simplifiedAlertData?.image_url && (
					<>
						<Image alt={simplifiedAlertData?.title} className={styles.image} src={simplifiedAlertData.image_url} />
						<Button href={simplifiedAlertData.image_url} icon={<IconArrowUpRight size={16} />} label={t('open_full_image')} target="_blank" variant="pill" />
					</>
				)}
				{simplifiedAlertData?.url && <Button href={simplifiedAlertData.url || '#'} icon={<IconExternalLink size={18} />} label={t('more_info')} />}
			</Section>
		</>
	);

	//
}
