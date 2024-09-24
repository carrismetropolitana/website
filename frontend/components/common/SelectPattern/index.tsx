'use client';
/* * */

import { PatternGroup } from '@/types/lines.types';
import { Flex, Group, Select, SelectProps, Text } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export interface SelectPatternProps extends SelectProps {
	date_filter?: string
	patterns: PatternGroup[]
}

export default function Component({ date_filter, onChange, patterns, value, ...props }: SelectPatternProps) {
	//
	// A. Setup variables
	const t = useTranslations('SelectPattern');

	//
	// B. Transform data
	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!patterns) return [];

		// Filter patterns by date
		return patterns.map(patternGroupData => ({ disabled: date_filter ? !patternGroupData.valid_on.includes(date_filter) : false, label: patternGroupData.headsign, value: patternGroupData.pattern_group_id }));
	}, [patterns]);

	//
	// C. Render components
	const renderSelectOption: SelectProps['renderOption'] = ({ option }) => {
		const pattern = patterns.find(pattern => pattern.pattern_group_id === option.value);

		if (!pattern) return null;
		if (pattern.path.length === 0) return null;

		return (
			<Group gap={2}>
				<Flex direction="column">
					{/* Route Long Name */}
					<Text fw="bold">{pattern.headsign}</Text>
					<Text size="xs">{t('option_label', { locality: pattern.path[0].stop.locality })}</Text>
				</Flex>
			</Group>
		);
	};

	const renderSelectRoot = (props) => {
		const pattern = patterns.find(pattern => pattern.pattern_group_id === value);

		if (!pattern) return (
			<div {...props}>
				<Text c="gray">Select a pattern</Text>
			</div>
		);

		return (
			<div {...props}>
				<Text fw="bold">{pattern.headsign}</Text>
				<Text size="xs">{pattern.route_long_name}</Text>
			</div>
		);
	};

	return (
		<Select
			allowDeselect={false}
			data={validPatternGroupsSelectOptions}
			onChange={onChange}
			renderOption={renderSelectOption}
			renderRoot={renderSelectRoot || undefined}
			value={value}
			w="100%"
			{...props}
		/>
	);
}
