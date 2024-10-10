'use client';

/* * */

import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { OperatorMetrics } from '@/types/metrics.types';
import { Operators } from '@/utils/operation';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	loading?: boolean
	metrics?: OperatorMetrics
}

export default function Component({ metrics }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');

	//
	// D. Render Components

	if (!metrics) {
		return <MetricsSectionDemandSkeleton />;
	}

	return (
		<div className={styles.container}>
			<Popover offset={0} position="top-end" shadow="md" width={300} withArrow>
				<Popover.Target>
					<ActionIcon className={styles.popoverAnchor} size="xs" variant="transparent">
						<IconInfoCircleFilled />
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown>
					<p className={styles.popoverText}>{t('popover.text')}</p>
					<Link className={styles.popoverLink} href="/open-data" target="_blank">{t('popover.link')}</Link>
				</Popover.Dropdown>
			</Popover>
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.secondary}`}>
					<p className={styles.value}>{t('area.value', { value: metrics.value })}</p>
					<p className={styles.label}>{t('area.label', { area: Operators[metrics.operator_id].area })}</p>
				</div>
			</div>
		</div>
	);

	//
}
