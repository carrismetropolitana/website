'use client';

/* * */

import { useStopsContext } from '@/contexts/Stops.context';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { type Stop } from '@carrismetropolitana/api-types/network';
import { MultiSelect } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBusStop } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

/* * */

interface SelectStopsProps {
	data: Stop[]
	label?: string
	nothingFound?: string
	onSelectStopIds: (stopIds: string[]) => void
	placeholder?: string
	selectedStopIds: string[]
	variant: 'default' | 'white'
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
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);

	const stopsContext = useStopsContext();

	//
	// B. Transform data

	const { search } = useMemo(() => {
		const preparedSearchCollection = stopsContext.data.stops.map(item => ({
			...item,
			boost: false,
		}));

		return createDocCollection(preparedSearchCollection, {
			id: 2,
			long_name: 1,
			short_name: 1,
			tts_name: 1.5,
		});
	}, [stopsContext.data.stops]);

	//
	// C. Search

	const filteredStops = useMemo(() => {
		const results = debouncedSearchQuery ? search(debouncedSearchQuery) : data;
		return results.slice(0, 100).map(stop => ({
			label: stop.long_name || stop.short_name || stop.tts_name || stop.id,
			value: stop.id,
		}));
	}, [debouncedSearchQuery, search, data]);

	//
	// D. Render

	return (
		<MultiSelect
			data={filteredStops}
			label={label}
			leftSection={<IconBusStop size={16} />}
			nothingFoundMessage={nothingFound || t('nothing_found')}
			onChange={onSelectStopIds}
			onSearchChange={setSearchQuery}
			placeholder={placeholder || t('placeholder')}
			searchValue={searchQuery}
			value={selectedStopIds}
			clearable
			searchable
		/>
	);
}
