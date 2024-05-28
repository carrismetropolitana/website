'use client';

/* * */

import useSearch from '@/hooks/useSearch'
// import useSWR from 'swr';
import { ActionIcon, Combobox, Group, TextInput, useCombobox } from '@mantine/core'
// import { useFrontendLinesContext } from '@/contexts/FrontendAlertsContext';
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch, IconSelector, IconX } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

import LineDisplay from '../LineDisplay/LineDisplay'
import styles from './FrontendAlertsSearch.module.css'

/* * */

export default function FrontendLinesToolbarSelectLine({ allLinesData, ctx }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLinesToolbarSelectLine');
  const comboboxStore = useCombobox();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  //
  // B. Fetch data

  //
  // C. Transform data

  const allLinesDataFormatted = useMemo(() => {
    if (allLinesData) {
      let allLinesDataFiltered = allLinesData;
      if (ctx.entities.municipality) {
        allLinesDataFiltered = allLinesDataFiltered.filter(line => new Set(line.municipalities).has(ctx.entities.municipality?.id));
      }
      if (ctx.entities.locality) {
        allLinesDataFiltered = allLinesDataFiltered.filter(line => new Set(line.localities).has(ctx.entities.locality?.locality));
      }
      return allLinesDataFiltered.map((line) => {
        return {
          color: line.color,
          id: line.id,
          localities: line.localities.join(', '),
          long_name: line.long_name,
          short_name: line.short_name,
          text_color: line.text_color,
        }
      });
    }
  }, [allLinesData, ctx.entities.locality, ctx.entities.municipality]);

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
    ctx.clearSelectedLine();
    comboboxStore.openDropdown();
  };

  const handleSearchQueryChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value);
    comboboxStore.updateSelectedOptionIndex();
    comboboxStore.selectFirstOption();
    comboboxStore.openDropdown();
  };

  const handleSelectLine = (chosenSelectItemValue) => {
    ctx.selectLine(chosenSelectItemValue);
    comboboxStore.closeDropdown();
  };

  //
  // F. Render components

  return (
    <div className={styles.container}>
      <Combobox onOptionSubmit={handleSelectLine} store={comboboxStore}>
        <Combobox.Target>
          {ctx.entities.line?.id && !comboboxStore.dropdownOpened ?
						<Group className={styles.comboboxTarget} onClick={handleClickSearchField}>
  <IconSearch size={20} />
  <LineDisplay color={ctx.entities.line?.color} long_name={ctx.entities.line?.long_name} short_name={ctx.entities.line?.short_name} text_color={ctx.entities.line?.text_color} />
  <ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
    <IconX size={20} />
  </ActionIcon>
        </Group> :
						<TextInput
    className={styles.textInput}
    autoComplete="off"
    type="search"
    aria-label={t('label')}
    placeholder={t('placeholder')}
    value={searchQuery}
    leftSection={<IconSearch size={20} />}
    rightSection={
								searchQuery ?
									<ActionIcon color="gray" onClick={handleClearSearchField} size="md" variant="subtle">
  <IconX size={20} />
           </ActionIcon> :
									<IconSelector size={18} />

							}
    onChange={handleSearchQueryChange}
    onClick={handleClickSearchField}
    onFocus={handleClickSearchField}
    onBlur={handleExitSearchField}
						  />}
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
            {allLinesDataFilteredBySearchQuery.length === 0 ?
							<Combobox.Empty>{t('no_results')}</Combobox.Empty> :
							allLinesDataFilteredBySearchQuery.map(item => 
<Combobox.Option key={item.id} value={item.id} className={item.id === ctx.entities.line?.id && styles.selected}>
								<div className={styles.comboboxOption}>
									<LineDisplay short_name={item.short_name} long_name={item.long_name} color={item.color} text_color={item.text_color} />
								</div>
							</Combobox.Option>


              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}
