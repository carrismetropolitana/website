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

export default function StopsExplorer({ urlStopId }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');

  const searchParams = useSearchParams();

  const { stopsExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedStopId, setSelectedStopId] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();
  const [selectedPatternId, setSelectedPatternId] = useState();
  const [selectedShapeId, setSelectedShapeId] = useState();
  const [selectedTripId, setSelectedTripId] = useState();
  const [selectedVehicleId, setSelectedVehicleId] = useState();

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData, isValidating: allVehiclesValidating } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });
  const { data: selectedPatternData } = useSWR(selectedPatternId && `https://api.carrismetropolitana.pt/patterns/${selectedPatternId}`);
  const { data: selectedShapeData } = useSWR(selectedShapeId && `https://api.carrismetropolitana.pt/shapes/${selectedShapeId}`);
  const { isValidating: stopRealtimeValidating } = useSWR(selectedStopId && `https://api.carrismetropolitana.pt/stops/${selectedStopId}/realtime`, { refreshInterval: 5000 });

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
            mapid: `${stop.id}${generateUUID()}`,
            id: stop.id,
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
    if (allStopsData && selectedStopId) {
      const selectedStopData = allStopsData.find((item) => item.id === selectedStopId);
      if (selectedStopData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedStopData.lon, selectedStopData.lat],
          },
          properties: {
            id: selectedStopData.id,
          },
        };
      }
      return null;
    }
  }, [allStopsData, selectedStopId]);

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
    if (allVehiclesData && selectedTripId) {
      const selectedVehicleData = allVehiclesData.find((item) => item.trip_id === selectedTripId);
      if (selectedVehicleData) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [selectedVehicleData.lon, selectedVehicleData.lat],
          },
          properties: {
            id: selectedVehicleData.id,
            speed: selectedVehicleData.speed,
            timestamp: selectedVehicleData.timestamp,
            timeString: new Date(selectedVehicleData.timestamp).toLocaleString(),
            heading: selectedVehicleData.heading,
            trip_id: selectedVehicleData.trip_id,
            pattern_id: selectedVehicleData.pattern_id,
          },
        };
      }
      return null;
    }
  }, [allVehiclesData, selectedTripId]);

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
    (stopId) => {
      // Only do something if feature is set
      if (stopId) {
        // Get all currently rendered features and mark all of them as unselected
        const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.id === stopId);
        // Set default map zoom and speed levels
        const defaultSpeed = 4000;
        const defaultZoom = 17;
        const defaultZoomMargin = 3;
        // Check if selected stop is within rendered bounds
        const renderedFeatures = stopsExplorerMap.queryRenderedFeatures({ layers: ['all-stops'] });
        const isStopCurrentlyRendered = renderedFeatures.find((item) => item.properties?.id === stopMapFeature.properties?.id);
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

        if (urlStopId !== stopId) {
          window.history.replaceState({ ...window.history.state, as: `/stops/${stopId}`, url: `/stops/${stopId}` }, '', `/stops/${stopId}`);
        }

        // Save the current feature to state and mark it as selected
        setSelectedMapFeature(stopMapFeature);
        // Save the current stop id
        setSelectedStopId(stopId);
        // Reset other selected features
        setSelectedTripId();
        setSelectedPatternId();
        setSelectedShapeId();
      }
    },
    [allStopsMapData?.features, stopsExplorerMap, urlStopId]
  );

  const handleSelectTrip = (tripId, patternId, shapeId) => {
    // Set state
    setSelectedTripId(tripId);
    setSelectedPatternId(patternId);
    setSelectedShapeId(shapeId);
  };

  useEffect(() => {
    if (urlStopId && !selectedStopId && stopsExplorerMap?.getSource('all-stops') !== undefined) {
      handleSelectStop(urlStopId);
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
          {allVehiclesValidating && <div className={styles.validating}>V</div>}
          {stopRealtimeValidating && <div className={styles.validating}>SR</div>}
          <div className={styles.betaIcon}>Beta</div>
        </>
      }
    >
      <StopsExplorerToolbar selectedMapStyle={selectedMapStyle} onSelectMapStyle={setSelectedMapStyle} onMapRecenter={handleMapReCenter} onOpenInGoogleMaps={handleOpenInGoogleMaps} selectedStopId={selectedStopId} onSelectStopId={handleSelectStop} />
      <Divider />
      <div className={styles.container}>
        <StopsExplorerMap
          allStopsMapData={allStopsMapData}
          selectedStopMapData={selectedStopMapData}
          selectedShapeMapData={selectedShapeMapData}
          selectedVehicleMapData={selectedVehicleMapData}
          selectedMapStyle={selectedMapStyle}
          selectedMapFeature={selectedMapFeature}
          onSelectStopId={handleSelectStop}
        />
        <div className={styles.sidebar}>
          {selectedStopId ? (
            <>
              <StopInfo selectedStopId={selectedStopId} />
              <Divider />
              <StopTimetable selectedStopId={selectedStopId} selectedTripId={selectedTripId} onSelectTrip={handleSelectTrip} />
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
