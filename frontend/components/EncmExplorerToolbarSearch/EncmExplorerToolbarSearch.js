'use client';

import useSWR from 'swr';
import { Combobox, Highlight, TextInput, useCombobox, Text, ActionIcon } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './EncmExplorerToolbarSearch.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch } from '@tabler/icons-react';
import parseStopLocationName from '@/services/parseStopLocationName';

export default function EncmExplorerToolbarSearch({ selectedEncmId, onSelectEncmId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('EncmExplorerToolbarSearch');
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allEncmData } = useSWR('https://api.carrismetropolitana.pt/facilities/encm');

  //
  // C. Transform data

  const allEncmDataFormatted = useMemo(() => {
    if (allEncmData) {
      return allEncmData.map((encm) => {
        return {
          id: encm.id,
          name: encm.name,
          location: parseStopLocationName(encm.locality, encm.municipality_name),
        };
      });
    }
  }, [allEncmData]);

  //
  // D. Search

  const allEncmDataFilteredBySearchQuery = useSearch(searchQuery, allEncmDataFormatted, {
    keys: ['id', 'name', 'location'],
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
    comboboxStore.selectFirstOption();
    comboboxStore.openDropdown();
  };

  const handleSelectEncm = (selectedEncmId) => {
    const selectedEncmData = allEncmData.find((item) => item.id === selectedEncmId);
    if (!selectedEncmData) return;
    setSearchQuery(selectedEncmData.name);
    onSelectEncmId(selectedEncmId);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectEncm} store={comboboxStore}>
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
            {allEncmDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allEncmDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.id} value={item.id}>
                  <div className={styles.comboboxOption}>
                    <div className={styles.encmInfo}>
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
