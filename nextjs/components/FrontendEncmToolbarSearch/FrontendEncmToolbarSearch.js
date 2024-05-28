'use client';

import useSearch from '@/hooks/useSearch'
import parseStopLocationName from '@/services/parseStopLocationName'
import { ActionIcon, Combobox, Highlight, Text, TextInput, useCombobox } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

import styles from './FrontendEncmToolbarSearch.module.css'

export default function FrontendEncmToolbarSearch({ onSelectEncmId, selectedEncmId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendEncmToolbarSearch');
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');

  //
  // B. Fetch data

  const { data: allEncmData } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/encm');

  //
  // C. Transform data

  const allEncmDataFormatted = useMemo(() => {
    if (allEncmData) {
      return allEncmData.map((encm) => {
        return {
          id: encm.id,
          location: parseStopLocationName(encm.locality, encm.municipality_name),
          name: encm.name,
        }
      });
    }
  }, [allEncmData]);

  //
  // D. Search

  const allEncmDataFilteredBySearchQuery = useSearch(searchQuery, allEncmDataFormatted, {
    keys: ['id', 'name', 'location'],
    limitResults: 100,
    regexReplace: /[^a-zA-Z0-9]/g,
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
    const selectedEncmData = allEncmData.find(item => item.id === selectedEncmId);
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
            aria-label={t('label')}
            autoComplete="off"
            leftSection={<IconSearch size={20} />}
            onBlur={handleExitSearchField}
            onChange={handleSearchQueryChange}
            onClick={handleClickSearchField}
            onFocus={handleClickSearchField}
            placeholder={t('placeholder')}
            rightSection={
							searchQuery
								&& <ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
  <IconX size={20} />
        </ActionIcon>

						}
            size="lg"
            type="search"
            value={searchQuery}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {allEncmDataFilteredBySearchQuery.length === 0 ?
							<Combobox.Empty>{t('no_results')}</Combobox.Empty> :
							allEncmDataFilteredBySearchQuery.map(item => 
<Combobox.Option key={item.id} value={item.id}>
								<div className={styles.comboboxOption}>
									<div className={styles.encmInfo}>
										<Highlight highlight={searchQuery} fz='sm' fw={500}>
											{item.name}
										</Highlight>
										<Text fz='xs'>{item.location}</Text>
									</div>
								</div>
							</Combobox.Option>


              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}
