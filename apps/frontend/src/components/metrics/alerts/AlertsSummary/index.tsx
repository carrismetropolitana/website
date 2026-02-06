'use client';

/* * */

import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon';
import { Grid } from '@/components/layout/Grid';
import { AlertCause, AlertEffect } from '@/types/alerts.types';
import { AlertsSummary as AlertsSummaryType } from '@carrismetropolitana/api-types/metrics';
import { Skeleton } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AlertsSummary({ data }: { data?: AlertsSummaryType }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts.summaryCards');

	const summaryCards = [
		{
			description: t('total_alerts'),
			icon: <AlertCauseIcon cause={AlertCause.ACCIDENT} className={styles.cardIcon} size="lg" />,
			title: data?.total_alerts ? data.total_alerts.toLocaleString() : '-',
		},
		{
			description: `${t('external_causes_percentage')}*`,
			icon: <AlertCauseIcon cause={AlertCause.CONSTRUCTION} className={styles.cardIcon} size="lg" />,
			title: `${data?.external_causes_percentage ?? '-'}%`,
		},
		{
			description: t('affected_passengers'),
			icon: <AlertEffectIcon className={styles.cardIcon} effect={AlertEffect.REDUCED_SERVICE} size="lg" />,
			title: data?.people_affected ? data.people_affected.toLocaleString() : '-',
		},
	];

	//
	// B. Render components

	if (!data) {
		return (
			<Grid columns="abc" withGap>
				{[0, 1, 2].map(idx => (
					<div key={idx} className={styles.cardWrapper}>
						<Skeleton className={styles.cardIcon} height={48} radius="xl" width={48} />
						<div className={styles.cardContents}>
							<Skeleton className={styles.cardDescription} height={16} width="70%" />
							<Skeleton className={styles.cardTitle} height={28} width="40%" />
						</div>
					</div>
				))}
			</Grid>
		);
	}

	return (
		<Grid columns="abc" withGap>
			{summaryCards.map((card, idx) => (
				<div key={idx} className={styles.cardWrapper}>
					{card.icon}
					<div className={styles.cardContents}>
						<p className={styles.cardDescription}>{card.description}</p>
						<p className={styles.cardTitle}>{card.title}</p>
					</div>
				</div>
			))}
		</Grid>
	);

	//
}
