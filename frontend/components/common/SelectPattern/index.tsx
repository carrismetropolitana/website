'use client';
/* * */

import { PatternGroup } from '@/types/lines.types';
import { Group, Select, SelectProps, Text } from '@mantine/core';
import { useMemo } from 'react';

/* * */

export interface SelectPatternProps extends SelectProps {
	date_filter?: string
	patterns: PatternGroup[]
}

export default function Component({ date_filter, onChange, patterns, value, ...props }: SelectPatternProps) {
	//
	// A. Setup variables

	//
	// B. Transform data
	const validPatternGroupsSelectOptions = useMemo(() => {
		if (!patterns) return [];

		// Filter patterns by date
		return patterns.map(patternGroupData => ({ disabled: date_filter ? !patternGroupData.valid_on.includes(date_filter) : false, label: patternGroupData.headsign, value: patternGroupData.pattern_group_id }));
	}, [patterns]);

	//
	// C. Render components
	const renderSelectOption: SelectProps['renderOption'] = async ({ option }) => {
		const pattern = patterns.find(pattern => pattern.pattern_group_id === option.value);

		if (!pattern) return null;
		if (pattern.path.length === 0) return null;

		return (
			<Group gap={2}>
				<Text fw="bold">{pattern.headsign}</Text>
				{/* Route Long Name */}
				<Text fw="bold">{pattern.route_id}</Text>
				<Text size="xs">A partir de {pattern.valid_on[0]}</Text>
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
				<Text size="xs">{pattern.path[0].stop.name} → {pattern.path[pattern.path.length - 1].stop.name}</Text>
			</div>
		);
	};

	return (
		<Select
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
