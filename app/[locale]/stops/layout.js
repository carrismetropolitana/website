'use client';

import useSWR from 'swr';
import { useState, useMemo, forwardRef, useEffect } from 'react';
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
  const [selectedStopCode, setSelectedStopCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();
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

  const handleSelectStop = (feature) => {
    // Only do something if feature is set
    if (feature.properties?.code) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = allStopsMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        allStopsMap.setFeatureState({ source: 'all-stops', id: f.id }, { selected: false });
      });
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(feature);
      allStopsMap.setFeatureState({ source: 'all-stops', id: feature.id }, { selected: true });
      // Zoom and center if too far
      if (allStopsMap.getZoom() < 14) allStopsMap.flyTo({ center: feature.geometry.coordinates, duration: 5000, zoom: 16 });
      // Save the current stop code and update the URL
      const newStopCode = feature.properties?.code || '';
      router.replace(`/stops/${newStopCode}`);
      setSelectedStopCode(newStopCode);
    }
  };

  const handleMapClick = (event) => {
    if (event?.features[0]) handleSelectStop(event.features[0]);
  };

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.code) {
      allStopsMap.getCanvas().style.cursor = 'pointer';
    }
  };

  const handleMapMouseLeave = (event) => {
    if (event?.features[0]?.properties?.code) {
      allStopsMap.getCanvas().style.cursor = 'default';
    }
  };

  const handleMapMove = () => {
    if (selectedMapFeature) {
      // Get all currently rendered features and mark all of them as unselected
      const allRenderedFeatures = allStopsMap.queryRenderedFeatures();
      allRenderedFeatures.forEach(function (f) {
        allStopsMap.setFeatureState({ source: 'all-stops', id: f.id }, { selected: false });
      });
      allStopsMap.setFeatureState({ source: 'all-stops', id: selectedMapFeature.id }, { selected: true });
    }
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleGeocoderSearch = () => {
    if (allStopsData && allStopsData.find((stop) => searchQuery === stop.code)) {
      // Select stop if exat match
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
        return { code: stop.code, value: stop.name, description: `${stop.locality}, ${stop.municipality_name}` };
      });
    }
    // Only run if allStopsData changes
  }, [allStopsData]);

  //
  // E. Render components

  const AutoCompleteItem = forwardRef(({ description, value, code, ...others }, ref) => (
    <div ref={ref} {...others} style={{ gap: '5px', padding: '8px' }}>
      <Text size='sm'>{value}</Text>
      <Text size='xs' color='dimmed'>
        {description} ({code})
      </Text>
    </div>
  ));
  AutoCompleteItem.displayName = 'hello';

  return (
    <OneFullColumn
      first={
        <Pannel title='Consulta de Paragens' loading={allStopsLoading} error={allStopsError}>
          <MapToolbar>
            <div>
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
            </div>
            <div style={{ width: '100%' }}>
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
            </div>
          </MapToolbar>

          <Divider />

          <OSMMap id='allStops' mapStyle={mapStyle} onClick={handleMapClick} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave} onMove={handleMapMove} interactiveLayerIds={['all-stops']} height={'50vh'}>
            <Source id='all-stops' type='geojson' data={mapData} generateId>
              <Layer
                id='all-stops'
                type='circle'
                source='all-stops'
                paint={{
                  'circle-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#EE4B2B', '#ffdd01'],
                  'circle-radius': ['interpolate', ['linear', 0.5], ['zoom'], 9, ['case', ['boolean', ['feature-state', 'selected'], false], 5, 1], 26, ['case', ['boolean', ['feature-state', 'selected'], false], 30, 20]],
                  'circle-stroke-width': ['interpolate', ['linear', 0.5], ['zoom'], 9, 0.35, 26, 5],
                  'circle-stroke-color': '#000000',
                }}
              />
            </Source>
          </OSMMap>

          <Divider />

          {children}
        </Pannel>
      }
    />
  );
}
