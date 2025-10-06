'use client';

/* * */

import { AlertCauseIcon, AlertEffectIcon } from '@/components/alerts/AlertCauseEffectIcon-2';
import { Grid } from '@/components/layout/Grid';
import { AlertCause, AlertEffect } from '@/types/alerts.types';

import styles from './styles.module.css';

/* * */

interface AlertsSummaryProps {
	affectedPassengers?: number
	externalCausesPercentage?: number
	totalDisruptions?: number
}

/* * */

export function AlertsSummary({ affectedPassengers, externalCausesPercentage, totalDisruptions }: AlertsSummaryProps) {
	//

	//
	// A. Setup variables

	const summaryCards = [
		{
			description: 'Total de disrupções',
			icon: <AlertCauseIcon cause={AlertCause.OTHER_CAUSE} className={styles.cardIcon} size="lg" />,
			title: totalDisruptions ? totalDisruptions.toLocaleString() : '-',
		},
		{
			description: 'Derivadas de causas externas',
			icon: <AlertCauseIcon cause={AlertCause.CONSTRUCTION} className={styles.cardIcon} size="lg" />,
			title: `${externalCausesPercentage ?? '-'}%`,
		},
		{
			description: 'Passageiros afetados',
			icon: <AlertEffectIcon className={styles.cardIcon} effect={AlertEffect.REDUCED_SERVICE} size="lg" />,
			title: affectedPassengers ? affectedPassengers.toLocaleString() : '-',
		},
	];

	//
	// B. Render components

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
