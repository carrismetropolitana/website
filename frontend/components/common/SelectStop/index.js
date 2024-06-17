'use client';

/* * */

import StopDisplay from '@/components/layout/StopDisplay';
import useSearch from '@/hooks/useSearch';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconBusStop, IconSelector, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ data = [], onSelectStopId = () => null, selectedStopId, variant, ...props }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('SelectStop');
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);

	//
	// B. Transform data

	const allStopsDataFormatted = useMemo(() => {
		console.log(data);
		if (data) {
			return data.map((stop) => {
				return {
					_id: stop.id,
					locality: stop.locality,
					municipality_name: stop.municipality_name,
					name: stop.name,
					short_name: stop.short_name,
					tts_name: stop.tts_name,
				};
			});
		}
	}, [data]);

	const selectedStopData = useMemo(() => {
		if (allStopsDataFormatted) {
			return allStopsDataFormatted.find(item => item._id === selectedStopId);
		}
	}, [allStopsDataFormatted, selectedStopId]);

	//
	// C. Search

	const allStopsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allStopsDataFormatted, {
		keys: ['_id', 'name', 'short_name', 'locality'],
		limitResults: 100,
		regexReplace: /[^a-zA-Z0-9\s]/g,
	});

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
		onSelectStopId();
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
								<StopDisplay _id={selectedStopData?._id}locality={selectedStopData?.locality} municipalityName={selectedStopData?.municipality_name} name={selectedStopData?.name} />
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
							aria-label={t('label')}
							autoComplete="off"
							leftSection={<IconBusStop size={20} />}
							onBlur={handleExitSearchField}
							onChange={handleSearchQueryChange}
							onClick={handleClickSearchField}
							onFocus={handleClickSearchField}
							placeholder={t('placeholder')}
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
						? <Combobox.Empty>{t('nothing_found')}</Combobox.Empty>
						: allStopsDataFilteredBySearchQuery.map(item => (
							<Combobox.Option key={item._id} className={item._id === selectedStopData?.id && styles.selected} value={item._id}>
								<div className={styles.comboboxOption}>
									<StopDisplay _id={item._id} locality={item?.locality} municipalityName={item?.municipality_name} name={item?.name} />
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
