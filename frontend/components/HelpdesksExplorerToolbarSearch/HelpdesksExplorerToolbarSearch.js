'use client';

import useSWR from 'swr';
import Image from 'next/image';
import { Combobox, Highlight, TextInput, useCombobox, Text, ActionIcon } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './HelpdesksExplorerToolbarSearch.module.css';
import useSearch from '@/hooks/useSearch';
import { IconX, IconSearch } from '@tabler/icons-react';
import parseStopLocationName from '@/services/parseStopLocationName';

export default function HelpdesksExplorerToolbarSearch({ selectedHelpdeskCode, onSelectHelpdeskCode }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorerToolbarSearch');
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allHelpdesksData } = useSWR('https://api.carrismetropolitana.pt/helpdesks');

  //
  // C. Transform data

  const allHelpdesksDataFormatted = useMemo(() => {
    if (allHelpdesksData) {
      return allHelpdesksData.map((helpdesk) => {
        return {
          code: helpdesk.code,
          name: helpdesk.name,
          location: parseStopLocationName(helpdesk.locality, helpdesk.municipality_name),
        };
      });
    }
  }, [allHelpdesksData]);

  //
  // D. Search

  const allHelpdesksDataFilteredBySearchQuery = useSearch(searchQuery, allHelpdesksDataFormatted, {
    keys: ['code', 'name', 'location'],
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

  const handleSelectHelpdesk = (selectedHelpdeskCode) => {
    const selectedHelpdeskData = allHelpdesksData.find((item) => item.code === selectedHelpdeskCode);
    if (!selectedHelpdeskData) return;
    setSearchQuery(selectedHelpdeskData.name);
    onSelectHelpdeskCode(selectedHelpdeskCode);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectHelpdesk} store={comboboxStore}>
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
            {allHelpdesksDataFilteredBySearchQuery.length === 0 ? (
              <Combobox.Empty>{t('no_results')}</Combobox.Empty>
            ) : (
              allHelpdesksDataFilteredBySearchQuery.map((item) => (
                <Combobox.Option key={item.code} value={item.code}>
                  <div className={styles.comboboxOption}>
                    {selectedHelpdeskCode === item.code && (
                      <div className={styles.selectedHelpdesk}>
                        <Image priority src="/stop-selected.png" alt={'Selected helpdesk icon'} width={20} height={20} />
                      </div>
                    )}
                    <div className={styles.helpdeskInfo}>
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
