'use client';

import useSWR from 'swr';
import { Combobox, Highlight, TextInput, useCombobox, Text, ActionIcon, Container, Group } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerToolbarLineSearch.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch } from '@tabler/icons-react';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import { useDebouncedValue } from '@mantine/hooks';
import LineDisplay from '../LineDisplay/LineDisplay';

/* * */

export default function LinesExplorerToolbarLineSearch() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerToolbarLineSearch');
  const linesExplorerContext = useLinesExplorerContext();
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  const [selectedLineData, setSelectedLineData] = useState(null);

  //
  // B. Fetch data

  const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');

  //
  // C. Transform data

  const allLinesDataFormatted = useMemo(() => {
    if (allLinesData) {
      return allLinesData.map((line) => {
        return {
          id: line.id,
          short_name: line.short_name,
          long_name: line.long_name,
          color: line.color,
          text_color: line.text_color,
          localities: line.localities.join(', '),
        };
      });
    }
  }, [allLinesData]);

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
    linesExplorerContext.updateEntities({ line_id: null }, true);
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.openDropdown();
  };

  const handleSelectLine = (chosenSelectItemValue) => {
    const chosenItem = allLinesData.find((item) => item.id === chosenSelectItemValue);
    if (!chosenItem) return;
    setSelectedLineData(chosenItem);
    // setSearchQuery(chosenItem.long_name);
    linesExplorerContext.updateEntities({ line_id: chosenSelectItemValue }, true);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectLine} store={comboboxStore}>
        <Combobox.Target>
          {linesExplorerContext.entities.line_id && !comboboxStore.dropdownOpened ? (
            <Group className={styles.comboboxTarget} onClick={handleClickSearchField}>
              <IconSearch size={20} />
              <LineDisplay short_name={selectedLineData.short_name} long_name={selectedLineData.long_name} color={selectedLineData.color} text_color={selectedLineData.text_color} />
              <ActionIcon onClick={handleClearSearchField} size="md" variant="subtle" color="gray">
                <IconX size={20} />
              </ActionIcon>
            </Group>
          ) : (
            <TextInput
              autoComplete="off"
              type="search"
              aria-label={t('label')}
              placeholder={t('placeholder')}
              value={searchQuery}
              size="lg"
              leftSection={<IconSearch size={20} />}
              rightSection={
                searchQuery && (
                  <ActionIcon onClick={handleClearSearchField} size="md" variant="subtle" color="gray">
                    <IconX size={20} />
                  </ActionIcon>
                )
              }
              onChange={handleSearchQueryChange}
              onClick={handleClickSearchField}
              onFocus={handleClickSearchField}
              onBlur={handleExitSearchField}
            />
          )}
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {allLinesDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allLinesDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.id} value={item.id} className={item.id === linesExplorerContext.entities.line_id && styles.selected}>
                  <div className={styles.comboboxOption}>
                    <LineDisplay short_name={item.short_name} long_name={item.long_name} color={item.color} text_color={item.text_color} />
                  </div>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
