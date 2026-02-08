'use client';

import { LiveIcon } from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useFleetContext } from '@/contexts/Fleet.context';
import { VehiclePropulsion } from '@carrismetropolitana/api-types/vehicles';
import { Skeleton } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export function FleetMetrics() {
	const t = useTranslations('fleet.FleetMetrics');

	const fleetContext = useFleetContext();

	const activeVehicles = fleetContext.actions.getAllActiveVehicles().length;
	const electricVehicles = fleetContext.actions.getAllVehiclesByFilter({ propulsion: VehiclePropulsion.electricity }).length;
	const totalVehicles = fleetContext.actions.getAllVehicles().length;

	return (
		<Surface>
			<Section withGap withPadding>
				<div className={styles.metricsWrapper}>
					<div className={styles.infoWrapper}>
						<div className={styles.bigNumberWrapper}>
							<h1 className={styles.bigNumber} style={{ color: 'var(--color-brand)' }}>{t('total_circulating', { count: activeVehicles })}</h1>
							<LiveIcon className={styles.liveIcon} color="var(--color-brand)" />
						</div>
						<h3 className={styles.title}>{t('total_circulating_title')}</h3>
						{fleetContext.flags.is_loading && <Skeleton height={16} width={200} />}
						{!fleetContext.flags.is_loading && <p className={styles.description}>{t('total_circulating_footer', { percentage: ((activeVehicles / totalVehicles) * 100).toFixed(1) })}</p>}
					</div>
					<div className={styles.infoWrapper}>
						<div className={styles.bigNumberWrapper}>
							<h1 className={styles.bigNumber} style={{ color: 'var(--color-brand)' }}>{t('total_electric', { count: electricVehicles })}</h1>
							<IconBolt color="var(--color-brand)" />
						</div>
						<h3 className={styles.title}>{t('total_electric_title')}</h3>
						{fleetContext.flags.is_loading && <Skeleton height={16} width={400} />}
						{!fleetContext.flags.is_loading && <p className={styles.description}>{t('total_electric_footer', { percentage: ((electricVehicles / totalVehicles) * 100).toFixed(1) })}</p>}
					</div>
				</div>
			</Section>
		</Surface>
	);
}
