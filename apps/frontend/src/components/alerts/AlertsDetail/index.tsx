'use client';

/* * */

import { AlertActivePeriodStart } from '@/components/alerts/AlertActivePeriod';
import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import { AlertInformedEntity } from '@/components/alerts/AlertInformedEntity';
import { AlertsDetailImageThumbnail } from '@/components/alerts/AlertsDetailImageThumbnail';
import { BackButton } from '@/components/common/BackButton';
import Button from '@/components/common/Button';
import { CopyBadge } from '@/components/common/CopyBadge';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { useDebugContext } from '@/contexts/Debug.context';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	alertId: string
}

/* * */

export function AlertsDetail({ alertId }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertsDetail');
	const alertsContext = useAlertsContext();
	const debugContext = useDebugContext();

	//
	// B. Fetch data

	const alertData = alertsContext.actions.getAlertById(alertId);

	//
	// C. Transform data

	const uniqueInformedEntityLineIds = useMemo(() => {
		const set = new Set<string>();

		alertData?.references.forEach((reference) => {
			const lineId = reference.parent_id;
			if (lineId) set.add(lineId);
		});
		return Array.from(set);
	}, [alertData]);

	//
	// D. Render components

	return (
		<>

			<Surface>
				<Section withBottomDivider withPadding>
					<BackButton />
				</Section>
				<Section heading={alertData?.title} withBottomDivider withPadding>
					<div className={styles.infoBar}>
						{alertData?.cause && <AlertCauseIcon cause={alertData.cause} withText />}
						{alertData?.effect && <AlertEffectIcon effect={alertData.effect} withText />}
						{alertData?.active_period_start_date && <AlertActivePeriodStart date={new Date(alertData.active_period_start_date)} />}
						{debugContext.flags.is_debug_mode && alertData?._id && <CopyBadge label={`#${alertData._id}`} value={alertData._id} />}
						{/* {simplifiedAlertData?.end_date && <AlertActivePeriodEnd date={simplifiedAlertData.end_date} />} */}
					</div>
				</Section>
				{alertData?.references && (
					<Section withPadding>
						<div className={styles.infoBar}>
							{uniqueInformedEntityLineIds.map((lineId, index) => (
								<AlertInformedEntity key={index} lineId={lineId} />
							))}
						</div>
					</Section>
				)}
			</Surface>

			<Surface>
				<Section withPadding>
					<div className={styles.contentWrapper}>
						{alertData?.description && <p className={styles.description}>{alertData.description}</p>}
						{alertData?.image_url && <AlertsDetailImageThumbnail imageUrl={alertData.image_url} title={alertData.title} />}
						{alertData?.info_url && <Button href={alertData.info_url || '#'} icon={<IconExternalLink size={18} />} label={t('more_info')} />}
					</div>
				</Section>
			</Surface>

		</>
	);

	//
}
