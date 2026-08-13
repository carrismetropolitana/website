'use client';

/* * */

import { useDebugContext } from '@/contexts/Debug.context';
import { useLinesContext } from '@/contexts/Lines.context';
import { useLocationsContext } from '@/contexts/Locations.context';
import { useStopsContext } from '@/contexts/Stops.context';
import { Pattern } from '@carrismetropolitana/api-types/network';
import { ComboboxItem, ComboboxItemGroup, Flex, Group, Select, SelectProps, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export interface Props extends SelectProps {
	date_filter?: string
	patterns: Pattern[]
}

interface CustomComboboxItem extends ComboboxItem {
	direction_id: number
	pattern_id: string
}

/* * */

export function SelectPattern({ date_filter, onChange, patterns, value, ...props }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.SelectPattern');

	const debugContext = useDebugContext();
	const linesContext = useLinesContext();
	const stopsContext = useStopsContext();
	const locationsContext = useLocationsContext();

	//
	// B. Transform data

	const validPatternsSelectOptions = useMemo(() => {
		if (!patterns) return [];

		let data: ComboboxItemGroup<CustomComboboxItem>[] = [];

		// Filter patterns by date
		patterns.map((patternGroupData) => {
			const group = data.find(group => group.group === patternGroupData.route_id);

			const item = {
				direction_id: patternGroupData.direction_id,
				disabled: date_filter ? !patternGroupData.valid_on.includes(date_filter) : false,
				label: patternGroupData.headsign,
				pattern_id: patternGroupData.id,
				value: patternGroupData.version_id,
			};

			if (group) {
				group.items.push(item);
			}
			else {
				data.push({
					group: patternGroupData.route_id,
					items: [item],
				});
			}
		});

		data.forEach(group => group.items.sort((a, b) => a.direction_id - b.direction_id));

		data.sort((a, b) => a.group.localeCompare(b.group));

		data = data.map((group, index) => {
			const routeData = linesContext.actions.getRouteDataById(group.group);
			const letterIndex = String.fromCharCode(65 + index);
			return ({ ...group, group: `${letterIndex} | ${routeData?.long_name}` });
		});

		return data;
	}, [patterns]);

	//
	// C. Render components

	const renderSelectOption: SelectProps['renderOption'] = ({ option }: { option: CustomComboboxItem }) => {
		//

		const patternData = patterns.find(pattern => pattern.version_id === option.value);
		if (!patternData || !patternData.path.length) {
			return (
				<Flex align="center" gap={5} justify="center">
					<IconAlertTriangle size={14} />
					<Text size="xs">{t('invalid_option', { pattern_id: option.pattern_id })}</Text>
				</Flex>
			);
		};

		const firstStopData = stopsContext.actions.getStopById(patternData.path[0].stop_id);
		const firstStopLocality = locationsContext.data.localitites.find(locality => locality.id === firstStopData?.locality_id);
		const firstStopMunicipality = locationsContext.data.municipalities.find(municipality => municipality.id === firstStopData?.municipality_id);

		return (
			<Group key={option.value} gap={2}>
				<Flex direction="column">
					<Flex align="flex-end" gap={5}>
						<Text fw="bold">{patternData.headsign}</Text>
						{debugContext.flags.is_debug_mode && <Text c="gray" size="xs">({patternData.id})</Text>}
					</Flex>
					<Text size="xs">{t('option_label', { locality: firstStopLocality?.display || firstStopMunicipality?.name || '' })}</Text>
				</Flex>
			</Group>
		);
	};

	const renderSelectRoot = (props) => {
		//

		const patternData = patterns.find(pattern => pattern.version_id === value);

		if (!patternData) {
			return (
				<div {...props} key="no-pattern">
					<Text c="gray">{t('placeholder')}</Text>
				</div>
			);
		}

		const routeData = linesContext.actions.getRouteDataById(patternData?.route_id);

		return (
			<div {...props}>
				<Flex align="center" gap={5}>
					<Text fw="bold">{patternData.headsign}</Text>
					{debugContext.flags.is_debug_mode && <Text c="gray" size="xs">{patternData.id}</Text>}
				</Flex>
				<Text size="xs">{routeData?.long_name}</Text>
			</div>
		);
	};

	return (
		<Select
			allowDeselect={false}
			data={validPatternsSelectOptions}
			label={t('label')}
			onChange={onChange}
			renderOption={renderSelectOption}
			renderRoot={renderSelectRoot || undefined}
			value={value}
			w="100%"
			{...props}
		/>
	);
}
