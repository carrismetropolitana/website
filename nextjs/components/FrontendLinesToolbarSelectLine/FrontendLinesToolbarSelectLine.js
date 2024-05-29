'use client';

/* * */

import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext';
import useSearch from '@/hooks/useSearch';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconSelector, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import LineDisplay from '../LineDisplay/LineDisplay';
import styles from './FrontendLinesToolbarSelectLine.module.css';

/* * */

export default function FrontendLinesToolbarSelectLine() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesToolbarSelectLine');
	const FrontendLinesContext = useFrontendLinesContext();
	const comboboxStore = useCombobox();
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

	//
	// B. Fetch data

	const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');

	//
	// C. Transform data

	const allLinesDataFormatted = useMemo(() => {
		if (allLinesData) {
			let allLinesDataFiltered = allLinesData;
			if (FrontendLinesContext.entities.municipality) {
				allLinesDataFiltered = allLinesDataFiltered.filter(line => new Set(line.municipalities).has(FrontendLinesContext.entities.municipality?.id));
			}
			if (FrontendLinesContext.entities.locality) {
				allLinesDataFiltered = allLinesDataFiltered.filter(line => new Set(line.localities).has(FrontendLinesContext.entities.locality?.locality));
			}
			return allLinesDataFiltered.map((line) => {
				return {
					color: line.color,
					id: line.id,
					localities: line.localities.join(', '),
					long_name: line.long_name,
					short_name: line.short_name,
					text_color: line.text_color,
				};
			});
		}
	}, [allLinesData, FrontendLinesContext.entities.locality, FrontendLinesContext.entities.municipality]);

	//
	// D. Search

	const allLinesDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allLinesDataFormatted, {
		keys: ['id', 'short_name', 'long_name', 'localities'],
		regexReplace: /[^a-zA-Z0-9\s]/g,
	});

	//
	// E. Handle actions

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
		FrontendLinesContext.clearSelectedLine();
		comboboxStore.openDropdown();
	};

	const handleSearchQueryChange = ({ currentTarget }) => {
		setSearchQuery(currentTarget.value);
		comboboxStore.updateSelectedOptionIndex();
		comboboxStore.selectFirstOption();
		comboboxStore.openDropdown();
	};

	const handleSelectLine = (chosenSelectItemValue) => {
		FrontendLinesContext.selectLine(chosenSelectItemValue);
		comboboxStore.closeDropdown();
	};

	//
	// F. Render components

	return (
		<div className={styles.container}>
			<Combobox onOptionSubmit={handleSelectLine} store={comboboxStore}>
				<Combobox.Target>
					{FrontendLinesContext.entities.line?.id && !comboboxStore.dropdownOpened
						? (
							<Group className={styles.comboboxTarget} onClick={handleClickSearchField}>
								<IconSearch size={20} />
								<LineDisplay color={FrontendLinesContext.entities.line?.color} long_name={FrontendLinesContext.entities.line?.long_name} short_name={FrontendLinesContext.entities.line?.short_name} text_color={FrontendLinesContext.entities.line?.text_color} />
								<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
									<IconX size={20} />
								</ActionIcon>
							</Group>
						)
						: (
							<TextInput
								aria-label={t('label')}
								autoComplete="off"
								leftSection={<IconSearch size={20} />}
								onBlur={handleExitSearchField}
								onChange={handleSearchQueryChange}
								onClick={handleClickSearchField}
								onFocus={handleClickSearchField}
								placeholder={t('placeholder')}
								size="lg"
								type="search"
								value={searchQuery}
								rightSection={
									searchQuery
										? (
											<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
												<IconX size={20} />
											</ActionIcon>
										)
										: <IconSelector size={18} />

								}
							/>
						)}
				</Combobox.Target>

				<Combobox.Dropdown>
					<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
						{allLinesDataFilteredBySearchQuery.length === 0
							? <Combobox.Empty>{t('no_results')}</Combobox.Empty>
							: allLinesDataFilteredBySearchQuery.map(item => (
								<Combobox.Option key={item.id} className={item.id === FrontendLinesContext.entities.line?.id && styles.selected} value={item.id}>
									<div className={styles.comboboxOption}>
										<LineDisplay color={item.color} long_name={item.long_name} short_name={item.short_name} text_color={item.text_color} />
									</div>
								</Combobox.Option>
							),

							)}
					</Combobox.Options>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);
}
