'use client';

import useSWR from 'swr';
import { useState, useMemo, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMap, Source, Layer } from 'react-map-gl';
import { IconArrowsMinimize, IconBrandGoogleMaps, IconCircleArrowRightFilled, IconSearch } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl, Divider, Autocomplete, Group, Avatar, Text } from '@mantine/core';
import OSMMap from '@/components/OSMMap/OSMMap';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import { OneFullColumn } from '@/components/Layouts/Layouts';
import MapToolbar from '@/components/MapToolbar/MapToolbar';

export default function Page({ children }) {
  //

  //
  // A. Setup variables

  const { allStopsMap } = useMap();
  const [mapStyle, setMapStyle] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [isLoadingGeocoder, setIsLoadingGeocoder] = useState(false);
  const t = useTranslations('stops');

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://schedules-test.carrismetropolitana.pt/api/stops');

  //
  // D. Handle actions

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    allStopsMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = allStopsMap.getCenter();
    const zoom = allStopsMap.getZoom();
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectStop = (newStopCode) => {
    router.replace(`/stops/${newStopCode}`);
  };

  const handleMapClick = (event) => {
    if (event?.features[0]?.properties?.code) {
      handleSelectStop(event.features[0].properties.code);
    }
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleGeocoderSearch = () => {
    if (allStopsData && allStopsData.find((stop) => searchQuery === stop.code)) {
      // Do geocoder search
      handleSelectStop(searchQuery);
    } else {
      // Do geocoder search
      setIsLoadingGeocoder(true);
    }
  };

  //
  // D. Transform data

  const mapData = useMemo(() => {
    // Create a GeoJSON object
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

    // Loop through each stop in the collection and setup the feature to the GeoJSON object.
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(stop.longitude), parseFloat(stop.latitude)],
          },
          properties: {
            code: stop.code,
            name: stop.name,
            latitude: stop.latitude,
            longitude: stop.longitude,
          },
        });
      }
    }
    // Return parsed data
    return geoJSON;
    // Only run if allStopsData changes
  }, [allStopsData]);

  const autocompleteData = useMemo(() => {
    if (allStopsData) {
      return allStopsData.map((stop) => {
        return { code: stop.code, value: `${stop.code} - ${stop.name}`, description: `${stop.locality}, ${stop.municipality_name}` };
      });
    }
    // Only run if allStopsData changes
  }, [allStopsData]);

  //
  // E. Render components

  const AutoCompleteItem = forwardRef(({ description, value, code, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
          <Text size='xs' color='dimmed'>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ));
  AutoCompleteItem.displayName = 'hello';

  return (
    <OneFullColumn
      first={
        <Pannel title='Consulta de Paragens' loading={allStopsLoading} error={allStopsError}>
          <MapToolbar>
            <div>
              <SegmentedControl
                value={mapStyle}
                onChange={setMapStyle}
                data={[
                  { label: 'Map', value: 'map' },
                  { label: 'Satellite', value: 'satellite' },
                ]}
              />
            </div>
            <Tooltip label={t('operations.recenter.title')} position='bottom' withArrow>
              <ActionIcon color='gray' variant='light' size='lg' onClick={handleMapReCenter}>
                <IconArrowsMinimize size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={t('operations.gmaps.title')} position='bottom' withArrow>
              <ActionIcon color='gray' variant='light' size='lg' onClick={handleOpenInGoogleMaps}>
                <IconBrandGoogleMaps size={20} />
              </ActionIcon>
            </Tooltip>
            <Autocomplete
              icon={<IconSearch size={18} />}
              rightSection={
                searchQuery && (
                  <ActionIcon color='gray' variant='subtle' size='lg' onClick={handleGeocoderSearch} loading={isLoadingGeocoder}>
                    <IconCircleArrowRightFilled size={20} />
                  </ActionIcon>
                )
              }
              itemComponent={AutoCompleteItem}
              onItemSubmit={(item) => handleSelectStop(item.code)}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={'A pesquisa está muito básica mas funciona :)'}
              data={autocompleteData}
              filter={(value, item) => item.value.toLowerCase().includes(value.toLowerCase().trim()) || item.description.toLowerCase().includes(value.toLowerCase().trim()) || item.code.toLowerCase().includes(value.toLowerCase().trim())}
              size='md'
              w='100%'
            />
          </MapToolbar>

          <Divider />

          <OSMMap id='allStops' mapStyle={mapStyle} onClick={handleMapClick} interactiveLayerIds={['all-stops']} height={'50vh'}>
            <Source id='all-stops' type='geojson' data={mapData}>
              <Layer id='all-stops' type='circle' source='all-stops' paint={{ 'circle-color': '#ffdd01', 'circle-radius': 6, 'circle-stroke-width': 2, 'circle-stroke-color': '#000000' }} />
            </Source>
          </OSMMap>

          <Divider />

          {children}
        </Pannel>
      }
    />
  );
}
