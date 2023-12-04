'use client';

/* * */

import useSWR from 'swr';
import { Combobox, TextInput, useCombobox, ActionIcon, Group } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentSelectPattern.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch } from '@tabler/icons-react';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import { useDebouncedValue } from '@mantine/hooks';
import LineDisplay from '../LineDisplay/LineDisplay';

/* * */

export default function LinesExplorerContentSelectPattern() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerContentSelectPattern');
  const linesExplorerContext = useLinesExplorerContext();
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  //
  // D. Search

  const allPatternsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, linesExplorerContext.entities?.available_patterns, {
    keys: ['id', 'headsign'],
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
    linesExplorerContext.clearSelectedPattern();
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.selectFirstOption();
    comboboxStore.openDropdown();
  };

  const handleSelectLine = (chosenSelectItemValue) => {
    linesExplorerContext.selectPattern(chosenSelectItemValue);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectLine} store={comboboxStore}>
        <Combobox.Target>
          {linesExplorerContext.entities.line?.id && linesExplorerContext.entities.pattern?.id && !comboboxStore.dropdownOpened ? (
            <Group className={styles.comboboxTarget} onClick={handleClickSearchField}>
              <IconSearch size={20} />
              <LineDisplay short_name={linesExplorerContext.entities.line?.short_name} long_name={linesExplorerContext.entities.pattern?.headsign} color={linesExplorerContext.entities.line?.color} text_color={linesExplorerContext.entities.line?.text_color} />
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
            {allPatternsDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allPatternsDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.id} value={item.id} className={item.id === linesExplorerContext.entities.line?.id && styles.selected}>
                  <div className={styles.comboboxOption}>{item.headsign}</div>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
