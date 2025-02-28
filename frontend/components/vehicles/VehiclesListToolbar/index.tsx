'use client';

/* * */

import { ExpandToggle } from '@/components/common/ExpandToggle';
import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { useVehiclesListContext } from '@/contexts/VehiclesList.context';
import { MultiSelect, Select, TextInput } from '@mantine/core';
import { IconBike, IconBolt, IconDisabled2, IconHomeHeart, IconSearch, IconTriangle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export function VehiclesListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('vehicles.VehiclesListToolbar');
	const optionsLabels = useTranslations('options');

	const vehiclesListContext = useVehiclesListContext();

	//
	// B. Transform data

	const propulsionOptions = useMemo(() => {
		if (!vehiclesListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(vehiclesListContext.data.raw.map(item => item.propulsion).filter(Boolean).map(String));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`VehiclePropulsion.${value}`), value: value })) || [];
	}, [vehiclesListContext.data.raw]);

	const agencyOptions = useMemo(() => {
		if (!vehiclesListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(vehiclesListContext.data.raw.map(item => item.agency_id).filter(Boolean));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`Agency.${value}`), value: value })) || [];
	}, [vehiclesListContext.data.raw]);

	const makeAndModelOptions = useMemo(() => {
		if (!vehiclesListContext.data.raw) return [];
		const allOptionsMap = new Map<string, Set<string>>();
		vehiclesListContext.data.raw.forEach((item) => {
			if (!item.make || !item.model) return;
			if (!allOptionsMap.has(item.make)) allOptionsMap.set(item.make, new Set<string>());
			allOptionsMap.get(item.make)?.add(item.model);
		});
		return Array
			.from(allOptionsMap.entries())
			.map(([make, models]) => ({
				group: make,
				items: Array
					.from(models)
					.map(model => ({ label: `${make} - ${model}`, value: `${make}-${model}` }))
					.sort((a, b) => a.label.localeCompare(b.label)),
			}))
			.sort((a, b) => a.group.localeCompare(b.group));
	}, [vehiclesListContext.data.raw]);

	//
	// C. Handle actions

	const handleTextInputChange = ({ currentTarget }) => {
		vehiclesListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<Section withBottomDivider withGap withPadding>
			<Grid columns="a" withGap>
				<TextInput
					leftSection={<IconSearch />}
					onChange={handleTextInputChange}
					placeholder={t('filters.by_search.placeholder')}
					type="search"
					value={vehiclesListContext.filters.by_search}
				/>
				<MultiSelect
					data={propulsionOptions}
					leftSection={<IconBolt />}
					onChange={vehiclesListContext.actions.updateFilterByPropulsion}
					placeholder={t('filters.by_propulsion.placeholder')}
					value={vehiclesListContext.filters.by_propulsion ? vehiclesListContext.filters.by_propulsion?.split(';') : []}
					clearable
					searchable
				/>
			</Grid>

			<ExpandToggle defaultState={!!vehiclesListContext.filters.by_agency || !!vehiclesListContext.filters.by_bikes || !!vehiclesListContext.filters.by_wheelchair || !!vehiclesListContext.filters.by_make_and_model}>
				<Grid columns="a" withGap>
					<Select
						leftSection={<IconDisabled2 />}
						onChange={vehiclesListContext.actions.updateFilterByWheelchair}
						placeholder={t('filters.by_wheelchair.placeholder')}
						value={vehiclesListContext.filters.by_wheelchair}
						data={[
							{ label: t('filters.by_wheelchair.options.false'), value: 'false' },
							{ label: t('filters.by_wheelchair.options.true'), value: 'true' },
						]}
						clearable
						searchable
					/>
					<Select
						leftSection={<IconBike />}
						onChange={vehiclesListContext.actions.updateFilterByBikes}
						placeholder={t('filters.by_bikes.placeholder')}
						value={vehiclesListContext.filters.by_bikes}
						data={[
							{ label: t('filters.by_bikes.options.false'), value: 'false' },
							{ label: t('filters.by_bikes.options.true'), value: 'true' },
						]}
						clearable
						searchable
					/>
					<MultiSelect
						data={agencyOptions}
						leftSection={<IconHomeHeart />}
						onChange={vehiclesListContext.actions.updateFilterByAgency}
						placeholder={t('filters.by_agency.placeholder')}
						value={vehiclesListContext.filters.by_agency ? vehiclesListContext.filters.by_agency?.split(';') : []}
						clearable
						searchable
					/>
					<MultiSelect
						data={makeAndModelOptions}
						leftSection={<IconTriangle />}
						onChange={vehiclesListContext.actions.updateFilterByMakeAndModel}
						placeholder={t('filters.by_make_model.placeholder')}
						value={vehiclesListContext.filters.by_make_and_model ? vehiclesListContext.filters.by_make_and_model?.split(';') : []}
						clearable
						searchable
					/>
				</Grid>
			</ExpandToggle>
			<FoundItemsCounter text={t('found_items_counter', { count: vehiclesListContext.data.filtered.length })} />
		</Section>
	);

	//
}
