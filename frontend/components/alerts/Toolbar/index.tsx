'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import { useAlertsContext } from '@/contexts/alerts.context';
import { SegmentedControl, Select } from '@mantine/core';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.Toolbar');
	const alertsContext = useAlertsContext();

	//
	// B. Transform data

	const byCurrentStatusOptions = [
		{ disabled: alertsContext.counters.by_date.open === 0, label: t('by_date.current', { count: alertsContext.counters.by_date.open }), value: 'open' },
		{ label: t('by_date.future'), value: 'all' },
	];

	// const byMunicipalityOptions = useMemo(() => {
	// 	if (!alertsContext.data.raw) return [];
	// 	const uniqueMunicipalities = new Set();
	// 	const result: { disabled: boolean, label: string, value: string }[] = [];
	// 	alertsContext.data.raw.forEach((alert) => {
	// 		if (!uniqueMunicipalities.has(alert.municipality_id)) {
	// 			uniqueMunicipalities.add(alert.municipality_id);
	// 			result.push({
	// 				disabled: alertsContext.data.raw.filter(item => item.municipality_id === alert.municipality_id).length === 0,
	// 				label: alert.municipality_name,
	// 				value: alert.municipality_id,
	// 			});
	// 		}
	// 	});
	// 	return result.sort((a, b) => a.label.localeCompare(b.label));
	// }, [alertsContext.data.raw]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<SegmentedControl data={byCurrentStatusOptions} onChange={alertsContext.actions.updateFilterByDate} value={alertsContext.filters.by_date} fullWidth />
			{/* <Select data={byMunicipalityOptions} leftSection={<IconMap size={20} />} onChange={alertsContext.actions.updateFilterByMunicipality} placeholder={t('by_municipality.label')} value={alertsContext.filters.by_municipality} clearable searchable /> */}
			<FoundItemsCounter text={t('found_items_counter', { count: alertsContext.data.filtered.length })} />
		</div>
	);

	//
}