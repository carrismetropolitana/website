'use client';

/* * */

import { Combobox, TextInput, useCombobox, ActionIcon, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerContentSelectPattern.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch, IconSelector } from '@tabler/icons-react';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';
import { useDebouncedValue } from '@mantine/hooks';

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
  const [allRoutesData, setAllRoutesData] = useState([]);
  const [allPatternsData, setAllPatternsData] = useState([]);

  //
  // B. Fetch data

  useEffect(() => {
    (async function () {
      // Exit if no line is selected
      if (!linesExplorerContext.entities?.line?.id) return;
      // Initiate a temporaty variable to hold formatted routes and patterns
      let formattedRouteOptions = [];
      let formattedPatternOptions = [];
      // Loop through each line route to retrieve its info
      for (const routeId of linesExplorerContext.entities.line.routes) {
        // Fetch pattern info
        const routeDataResponse = await fetch(`https://api.carrismetropolitana.pt/routes/${routeId}`);
        const routeData = await routeDataResponse.json();
        // Save route
        formattedRouteOptions.push(routeData);
      }
      // Loop through each line pattern to retrieve its info
      for (const patternId of linesExplorerContext.entities.line.patterns) {
        // Fetch pattern info
        const patternDataResponse = await fetch(`https://api.carrismetropolitana.pt/patterns/${patternId}`);
        const patternData = await patternDataResponse.json();
        // Save pattern
        formattedPatternOptions.push({ ...patternData, route: formattedRouteOptions.find((route) => route.id === patternData.route_id) });
      }
      // Update state with formatted patterns
      setAllRoutesData(formattedRouteOptions);
      setAllPatternsData(formattedPatternOptions);
      //
    })();
  }, [linesExplorerContext.entities.line?.id, linesExplorerContext.entities.line?.patterns, linesExplorerContext.entities.line?.routes]);

  useEffect(() => {
    // Pre-select the first pattern if none is selected
    if (!linesExplorerContext.entities.pattern && allPatternsData.length > 0) {
      const firstPatternInTheArray = allPatternsData[0];
      const foundParentRoute = allRoutesData.find((route) => route.id === firstPatternInTheArray.route_id);
      // Pre-select the first route and pattern if it belongs to the selected line
      if (firstPatternInTheArray.line_id === linesExplorerContext.entities.line.id && foundParentRoute) {
        linesExplorerContext.selectPattern(foundParentRoute, allPatternsData[0]);
      }
    }
  }, [allPatternsData, allRoutesData, linesExplorerContext]);

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
    const foundRoute = allRoutesData.find((item) => item.route_id === chosenSelectItemValue);
    const foundPattern = allPatternsData.find((item) => item.id === chosenSelectItemValue);
    if (foundPattern) {
      linesExplorerContext.selectPattern(foundRoute, foundPattern);
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
              <p className={styles.comboboxSelection}>{linesExplorerContext.entities.pattern?.headsign}</p>
              <ActionIcon size="md" variant="subtle" color="gray">
                <IconSelector size={20} />
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
              rightSection={<IconSelector size={20} />}
              onChange={handleSearchQueryChange}
              onClick={handleClickSearchField}
              onFocus={handleClickSearchField}
              onBlur={handleExitSearchField}
              className={styles.comboboxInput}
            />
          )}
        </Combobox.Target>

        <Combobox.Dropdown className={styles.comboboxDropdown}>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {allPatternsDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allPatternsDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.id} value={item.id} className={item.id === linesExplorerContext.entities.pattern?.id && styles.selected}>
                  <div className={styles.comboboxOption}>
                    {/* <p className={styles.tripHeadsign}>{t('options.headsign', { value: item.headsign })}</p> */}
                    <p className={styles.tripHeadsign}>{item.headsign}</p>
                    <p className={styles.routeName}>{item.route.long_name}</p>
                    {/* de {linesExplorerContext.entities.pattern.path[0].stop.locality} para {item.headsign} */}
                  </div>
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
