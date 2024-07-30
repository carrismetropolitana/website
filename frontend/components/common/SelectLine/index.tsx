'use client';

/* * */

import LineDisplay from '@/components/layout/LineDisplay';
import { createDocCollection } from '@/hooks/useOtherSearch';
import { Line } from '@/utils/types';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconArrowLoopRight, IconSelector, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component({ data = [] as Line[], onSelectLineId = (_: null | string) => null, selectedLineId, variant, ...props }) {
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

	const allLinesDataFilteredBySearchQuery = useMemo(
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
								<LineDisplay color={selectedLineData?.color} long_name={selectedLineData?.long_name} short_name={selectedLineData?.short_name} text_color={selectedLineData?.text_color} />
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
							leftSection={<IconArrowLoopRight size={20} />}
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
					{allLinesDataFilteredBySearchQuery.length === 0
						? <Combobox.Empty>{t('nothing_found')}</Combobox.Empty>
						: allLinesDataFilteredBySearchQuery.map(item => (
							<Combobox.Option key={item.id} className={item.id === selectedLineData?.id ? styles.selected : ''} value={item.id}>
								<div className={styles.comboboxOption}>
									<LineDisplay color={item.color} long_name={item.long_name} short_name={item.short_name} text_color={item.text_color} />
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