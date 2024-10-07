'use client';

/* * */

import Button from '@/components/common/Button';
import FoundItemsCounter from '@/components/common/FoundItemsCounter';
import SortButton from '@/components/common/SortButton';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useStoresListContext } from '@/contexts/StoresList.context';
import { SegmentedControl, Select } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { IconMap } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stores.StoresListToolbar');
	const storesContext = useStoresListContext();

	//
	// B. Transform data

	const byCurrentStatusOptions = [
		{ label: t('by_current_status.open', { count: storesContext.counters.by_current_status.open }), value: 'open' },
		{ label: t('by_current_status.all'), value: 'all' },
	];

	const filterByOptions = [
		{ label: t('filter_by.municipality_name'), value: 'municipality_name' },
		{ label: t('filter_by.capacity'), value: 'capacity' },
		{ label: t('filter_by.time'), value: 'wait_time' },
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
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withBottomDivider withPadding>
				<Button href="https://www.navegante.pt/navegante/espacos-pontos-navegante" icon={<IconExternalLink size={18} />} label={t('external_link')} target="_blank" />
			</Section>
			<Section withGap withPadding>
				<SegmentedControl data={byCurrentStatusOptions} onChange={storesContext.actions.updateFilterCurrentStatus} value={storesContext.filters.by_current_status} w="100%" fullWidth />
				<Grid columns="ab" withGap>
					<Select data={byMunicipalityOptions} leftSection={<IconMap size={20} />} onChange={storesContext.actions.updateFilterByMunicipality} placeholder={t('by_municipality.label')} value={storesContext.filters.by_municipality} clearable searchable />
					<SortButton
						onDirectionChange={storesContext.actions.updateFilterOrderByDirection}
						onOptionChange={storesContext.actions.updateFilterOrderBy}
						options={filterByOptions}
						selectedOption={storesContext.filters.order_by}
					/>
				</Grid>
				<FoundItemsCounter text={t('found_items_counter', { count: storesContext.data.filtered.length })} />
			</Section>
		</Surface>
	);

	//
}
