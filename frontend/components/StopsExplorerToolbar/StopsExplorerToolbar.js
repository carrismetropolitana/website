'use client';

import useSWR from 'swr';
import useSearch from '@/hooks/useSearch';
import styles from './StopsExplorerToolbar.module.css';
import { useState, useMemo, forwardRef } from 'react';
import { IconArrowsMinimize, IconBrandGoogleMaps, IconSearch } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl, Autocomplete, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function StopsExplorerToolbar({ selectedMapStyle, onSelectMapStyle, onMapRecenter, onOpenInGoogleMaps, selectedStopCode, onSelectStopCode }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorerToolbar');
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
          value: `${stop.name} [${stop.code}]`,
          name: stop.name,
          description: `${stop.locality}, ${stop.municipality_name}`,
          locality: stop.locality,
          municipality_name: stop.municipality_name,
          latitude: stop.latitude,
          longitude: stop.longitude,
        };
      });
    }
  }, [allStopsData]);

  //
  // D. Search

  const allStopsDataFiltered = useSearch(searchQuery, allStopsDataFormatted, { keys: ['code', 'name', 'tts_name', 'locality', 'municipality_name'], regexReplace: /[^a-zA-Z0-9]/g });

  //
  // E. Handle actions

  const handleAutocompleteSelect = (item) => {
    onSelectStopCode(item.code);
  };

  //
  // F. Custom components

  const AutoCompleteItem = forwardRef(({ code, name, description, ...others }, ref) => (
    <div ref={ref} {...others} style={{ gap: '5px', padding: '8px' }}>
      <Text size="sm">
        {selectedStopCode === code ? '•> ' : ''}
        {name}
      </Text>
      <Text size="xs" color="dimmed">
        {description} ({code})
      </Text>
    </div>
  ));
  AutoCompleteItem.displayName = 'hello';

  //
  // G. Render components

  return (
    <div className={styles.container}>
      <SegmentedControl
        aria-label={t('map_style.label')}
        value={selectedMapStyle}
        onChange={onSelectMapStyle}
        data={[
          { value: 'map', label: t('map_style.options.map') },
          { value: 'satellite', label: t('map_style.options.satellite') },
        ]}
      />

      <Tooltip label={t('recenter_map.label')} position="bottom" withArrow>
        <ActionIcon color="gray" variant="light" size="lg" onClick={onMapRecenter}>
          <IconArrowsMinimize size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('open_gmaps.label')} position="bottom" withArrow>
        <ActionIcon color="gray" variant="light" size="lg" onClick={onOpenInGoogleMaps}>
          <IconBrandGoogleMaps size={20} />
        </ActionIcon>
      </Tooltip>

      <div className={styles.fullWidth}>
        <Autocomplete
          icon={<IconSearch size={18} />}
          itemComponent={AutoCompleteItem}
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={setSearchQuery}
          onItemSubmit={handleAutocompleteSelect}
          data={allStopsDataFiltered}
          filter={() => true}
          size="md"
          w="100%"
        />
      </div>
    </div>
  );
}
