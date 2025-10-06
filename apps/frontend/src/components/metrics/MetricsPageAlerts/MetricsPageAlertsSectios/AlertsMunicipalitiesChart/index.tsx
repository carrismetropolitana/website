import { useLocationsContext } from '@/contexts/Locations.context';
import { AlertCause } from '@/types/alerts.types';
import { Table } from '@mantine/core';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface AlertsByMunicipalityProps {
	data: {
		causes: { type: AlertCause, value: number }[]
		municipality_id: string
	}[]
}

/* * */

const cx = classNames.bind(styles);

/* * */

export function AlertsByMunicipality({ data }: AlertsByMunicipalityProps) {
	//

	//
	// A. Setup variables
	const t = useTranslations('alerts');
	const locationsContext = useLocationsContext();

	//
	// B. Transform Data
	const rawCauses = Array.from(
		new Set(
			data.flatMap(row => row.causes.map(cause => cause.type)),
		),
	);

	const allCauses = rawCauses.map(causeType => t(`AlertCauseEffectIcon.cause.${causeType}`));

	const formattedData = {
		body: data.map((row) => {
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
		head: ['Município', ...allCauses],
	};

	//
	// C. Render components

	return <Table className={styles.table} data={formattedData} />;
}
