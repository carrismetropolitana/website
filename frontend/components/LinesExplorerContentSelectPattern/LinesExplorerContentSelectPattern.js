'use client';

/* * */

import { Combobox, TextInput, useCombobox, ActionIcon, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
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
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 10);
  const [allPatternsData, setAllPatternsData] = useState([]);

  //
  // B. Fetch data

  useEffect(() => {
    (async function () {
      // Exit if no line is selected
      if (!linesExplorerContext.entities?.line?.id) return;
      // Initiate a temporaty variable to hold formatted patterns
      let formattedPatternOptions = [];
      // Loop through each line pattern to retrieve its info
      for (const patternId of linesExplorerContext.entities.line.patterns) {
        // Fetch pattern info
        const patternDataResponse = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternId}`);
        const patternData = await patternDataResponse.json();
        // Save pattern
        formattedPatternOptions.push(patternData);
      }
      // Update state with formatted patterns
      setAllPatternsData(formattedPatternOptions);
      // Pre-select the first pattern if none is selected
      if (!linesExplorerContext.entities.pattern) {
        linesExplorerContext.selectPattern(formattedPatternOptions[0]);
      }
      //
    })();
  }, [linesExplorerContext]);

  //
  // C. Search

  const allPatternsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allPatternsData, {
    keys: ['id', 'headsign', 'municipalities', 'localities'],
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
    linesExplorerContext.clearSelectedPattern();
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.selectFirstOption();
    comboboxStore.openDropdown();
  };

  const handleSelectPattern = (chosenSelectItemValue) => {
    const foundPattern = allPatternsData.find((item) => item.id === chosenSelectItemValue);
    if (foundPattern) {
      linesExplorerContext.selectPattern(foundPattern);
      comboboxStore.closeDropdown();
    }
  };

  //
  // E. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectPattern} store={comboboxStore}>
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

  //
}
