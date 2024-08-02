'use client';

/* * */

import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import { useStoresContext } from '@/contexts/stores.context';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';

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
		{ disabled: storesContext.counters.by_current_status.open === 0, label: t('by_current_status.open', { count: storesContext.counters.by_current_status.open }), value: 'open' },
		{ label: t('by_current_status.all'), value: 'all' },
	];

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<SegmentedControl data={byCurrentStatusOptions} onChange={storesContext.actions.updateFilterCurrentStatus} value={storesContext.filters.by_current_status} />
			<FoundItemsCounter text={t('found_items_counter', { count: storesContext.data.filtered.length })} />
		</div>
	);

	//
}
