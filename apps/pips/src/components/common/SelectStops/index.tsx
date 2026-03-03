'use client';

/* * */

import { ComboboxData, MultiSelect } from '@mantine/core';
import { IconBusStop } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

/* * */

interface SelectStopsProps {
	data: ComboboxData
	label?: string
	nothingFound?: string
	onSelectStopIds: (stopIds: string[]) => void
	placeholder?: string
	selectedStopIds: string[]
}

/* * */

export function SelectStops({
	data = [],
	label,
	nothingFound,
	onSelectStopIds,
	placeholder,
	selectedStopIds,
}: SelectStopsProps) {
	//
	// A. Setup variables

	const t = useTranslations('SelectStop');

	//
	// B. Render

	return (
		<MultiSelect
			data={data}
			label={label}
			leftSection={<IconBusStop size={16} />}
			limit={100}
			nothingFoundMessage={nothingFound || t('nothing_found')}
			onChange={onSelectStopIds}
			placeholder={placeholder || t('placeholder')}
			value={selectedStopIds}
			w="100%"
			clearable
			searchable
		/>
	);
}
