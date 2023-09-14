'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Pannel from '@/components/Pannel/Pannel';
import StopsExplorerToolbar from '@/components/StopsExplorerToolbar/StopsExplorerToolbar';
import StopsExplorerMap from '@/components/StopsExplorerMap/StopsExplorerMap';
import generateUUID from '@/services/generateUUID';
import StopInfo from '@/components/StopInfo/StopInfo';
import StopTimetable from '@/components/StopsExplorerTimetable/StopsExplorerTimetable';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function StopsExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname() || '/';

  const { stopsExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedStopCode, setSelectedStopCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();
  const [selectedPatternCode, setSelectedPatternCode] = useState();
  const [selectedShapeCode, setSelectedShapeCode] = useState();
  const [selectedTripCode, setSelectedTripCode] = useState();
  const [selectedVehicleCode, setSelectedVehicleCode] = useState();

  function updateSearchParam(searchParams, param, value) {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentSearchParams.set(param, value);
    return currentSearchParams;
  }

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData, isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedPatternData } = useSWR(selectedPatternCode && `https://api.carrismetropolitana.pt/patterns/${selectedPatternCode}`);
  const { data: selectedShapeData } = useSWR(selectedShapeCode && `https://api.carrismetropolitana.pt/shapes/${selectedShapeCode}`);
  const { isValidating: stopRealtimeValidating } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}/realtime`, { refreshInterval: 5000 });

  //
  // C. Transform data

  const allStopsMapData = useMemo(() => {
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [stop.lon, stop.lat],
          },
          properties: {
            mapid: `${stop.code}${generateUUID()}`,
            code: stop.code,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon,
          },
        });
      }
    }
    return geoJSON;
  }, [allStopsData]);

  const selectedStopMapData = useMemo(() => {
    if (allStopsData && selectedStopCode) {
      const selectedStopData = allStopsData.find((item) => item.code === selectedStopCode);
      if (selectedStopData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedStopData.lon, selectedStopData.lat],
          },
          properties: {
            code: selectedStopData.code,
          },
        };
      }
      return null;
    }
  }, [allStopsData, selectedStopCode]);

  const selectedShapeMapData = useMemo(() => {
    if (selectedPatternData && selectedShapeData) {
      return {
        ...selectedShapeData.geojson,
        properties: {
          color: selectedPatternData.color,
        },
      };
    }
    return null;
  }, [selectedPatternData, selectedShapeData]);

  const selectedVehicleMapData = useMemo(() => {
    if (allVehiclesData && selectedTripCode) {
      const selectedVehicleData = allVehiclesData.find((item) => item.trip_code === selectedTripCode);
      if (selectedVehicleData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
          },
          properties: {
            code: selectedVehicleData.code,
            speed: selectedVehicleData.speed,
            timestamp: selectedVehicleData.timestamp,
            timeString: new Date(selectedVehicleData.timestamp).toLocaleString(),
            heading: selectedVehicleData.heading,
            trip_code: selectedVehicleData.trip_code,
            pattern_code: selectedVehicleData.pattern_code,
          },
        };
      }
      return null;
    }
  }, [allVehiclesData, selectedTripCode]);

  //
  // D. Handle actions

  const handleMapReCenter = () => {
    stopsExplorerMap.flyTo({ ...OSMMapDefaults.viewport, duration: 2000 });
  };

  const handleOpenInGoogleMaps = () => {
    const center = stopsExplorerMap.getCenter();
    const zoom = stopsExplorerMap.getZoom();
    const zoomMargin = 2; // Compensate the difference between OSM and Google Maps
    window.open(`https://www.google.com/maps/@${center.lat},${center.lng},${zoom + zoomMargin}z`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectStop = useCallback(
    (stopCode) => {
      // Only do something if feature is set
      if (stopCode) {
        // Get all currently rendered features and mark all of them as unselected
        const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.code === stopCode);
        // Set default map zoom and speed levels
        const defaultSpeed = 4000;
        const defaultZoom = 17;
        const defaultZoomMargin = 3;
        // Check if selected stop is within rendered bounds
        const renderedFeatures = stopsExplorerMap.queryRenderedFeatures({ layers: ['all-stops'] });
        const isStopCurrentlyRendered = renderedFeatures.find((item) => item.properties?.code === stopMapFeature.properties?.code);
        // Get map current zoom level
        const currentZoom = stopsExplorerMap.getZoom();
        // If the stop is visible and the zoom is not too far back (plus a little margin)...
        if (isStopCurrentlyRendered && currentZoom + defaultZoomMargin > defaultZoom) {
          // ...then simply ease to it.
          stopsExplorerMap.easeTo({ center: stopMapFeature?.geometry?.coordinates, zoom: currentZoom, duration: defaultSpeed * 0.25 });
        } else {
          // If the zoom is too far, or the desired stop is not visible, then fly to it
          stopsExplorerMap.flyTo({ center: stopMapFeature?.geometry?.coordinates, zoom: defaultZoom, duration: defaultSpeed });
        }

        if (searchParams.get('s') !== stopCode && searchParams?.entries()) {
          const updatedSearchParams = updateSearchParam(searchParams, 's', stopCode);
          router.push(`${pathName}?${updatedSearchParams.toString()}`, { shallow: true, scroll: false });
        }

        // Save the current feature to state and mark it as selected
        setSelectedMapFeature(stopMapFeature);
        // Save the current stop code
        setSelectedStopCode(stopCode);
        // Reset other selected features
        setSelectedTripCode();
        setSelectedPatternCode();
        setSelectedShapeCode();
      }
    },
    [allStopsMapData?.features, pathName, router, searchParams, stopsExplorerMap]
  );

  const handleSelectTrip = (tripCode, patternCode, shapeCode) => {
    // Set state
    setSelectedTripCode(tripCode);
    setSelectedPatternCode(patternCode);
    setSelectedShapeCode(shapeCode);
  };

  useEffect(() => {
    if (searchParams.get('s') && !selectedStopCode && stopsExplorerMap?.getSource('all-stops') !== undefined) {
      handleSelectStop(searchParams.get('s'));
    }
  });

  //
  // E. Render components

  return (
    <Pannel
      title={t('title')}
      loading={allStopsLoading}
      error={allStopsError}
      validating={allVehiclesValidating || stopRealtimeValidating}
      rightSection={
        <>
          {allVehiclesValidating && <div>V</div>}
          {stopRealtimeValidating && <div>SR</div>}
          <div className={styles.betaIcon}>Beta</div>
        </>
      }
    >
      <StopsExplorerToolbar
        selectedMapStyle={selectedMapStyle}
        onSelectMapStyle={setSelectedMapStyle}
        onMapRecenter={handleMapReCenter}
        onOpenInGoogleMaps={handleOpenInGoogleMaps}
        selectedStopCode={selectedStopCode}
        onSelectStopCode={handleSelectStop}
      />
      <Divider />
      <div className={styles.container}>
        <StopsExplorerMap
          allStopsMapData={allStopsMapData}
          selectedStopMapData={selectedStopMapData}
          selectedShapeMapData={selectedShapeMapData}
          selectedVehicleMapData={selectedVehicleMapData}
          selectedMapStyle={selectedMapStyle}
          selectedMapFeature={selectedMapFeature}
          onSelectStopCode={handleSelectStop}
        />
        <div className={styles.sidebar}>
          {selectedStopCode ? (
            <>
              <StopInfo selectedStopCode={selectedStopCode} />
              <Divider />
              <StopTimetable selectedStopCode={selectedStopCode} selectedTripCode={selectedTripCode} onSelectTrip={handleSelectTrip} />
            </>
          ) : (
            <NoDataLabel text={t('no_selection')} />
          )}
        </div>
      </div>
    </Pannel>
  );

  //
}
