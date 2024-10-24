'use client';

/* * */

import type { Line } from '@/types/lines.types.js';

import LineDisplay from '@/components/lines/LineDisplay';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconArrowLoopRight, IconSelector, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface SelectLineProps {
	data: Line[]
	label?: string
	nothingFound?: string
	onSelectLineId: (lineId: null | string) => void
	placeholder?: string
	selectedLineId: null | string
	variant: 'default' | 'white'
}

/* * */

export function SelectLine({ data = [], label, nothingFound, onSelectLineId, placeholder, selectedLineId, variant }: SelectLineProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('SelectLine');
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);

	//
	// B. Transform data

	const { search } = useMemo(() => createDocCollection(data.map(d => ({ boost: false, ...d })), {
		id: 2,
		localities: 1,
		long_name: 1,
		short_name: 1,
	}), [data]);

	const selectedLineData = useMemo(() => {
		return data.find(item => item.id === selectedLineId);
	}, [selectedLineId, data]);

	//
	// C. Search

	const allLinesDataFilteredBySearchQuery = useMemo(() => {
		const filteredData = debouncedSearchQuery ? search(debouncedSearchQuery) : data;
		return filteredData.slice(0, 100);
	}, [debouncedSearchQuery, search, data]);

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
		onSelectLineId(null);
		comboboxStore.openDropdown();
	};

	const handleSearchQueryChange = ({ currentTarget }) => {
		setSearchQuery(currentTarget.value);
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.selectFirstOption();
		comboboxStore.openDropdown();
	};

	const handleSelectLine = (chosenSelectItemValue) => {
		console.log(chosenSelectItemValue);
		onSelectLineId(chosenSelectItemValue);
		comboboxStore.closeDropdown();
	};

	//
	// E. Render components

	return (
		<Combobox onOptionSubmit={handleSelectLine} store={comboboxStore}>
			<Combobox.Target>
				{selectedLineData && !comboboxStore.dropdownOpened
					? (
						<Group className={`${styles.comboboxTargetWrapper} ${variant === 'white' && styles.variantWhite}`} onClick={handleClickSearchField}>
							<div className={styles.comboboxTargetSection} data-position="left">
								<IconArrowLoopRight size={20} />
							</div>
							<div className={styles.comboboxTargetInput}>
								<LineDisplay line={selectedLineData} />
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
							leftSection={<IconArrowLoopRight size={20} />}
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
					{allLinesDataFilteredBySearchQuery.length === 0
						? <Combobox.Empty>{nothingFound || t('nothing_found')}</Combobox.Empty>
						: allLinesDataFilteredBySearchQuery.map(item => (
							<Combobox.Option key={item.id} className={item.id === selectedLineData?.id ? styles.selected : ''} value={item.id}>
								<div className={styles.comboboxOption}>
									<LineDisplay line={item} />
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
