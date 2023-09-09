'use client';

import styles from './StopsExplorer.module.css';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import OSMMapDefaults from '@/components/OSMMap/OSMMap.config';
import Pannel from '@/components/Pannel/Pannel';
import StopsExplorerToolbar from '../StopsExplorerToolbar/StopsExplorerToolbar';
import StopsExplorerMap from '../StopsExplorerMap/StopsExplorerMap';
import generateUUID from '@/services/generateUUID';
import StopInfo from '../StopInfo/StopInfo';
import StopTimetable from '../StopsExplorerTimetable/StopsExplorerTimetable';
import NoDataLabel from '../NoDataLabel/NoDataLabel';

export default function StopsExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('StopsExplorer');

  const { stopsExplorerMap } = useMap();

  const [selectedMapStyle, setSelectedMapStyle] = useState('map');

  const [selectedStopCode, setSelectedStopCode] = useState();
  const [selectedMapFeature, setSelectedMapFeature] = useState();
  const [selectedPatternCode, setSelectedPatternCode] = useState();
  const [selectedShapeCode, setSelectedShapeCode] = useState();
  const [selectedTripCode, setSelectedTripCode] = useState();
  const [selectedVehicleCode, setSelectedVehicleCode] = useState();

  //
  // B. Fetch data

  const { data: allStopsData, error: allStopsError, isLoading: allStopsLoading } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData, error: allVehiclesError, isLoading: allVehiclesLoading } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 1000 });
  const { data: selectedStopData } = useSWR(selectedStopCode && `https://api.carrismetropolitana.pt/stops/${selectedStopCode}`);
  const { data: selectedPatternData } = useSWR(selectedPatternCode && `https://api.carrismetropolitana.pt/patterns/${selectedPatternCode}`);
  const { data: selectedShapeData } = useSWR(selectedShapeCode && `https://api.carrismetropolitana.pt/shapes/${selectedShapeCode}`);

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

  const selectedShapeMapData = useMemo(() => {
    if (selectedPatternData && selectedShapeData) {
      return {
        ...selectedShapeData.geojson,
        properties: {
          color: selectedPatternData.color,
        },
      };
    }
  }, [selectedPatternData, selectedShapeData]);

  const selectedVehicleMapData = useMemo(() => {
    if (allVehiclesData && selectedVehicleCode) {
      const selectedVehicleData = allVehiclesData.find((item) => item.code === selectedVehicleCode);
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
            heading: selectedVehicleData.heading,
            trip_code: selectedVehicleData.trip_code,
            pattern_code: selectedVehicleData.pattern_code,
          },
        };
      }
    }
  }, [allVehiclesData, selectedVehicleCode]);

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

  const handleSelectStop = (stopCode) => {
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
      // Save the current feature to state and mark it as selected
      setSelectedMapFeature(stopMapFeature);
      // Save the current stop code
      setSelectedStopCode(stopCode);
      // Reset other selected features
      setSelectedTripCode();
      setSelectedPatternCode();
      setSelectedShapeCode();
    }
  };

  const handleSelectTrip = (tripCode, patternCode, shapeCode, vehicleCode) => {
    setSelectedTripCode(tripCode);
    setSelectedPatternCode(patternCode);
    setSelectedShapeCode(shapeCode);
    setSelectedVehicleCode(vehicleCode);
  };

  //
  // E. Render components

  return (
    <Pannel title={t('title')} loading={allStopsLoading} error={allStopsError}>
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
          selectedShapeMapData={selectedShapeMapData}
          selectedVehicleMapData={selectedVehicleMapData}
          selectedMapStyle={selectedMapStyle}
          selectedMapFeature={selectedMapFeature}
          onSelectStopCode={handleSelectStop}
          selectedShapeCode={selectedShapeCode}
          selectedPatternCode={selectedPatternCode}
          selectedVehicleCode={selectedVehicleCode}
        />
        <div className={styles.sidebar}>
          {selectedStopCode ? (
            <>
              <StopInfo selectedStopCode={selectedStopCode} />
              <Divider />
              <StopTimetable selectedStopCode={selectedStopCode} selectedTripCode={selectedTripCode} onSelectTrip={handleSelectTrip} />
            </>
          ) : (
            <NoDataLabel />
          )}
        </div>
      </div>
    </Pannel>
  );
}
