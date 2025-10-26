import { useLocationsContext } from '@/contexts/Locations.context';
import { AlertsByMunicipality as AlertsByMunicipalityType } from '@carrismetropolitana/api-types/metrics';
import { Skeleton, Table } from '@mantine/core';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const cx = classNames.bind(styles);

/* * */

export function AlertsByMunicipality({ data }: { data?: AlertsByMunicipalityType[] }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts.byMunicipalityChart');
	const alertsT = useTranslations('alerts');

	const locationsContext = useLocationsContext();

	//
	// B. Transform Data

	const safeData = Array.isArray(data) ? data : [];
	const rawCauses = Array.from(
		new Set(
			safeData.flatMap(row => row.causes.map(cause => cause.type)),
		),
	);

	const allCauses = rawCauses.map(causeType => alertsT(`AlertCauseEffectIcon.cause.${causeType}`));

	const formattedData = {
		body: safeData.map((row) => {
			const municipalityName
                = locationsContext.data.municipalities.find(m => m.id === row.municipality_id)?.name
                  || row.municipality_id;

			// Get values for each cause type in the same order as rawCauses
			const values = rawCauses.map(type =>
				row.causes.find(cause => cause.type === type)?.value ?? 0,
			);
			const rowMax = Math.max(...values);

			return [
				municipalityName,
				...values.map((value, idx) => (
					<span
						key={rawCauses[idx]}
						className={cx({ active: value === rowMax, cell: true })}
					>
						{value}
					</span>
				)),
			];
		}),
		head: [t('municipality'), ...allCauses],
	};

	//
	// C. Render components

	if (!data) {
		return (
			<div className={styles.tableSkeleton}>
				{Array.from({ length: 4 }).map((_, rowIdx) => (
					<div key={rowIdx} className={styles.skeletonRow}>
						<Skeleton height={24} radius="sm" width="20%" />
						{Array.from({ length: 3 }).map((_, cellIdx) => (
							<Skeleton key={cellIdx} height={24} radius="sm" style={{ marginLeft: 8 }} width="80%" />
						))}
					</div>
				))}
			</div>
		);
	}

	return (
		<>
			<Table className={styles.table} data={formattedData} />
			<p className={styles.description}>{t('description')}</p>
		</>
	);
}
