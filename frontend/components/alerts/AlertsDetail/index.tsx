'use client';

/* * */

import { AlertActivePeriodEnd, AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import AlertInformedEntity from '@/components/alerts/AlertInformedEntity';
import Button from '@/components/common/Button';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { Image } from '@mantine/core';
import { IconArrowUpRight, IconExternalLink } from '@tabler/icons-react';
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

	const t = useTranslations('alerts.AlertsDetail');
	const alertsContext = useAlertsContext();

	//
	// B. Fetch data

	const simplifiedAlertData = alertsContext.actions.getSimplifiedAlertById(alertId);

	//
	// C. Render components

	return (
		<>
			<Surface>
				<Section heading={simplifiedAlertData?.title} withBottomDivider withPadding>
					<div className={styles.infoBar}>
						{simplifiedAlertData?.cause && <AlertCauseIcon cause={simplifiedAlertData.cause} withText />}
						{simplifiedAlertData?.effect && <AlertEffectIcon effect={simplifiedAlertData.effect} withText />}
						{simplifiedAlertData?.start_date && <AlertActivePeriodStart date={simplifiedAlertData.start_date} />}
						{simplifiedAlertData?.end_date && <AlertActivePeriodEnd date={simplifiedAlertData.end_date} />}
					</div>
				</Section>
				{simplifiedAlertData?.informed_entity && (
					<Section withPadding>
						<div className={styles.infoBar}>
							{simplifiedAlertData?.informed_entity.map((entity, index) => (
								<AlertInformedEntity key={index} lineId={entity.lineId} />
							))}
						</div>
					</Section>
				)}
			</Surface>
			<Surface>
				<Section withPadding>
					<div className={styles.contentWrapper}>
						{simplifiedAlertData?.description && <p className={styles.description}>{simplifiedAlertData.description}</p>}
						{simplifiedAlertData?.image_url && (
							<>
								<Image alt={simplifiedAlertData?.title} className={styles.image} src={simplifiedAlertData.image_url} />
								<Button href={simplifiedAlertData.image_url} icon={<IconArrowUpRight size={16} />} label={t('open_full_image')} target="_blank" variant="pill" />
							</>
						)}
						{simplifiedAlertData?.url && <Button href={simplifiedAlertData.url || '#'} icon={<IconExternalLink size={18} />} label={t('more_info')} />}
					</div>
				</Section>
			</Surface>
		</>
	);

	//
}
