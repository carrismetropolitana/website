'use client';

import useSWR from 'swr';
import Image from 'next/image';
import { Combobox, Highlight, TextInput, useCombobox, Text, ActionIcon } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './StopsExplorerToolbarSearch.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch } from '@tabler/icons-react';
import parseStopLocationName from '@/services/parseStopLocationName';

export default function StopsExplorerToolbarSearch({ selectedStopCode, onSelectStopCode }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerToolbarSearch');
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Transform data

  const allStopsDataFormatted = useMemo(() => {
    if (allStopsData) {
      return allStopsData.map((stop) => {
        return {
          code: stop.code,
          name: stop.name,
          location: parseStopLocationName(stop.locality, stop.municipality_name),
        };
      });
    }
  }, [allStopsData]);

  //
  // D. Search

  const allStopsDataFilteredBySearchQuery = useSearch(searchQuery, allStopsDataFormatted, {
    keys: ['code', 'name', 'tts_name', 'location'],
    regexReplace: /[^a-zA-Z0-9]/g,
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
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.openDropdown();
  };

  const handleSelectStop = (selectedStopCode) => {
    const selectedStopData = allStopsData.find((item) => item.code === selectedStopCode);
    if (!selectedStopData) return;
    setSearchQuery(selectedStopData.name);
    onSelectStopCode(selectedStopCode);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectStop} store={comboboxStore}>
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
            {allStopsDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allStopsDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.code} value={item.code}>
                  <div className={styles.comboboxOption}>
                    {selectedStopCode === item.code && (
                      <div className={styles.selectedStop}>
                        <Image priority src="/stop-selected.png" alt={'Selected stop icon'} width={20} height={20} />
                      </div>
                    )}
                    <div className={styles.stopInfo}>
                      <Highlight highlight={searchQuery} fz="sm" fw={500}>
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
