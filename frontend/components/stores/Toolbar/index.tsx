'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import { useStoresContext } from '@/contexts/stores.context';
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

	const t = useTranslations('stores.Toolbar');
	const storesContext = useStoresContext();

	//
	// B. Transform data

	const byCurrentStatusOptions = [
		{ label: t('by_current_status.open', { count: storesContext.counters.by_current_status.open }), value: 'open' },
		{ label: t('by_current_status.all'), value: 'all' },
	];

	const byMunicipalityOptions = useMemo(() => {
		if (!storesContext.data.raw) return [];
		const uniqueMunicipalities = new Set();
		const result: { disabled: boolean, label: string, value: string }[] = [];
		storesContext.data.raw.forEach((store) => {
			if (!uniqueMunicipalities.has(store.municipality_id)) {
				uniqueMunicipalities.add(store.municipality_id);
				result.push({
					disabled: storesContext.data.raw.filter(item => item.municipality_id === store.municipality_id).length === 0,
					label: store.municipality_name,
					value: store.municipality_id,
				});
			}
		});
		return result.sort((a, b) => a.label.localeCompare(b.label));
	}, [storesContext.data.raw]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<SegmentedControl data={byCurrentStatusOptions} onChange={storesContext.actions.updateFilterCurrentStatus} value={storesContext.filters.by_current_status} fullWidth />
			<Select data={byMunicipalityOptions} leftSection={<IconMap size={20} />} onChange={storesContext.actions.updateFilterByMunicipality} placeholder={t('by_municipality.label')} value={storesContext.filters.by_municipality} clearable searchable />
			<FoundItemsCounter text={t('found_items_counter', { count: storesContext.data.filtered.length })} />
		</div>
	);

	//
}
