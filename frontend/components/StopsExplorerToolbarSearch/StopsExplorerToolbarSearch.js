'use client';

import useSWR from 'swr';
import { Combobox, Highlight, TextInput, useCombobox, Text, ActionIcon } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './StopsExplorerToolbarSearch.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch, IconMapCode } from '@tabler/icons-react';
import parseStopLocationName from '@/services/parseStopLocationName';
import { useStopsExplorerContext } from '@/contexts/StopsExplorerContext';
import { useDebouncedValue } from '@mantine/hooks';
import { useMap } from 'react-map-gl/maplibre';

/* * */

export default function StopsExplorerToolbarSearch() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerToolbarSearch');
  const stopsExplorerContext = useStopsExplorerContext();
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);
  const { stopsExplorerMap } = useMap();

  const [searchQueryCoordinates, setSearchQueryCoordinates] = useState(null);

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Transform data

  const allStopsDataFormatted = useMemo(() => {
    if (allStopsData) {
      return allStopsData.map((stop) => {
        return {
          id: stop.id,
          name: stop.name,
          tts_name: stop.tts_name,
          location: parseStopLocationName(stop.locality, stop.municipality_name),
        };
      });
    }
  }, [allStopsData]);

  //
  // D. Search

  const allStopsDataFilteredBySearchQuery = useSearch(debouncedSearchQuery, allStopsDataFormatted, {
    keys: ['id', 'name', 'tts_name', 'location'],
    regexReplace: /[^a-zA-Z0-9\s]/g,
    limitResults: 100,
  });

  //
  // E. Handle actions

  const handleClickSearchField = ({ currentTarget }) => {
    currentTarget.select();
    comboboxStore.openDropdown();
  };

  const handleExitSearchField = () => {
    comboboxStore.closeDropdown();
  };

  const handleClearSearchField = () => {
    setSearchQuery('');
    setSearchQueryCoordinates(null);
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    // Always update text field
    setSearchQuery(currentTarget.value);
    // Test if the input field is a set of coordinates
    const coordinatesPattern = /^([-+]?\d{1,3}(?:\.|,)(?:\d+))(?:\s+|,)\s*([-+]?\d{1,3}(?:\.|,)(?:\d+))$/;
    const coordinatesMatch = coordinatesPattern.exec(currentTarget.value);
    if (coordinatesMatch && coordinatesMatch.length === 3) setSearchQueryCoordinates([parseFloat(coordinatesMatch[2].replace(',', '.')), parseFloat(coordinatesMatch[1].replace(',', '.'))]);
    else setSearchQueryCoordinates(null);
    // Update combobox
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.selectFirstOption();
    comboboxStore.openDropdown();
  };

  const handleSelectStop = (chosenStop) => {
    stopsExplorerContext.selectStop(chosenStop.id);
    comboboxStore.closeDropdown();
  };

  const handleSelectCoordinates = () => {
    stopsExplorerContext.clearSelectedStop();
    stopsExplorerContext.setSelectedCoordinates(searchQueryCoordinates);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox store={comboboxStore}>
        <Combobox.Target>
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
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {searchQueryCoordinates ? (
              <Combobox.Option value={searchQuery} onClick={() => handleSelectCoordinates()}>
                <div className={styles.comboboxOption}>
                  <div className={styles.coordinatesResult}>
                    <IconMapCode size={20} />
                    <p className={styles.coordinatesResultLabel}>Mover mapa para estas coordenadas</p>
                  </div>
                </div>
              </Combobox.Option>
            ) : allStopsDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allStopsDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.id} value={item.id} onClick={() => handleSelectStop(item)}>
                  <div className={styles.comboboxOption}>
                    <div className={styles.stopInfo}>
                      <Highlight fz="sm" fw={500}>
                        {item.name}
                      </Highlight>
                      <Text fz="xs">{item.location}</Text>
                    </div>
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
