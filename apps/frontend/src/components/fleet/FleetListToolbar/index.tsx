'use client';

/* * */

import { ExpandToggle } from '@/components/common/ExpandToggle';
import { FoundItemsCounter } from '@/components/common/FoundItemsCounter';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useFleetListContext } from '@/contexts/FleetList.context';
import { MultiSelect, Select, TextInput } from '@mantine/core';
import { IconBike, IconBolt, IconCreditCard, IconDisabled2, IconHomeHeart, IconSearch, IconTriangle, IconWifi } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export function FleetListToolbar() {
	//

	//
	// A. Setup variables

	const t = useTranslations('fleet.FleetListToolbar');
	const optionsLabels = useTranslations('options');

	const fleetListContext = useFleetListContext();

	//
	// B. Transform data

	const propulsionOptions = useMemo(() => {
		if (!fleetListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(fleetListContext.data.raw.map(item => item.propulsion).filter(Boolean).map(String));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`VehiclePropulsion.${value}`), value: value })) || [];
	}, [fleetListContext.data.raw]);

	const agencyOptions = useMemo(() => {
		if (!fleetListContext.data.raw) return [];
		const allOptionsValues = new Set<string>(fleetListContext.data.raw.map(item => item.agency_id).filter(Boolean));
		return Array.from(allOptionsValues).map(value => ({ label: optionsLabels(`Agency.${value}`), value: value })) || [];
	}, [fleetListContext.data.raw]);

	const makeAndModelOptions = useMemo(() => {
		if (!fleetListContext.data.raw) return [];
		const allOptionsMap = new Map<string, Set<string>>();
		fleetListContext.data.raw.forEach((item) => {
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
					.map(model => ({ label: `${make} - ${model}`, value: `${make.replaceAll('-', '')}-${model.replaceAll('-', '')}` })) // mercedes-benz becomes mercedesbenz to not break the filter
					.sort((a, b) => a.label.localeCompare(b.label)),
			}))
			.sort((a, b) => a.group.localeCompare(b.group));
	}, [fleetListContext.data.raw]);

	//
	// C. Handle actions

	const handleTextInputChange = ({ currentTarget }) => {
		fleetListContext.actions.updateFilterBySearch(currentTarget.value);
	};

	//
	// D. Render components

	return (
		<Surface variant="persistent">
			<Section withGap withPadding>
				<Grid columns="a" withGap>
					<TextInput
						leftSection={<IconSearch />}
						onChange={handleTextInputChange}
						placeholder={t('filters.by_search.placeholder')}
						type="search"
						value={fleetListContext.filters.by_search}
					/>
					<MultiSelect
						data={agencyOptions}
						leftSection={<IconHomeHeart />}
						onChange={fleetListContext.actions.updateFilterByAgency}
						placeholder={t('filters.by_agency.placeholder')}
						value={fleetListContext.filters.by_agency ? fleetListContext.filters.by_agency?.split(';') : []}
						clearable
						searchable
					/>
					<MultiSelect
						data={propulsionOptions}
						leftSection={<IconBolt />}
						onChange={fleetListContext.actions.updateFilterByPropulsion}
						placeholder={t('filters.by_propulsion.placeholder')}
						value={fleetListContext.filters.by_propulsion ? fleetListContext.filters.by_propulsion?.split(';') : []}
						clearable
						searchable
					/>

					<Select
						leftSection={<IconWifi />}
						onChange={fleetListContext.actions.updateFilterByVehicleState}
						placeholder={t('filters.by_state.placeholder')}
						value={fleetListContext.filters.by_vehicle_state}
						data={[
							{ label: t('filters.by_state.options.active'), value: 'active' },
							{ label: t('filters.by_state.options.no_service'), value: 'no_service' },
							{ label: t('filters.by_state.options.active_1h'), value: 'active_1h' },
							{ label: t('filters.by_state.options.active_today'), value: 'active_today' },
							{ label: t('filters.by_state.options.active_7d'), value: 'active_7d' },
							{ label: t('filters.by_state.options.inactive'), value: 'inactive' },
							{ label: t('filters.by_state.options.no_data'), value: 'no_data' },
						]}
						clearable
						searchable
					/>
				</Grid>

				<ExpandToggle defaultState={!!fleetListContext.filters.by_agency || !!fleetListContext.filters.by_bikes || !!fleetListContext.filters.by_wheelchair || !!fleetListContext.filters.by_make_and_model}>
					<Grid columns="a" withGap>
						<Select
							leftSection={<IconCreditCard />}
							onChange={fleetListContext.actions.updateFilterByContactless}
							placeholder={t('filters.by_contactless.placeholder')}
							value={fleetListContext.filters.by_contactless}
							data={[
								{ label: t('filters.by_contactless.options.false'), value: 'false' },
								{ label: t('filters.by_contactless.options.true'), value: 'true' },
							]}
							clearable
							searchable
						/>
						<Select
							leftSection={<IconDisabled2 />}
							onChange={fleetListContext.actions.updateFilterByWheelchair}
							placeholder={t('filters.by_wheelchair.placeholder')}
							value={fleetListContext.filters.by_wheelchair}
							data={[
								{ label: t('filters.by_wheelchair.options.false'), value: 'false' },
								{ label: t('filters.by_wheelchair.options.true'), value: 'true' },
							]}
							clearable
							searchable
						/>
						<Select
							leftSection={<IconBike />}
							onChange={fleetListContext.actions.updateFilterByBikes}
							placeholder={t('filters.by_bikes.placeholder')}
							value={fleetListContext.filters.by_bikes}
							data={[
								{ label: t('filters.by_bikes.options.false'), value: 'false' },
								{ label: t('filters.by_bikes.options.true'), value: 'true' },
							]}
							clearable
							searchable
						/>
						<MultiSelect
							data={makeAndModelOptions}
							leftSection={<IconTriangle />}
							onChange={fleetListContext.actions.updateFilterByMakeAndModel}
							placeholder={t('filters.by_make_model.placeholder')}
							value={fleetListContext.filters.by_make_and_model ? fleetListContext.filters.by_make_and_model?.split(';') : []}
							clearable
							searchable
						/>
					</Grid>
				</ExpandToggle>
				<FoundItemsCounter text={t('found_items_counter', { count: fleetListContext.data.filtered.length })} />
			</Section>
		</Surface>
	);

	//
}
