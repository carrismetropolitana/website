'use client';

/* * */

import type { Stop } from '@carrismetropolitana/api-types/network';

import { createDocCollection } from '@/hooks/useOtherSearch';
import { MultiSelect } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBusStop } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

interface StopOption {
	label: string
	value: string
}

interface SearchStopDoc extends Record<string, unknown>, Stop {}

/* * */

interface SelectStopsProps {
	data: Stop[]
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
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);

	const { search } = useMemo(() => {
		const preparedDocs: SearchStopDoc[] = data.map(stop => ({ ...stop }));
		return createDocCollection(preparedDocs, {
			id: 2,
			long_name: 1,
			short_name: 1,
		});
	}, [data]);

	const initialSuggestions = useMemo(() => {
		// Show a small list even before typing (avoid rendering thousands of items)
		return [...data]
			.sort((a, b) => (a.long_name || '').localeCompare((b.long_name || ''), undefined, { sensitivity: 'base' }))
			.slice(0, 50);
	}, [data]);

	const selectedStops = useMemo(() => {
		if (!selectedStopIds.length) return [];
		const selectedSet = new Set(selectedStopIds);
		return data.filter(stop => selectedSet.has(stop.id));
	}, [data, selectedStopIds]);

	const results = useMemo(() => {
		if (!debouncedSearchQuery.trim()) return initialSuggestions;
		return search(debouncedSearchQuery).slice(0, 100);
	}, [debouncedSearchQuery, initialSuggestions, search]);

	const options = useMemo(() => {
		const byId = new Map<string, StopOption>();
		const addStop = (stop: Stop) => {
			if (!stop?.id) return;
			byId.set(stop.id, {
				label: stop.long_name ? `${stop.long_name} (${stop.id})` : stop.id,
				value: stop.id,
			});
		};

		selectedStops.forEach(addStop);
		results.forEach(addStop);

		return Array.from(byId.values());
	}, [results, selectedStops]);

	//
	// B. Render

	return (
		<MultiSelect
			data={options}
			filter={({ options }) => options}
			label={label || t('label')}
			leftSection={<IconBusStop size={16} />}
			limit={100}
			nothingFoundMessage={nothingFound || t('nothing_found')}
			onChange={onSelectStopIds}
			onDropdownClose={() => setSearchQuery('')}
			onSearchChange={setSearchQuery}
			placeholder={placeholder || t('placeholder')}
			searchValue={searchQuery}
			value={selectedStopIds}
			w="100%"
			clearable
			hidePickedOptions
			searchable
		/>
	);
}
