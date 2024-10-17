'use client';

/* * */

import type { Stop } from '@/types/stops.types';

import { StopDisplay } from '@/components/stops/StopDisplay';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBusStop, IconSelector, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface SelectStopProps {
	data: Stop[]
	label?: string
	nothingFound?: string
	onSelectStopId: (stopId: null | string) => void
	placeholder?: string
	selectedStopId: null | string
	variant: 'default' | 'white'
}

/* * */

export default function Component({ data = [], label, nothingFound, onSelectStopId, placeholder, selectedStopId, variant }: SelectStopProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('SelectStop');
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);

	//
	// B. Transform data

	// const allStopsDataFormatted = useMemo(() => {
	// 	console.log(data);
	// 	if (data) {
	// 		return data.map((stop) => {
	// 			return {
	// 				_id: stop.id,
	// 				locality: stop.locality,
	// 				municipality_name: stop.municipality_name,
	// 				name: stop.name,
	// 				short_name: stop.short_name,
	// 				tts_name: stop.tts_name,
	// 			};
	// 		});
	// 	}
	// }, [data]);

	const { search } = useMemo(() => createDocCollection(data.map(d => ({ boost: false, ...d })), {
		id: 2,
		locality: 1,
		name: 1,
		short_name: 1,
		tts_name: 0.9,
	}), [data]);

	const selectedStopData = useMemo(() => {
		return data.find(item => item.id === selectedStopId);
	}, [data, selectedStopId]);

	//
	// C. Search

	const allStopsDataFilteredBySearchQuery = useMemo(
		() => (debouncedSearchQuery ? search(debouncedSearchQuery) : data).slice(0, 100),
		[debouncedSearchQuery, search, data]);

	//
	// D. Handle actions

	const handleClickSearchField = ({ currentTarget }) => {
		if (currentTarget.select) currentTarget.select();
		comboboxStore.openDropdown();
		comboboxStore.focusTarget();
	};

	const handleExitSearchField = () => {
		comboboxStore.closeDropdown();
	};

	const handleClearSearchField = () => {
		setSearchQuery('');
		onSelectStopId(null);
		comboboxStore.openDropdown();
	};

	const handleSearchQueryChange = ({ currentTarget }) => {
		setSearchQuery(currentTarget.value);
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.selectFirstOption();
		comboboxStore.openDropdown();
	};

	const handleSelectStop = (chosenSelectItemValue) => {
		onSelectStopId(chosenSelectItemValue);
		comboboxStore.closeDropdown();
	};

	//
	// E. Render components

	return (
		<Combobox onOptionSubmit={handleSelectStop} store={comboboxStore}>
			<Combobox.Target>
				{selectedStopData && !comboboxStore.dropdownOpened
					? (
						<Group className={`${styles.comboboxTargetWrapper} ${variant === 'white' && styles.variantWhite}`} onClick={handleClickSearchField}>
							<div className={styles.comboboxTargetSection} data-position="left">
								<IconBusStop size={20} />
							</div>
							<div className={styles.comboboxTargetInput}>
								<StopDisplay stop={selectedStopData} />
							</div>
							<div className={styles.comboboxTargetSection} data-position="right">
								<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
									<IconX size={20} />
								</ActionIcon>
							</div>
						</Group>
					)
					: (
						<TextInput
							aria-label={label || t('label')}
							autoComplete="off"
							leftSection={<IconBusStop size={20} />}
							onBlur={handleExitSearchField}
							onChange={handleSearchQueryChange}
							onClick={handleClickSearchField}
							onFocus={handleClickSearchField}
							placeholder={placeholder || t('placeholder')}
							type="search"
							value={searchQuery}
							variant={variant}
							rightSection={
								searchQuery
									? (
										<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
											<IconX size={20} />
										</ActionIcon>
									)
									: (
										<IconSelector size={18} />
									)
							}
						/>
					)}
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
					{allStopsDataFilteredBySearchQuery.length === 0
						? <Combobox.Empty>{nothingFound || t('nothing_found')}</Combobox.Empty>
						: allStopsDataFilteredBySearchQuery.map(item => (
							<Combobox.Option key={item.id} className={item.id === selectedStopData?.id ? styles.selected : ''} value={item.id}>
								<div className={styles.comboboxOption}>
									<StopDisplay stop={item} />
								</div>
							</Combobox.Option>
						),
						)}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);

	//
}
