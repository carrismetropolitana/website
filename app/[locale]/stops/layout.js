'use client';

import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMap, Source, Layer } from 'react-map-gl';
import { IconArrowsMinimize, IconBrandGoogleMaps, IconCircleArrowRightFilled, IconSearch } from '@tabler/icons-react';
import { Tooltip, ActionIcon, SegmentedControl, TextInput, Divider } from '@mantine/core';
import OSMMap from '@/components/OSMMap/OSMMap';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';
import { OneFullColumn } from '@/components/Layouts/Layouts';
import MapToolbar from '@/components/MapToolbar/MapToolbar';

export default function Layout({ children }) {
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

  const handleMapReCenter = () => {
    allStopsMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = allStopsMap.getCenter();
    const zoom = allStopsMap.getZoom();
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`, '_blank', 'noopener,noreferrer');
  };

  const handleMapClick = (event) => {
    if (event?.features[0]?.properties?.code) {
      const newStopCode = event.features[0].properties.code;
      router.replace(`/stops/${newStopCode}`);
    }
  };

  const handleSearchQueryChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handleGeocoderSearch = () => {
    setIsLoadingGeocoder(true);
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

  //
  // E. Render components

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
            <TextInput
              icon={<IconSearch size={18} />}
              rightSection={
                searchQuery && (
                  <ActionIcon color='gray' variant='subtle' size='lg' onClick={handleGeocoderSearch} loading={isLoadingGeocoder}>
                    <IconCircleArrowRightFilled size={20} />
                  </ActionIcon>
                )
              }
              placeholder='Procurar por morada, etc.'
              value={searchQuery}
              onChange={handleSearchQueryChange}
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

          {children}
        </Pannel>
      }
    />
  );
}
