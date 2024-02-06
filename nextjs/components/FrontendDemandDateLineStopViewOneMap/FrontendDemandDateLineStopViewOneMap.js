'use client';

/* * */

import useSWR from 'swr';
import { useCallback, useEffect, useMemo } from 'react';
import * as turf from '@turf/turf';
import { useTranslations } from 'next-intl';
import OSMMap from '@/components/OSMMap/OSMMap';
import { Layer, Popup, Source, useMap } from 'react-map-gl/maplibre';
import { useFrontendDemandDateLineStopContext } from '@/contexts/FrontendDemandDateLineStopContext';
import generateUUID from '@/services/generateUUID';

/* * */

const MAP_DEFAULT_OPTIONS = {
  speed: 4000,
  duration: 2000,
  zoom: 17,
  zoomMargin: 3,
  maxZoom: 16,
};

/* * */

export default function FrontendDemandDateLineStopViewOneMap() {
  //

  //
  // A. Setup variables

  const { frontendDemandDateLineStopViewOneMap } = useMap();
  const frontendDemandDateLineStopContext = useFrontendDemandDateLineStopContext();
  const t = useTranslations('FrontendDemandDateLineStopViewOneMap');

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: demandData } = useSWR('https://api.carrismetropolitana.pt/datasets/demand/date-line-stop/viewByDateForEachStop');

  //
  // C. Transform data

  useEffect(() => {
    if (!frontendDemandDateLineStopViewOneMap) return;
    // Load direction arrows
    frontendDemandDateLineStopViewOneMap.loadImage('/icons/shape-arrow-direction.png', (error, image) => {
      if (error) throw error;
      frontendDemandDateLineStopViewOneMap.addImage('shape-arrow-direction', image, { sdf: true });
    });
    // Load vehicle symbol
    frontendDemandDateLineStopViewOneMap.loadImage('/icons/cm-bus-regular.png', (error, image) => {
      if (error) throw error;
      frontendDemandDateLineStopViewOneMap.addImage('cm-bus-regular', image, { sdf: false });
    });
    // Load vehicle symbol
    frontendDemandDateLineStopViewOneMap.loadImage('/icons/cm-bus-delay.png', (error, image) => {
      if (error) throw error;
      frontendDemandDateLineStopViewOneMap.addImage('cm-bus-delay', image, { sdf: false });
    });
    // Load stop selected symbol
    frontendDemandDateLineStopViewOneMap.loadImage('/icons/map-stop-selected.png', (error, image) => {
      if (error) throw error;
      frontendDemandDateLineStopViewOneMap.addImage('stop-selected', image, { sdf: false });
    });
    // Load pin symbol
    frontendDemandDateLineStopViewOneMap.loadImage('/icons/map-pin.png', (error, image) => {
      if (error) throw error;
      frontendDemandDateLineStopViewOneMap.addImage('map-pin', image, { sdf: false });
    });
  }, [frontendDemandDateLineStopViewOneMap]);

  const allStopsMapData = useMemo(() => {
    const geoJSON = { type: 'FeatureCollection', features: [] };
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [stop.lon, stop.lat] },
          properties: {
            mapid: `${stop.id}|${generateUUID()}`,
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

  const demandDateLineStopViewByDateForEachStopMapData = useMemo(() => {
    // Set empty geojson object
    const geojson = {
      type: 'FeatureCollection',
      features: [],
    };
    // Return if data is not yet available
    if (!allStopsData || !demandData || !frontendDemandDateLineStopContext.views.date_string) return geojson;
    // Return if the is no data for selected date
    if (!demandData[frontendDemandDateLineStopContext.views.date_string]) return geojson;
    // If there is data create an array of objects with coordinated and validations
    geojson.features = allStopsData.map((stopData) => {
      return {
        type: 'Feature',
        properties: {
          id: stopData.id,
          validations: demandData[frontendDemandDateLineStopContext.views.date_string][stopData.id] || 0,
          selected_date: frontendDemandDateLineStopContext.views.date_string,
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(stopData.lon), parseFloat(stopData.lat)],
        },
      };
    });
    // Return geojson
    return geojson;
    //
  }, [allStopsData, demandData, frontendDemandDateLineStopContext.views.date_string]);

  //
  // F. Handle actions

  useEffect(() => {
    // Check if map is ready
    if (frontendDemandDateLineStopViewOneMap?.getSource('all-stops') === undefined) return;
    // Check if auto zoom is enabled
    if (!frontendDemandDateLineStopContext.map.auto_zoom) return;
    // Check if there is a selected map feature
    if (frontendDemandDateLineStopContext.map.selected_feature) return;
    // Check if there is a selected stop id
    if (!frontendDemandDateLineStopContext.views.stop?.id) return;
    // Find the corresponding map feature
    const stopMapFeature = allStopsMapData?.features.find((f) => f.properties?.id === frontendDemandDateLineStopContext.views.stop?.id);
    if (!stopMapFeature) return;
    // Center the map and save the feature to state
    moveMap(stopMapFeature.geometry?.coordinates);
    frontendDemandDateLineStopContext.setSelectedFeature(stopMapFeature);
    //
  });

  //
  // E. Helper functions

  const moveMap = useCallback(
    (coordinates) => {
      // Get map current zoom level
      const currentZoom = frontendDemandDateLineStopViewOneMap.getZoom();
      const currentZoomWithMargin = currentZoom + MAP_DEFAULT_OPTIONS.zoomMargin;
      // Check if the given coordinates are inside the currently rendered map bounds
      const currentMapBounds = frontendDemandDateLineStopViewOneMap.getBounds().toArray();
      const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));
      // If the given coordinates are visible and the zoom is not too far back (plus a little margin)...
      if (isInside && currentZoomWithMargin > MAP_DEFAULT_OPTIONS.zoom) {
        // ...then simply ease to it.
        frontendDemandDateLineStopViewOneMap.easeTo({ center: coordinates, zoom: currentZoom, duration: MAP_DEFAULT_OPTIONS.speed * 0.25 });
      } else {
        // If the zoom is too far, or the given coordinates are not visible, then fly to it
        frontendDemandDateLineStopViewOneMap.flyTo({ center: coordinates, zoom: MAP_DEFAULT_OPTIONS.zoom, duration: MAP_DEFAULT_OPTIONS.speed });
      }
    },
    [frontendDemandDateLineStopViewOneMap]
  );

  const handleMapMouseEnter = (event) => {
    if (event?.features[0]?.properties?.id) {
      frontendDemandDateLineStopViewOneMap.getCanvas().style.cursor = 'pointer';
      frontendDemandDateLineStopContext.setPopupData(event.features[0].properties.id);
    }
  };

  const handleMapMouseLeave = () => {
    frontendDemandDateLineStopViewOneMap.getCanvas().style.cursor = 'default';
    frontendDemandDateLineStopContext.clearPopupData(null);
  };

  //
  // D. Render components

  return (
    <div style={{ height: 500, display: 'flex' }}>
      <OSMMap id="frontendDemandDateLineStopViewOneMap" mapStyle={frontendDemandDateLineStopContext.map.style} interactiveLayerIds={['validations-points']} onMouseEnter={handleMapMouseEnter} onMouseLeave={handleMapMouseLeave}>
        {frontendDemandDateLineStopContext.map.selected_feature && (
          <Popup latitude={frontendDemandDateLineStopContext.map.selected_feature.geometry.coordinates[1]} longitude={frontendDemandDateLineStopContext.map.selected_feature.geometry.coordinates[0]} closeButton={false} closeOnClick={false}>
            oisiuhdiuh
          </Popup>
        )}
        {demandDateLineStopViewByDateForEachStopMapData && (
          <Source id="validations" type="geojson" data={demandDateLineStopViewByDateForEachStopMapData} generateId={false} promoteId={'mapid'}>
            <Layer
              id="validations-heatmap"
              type="heatmap"
              source="validations"
              paint={{
                'heatmap-weight': ['interpolate', ['linear'], ['get', 'validations'], 10, 0, 2000, 1],
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 10],
                'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(33,102,172,0)', 0.01, 'rgb(255,0,0)', 0.4, 'rgb(253,219,199)', 0.8, 'rgb(239,138,98)', 1, 'rgb(178,24,43)'],
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
                'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 1, 15, 0],
              }}
            />
            <Layer
              beforeId="validations-heatmap"
              id="validations-points"
              type="circle"
              source="validations"
              paint={{
                //   'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, ['interpolate', ['linear'], ['get', 'validations'], 0, 1, 2000, 5], 16, ['interpolate', ['linear'], ['get', 'validations'], 0, 1, 2000, 15]],
                'circle-radius': ['interpolate', ['linear'], ['get', 'validations'], 0, 5, 2000, 25],
                'circle-color': ['interpolate', ['linear'], ['get', 'validations'], 1, 'rgba(33,102,172,0)', 2, 'rgb(103,169,207)', 3, 'rgb(209,229,240)', 4, 'rgb(253,219,199)', 5, 'rgb(239,138,98)', 6, 'rgb(178,24,43)'],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0, 11, ['interpolate', ['linear'], ['get', 'validations'], 0, 0, 1, 1]],
              }}
            />
          </Source>
        )}
      </OSMMap>
    </div>
  );

  //
}
