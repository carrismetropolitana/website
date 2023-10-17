'use client';

import useSWR from 'swr';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// A.
// SETUP INITIAL STATE

const initialMapState = {
  style: 'map',
  auto_zoom: null,
  selected_coordinates: null,
  selected_feature: null,
};

const initialEntitiesState = {
  pattern_id: null,
  shape_id: null,
  vehicle_id: null,
  trip_id: null,
  //
  stop: null,
  trip: null,
  pattern: null,
  shape: null,
  vehicle: null,
};

// B.
// CREATE CONTEXTS

const StopsExplorerContext = createContext(null);

// C.
// SETUP CUSTOM HOOKS

export function useStopsExplorerContext() {
  return useContext(StopsExplorerContext);
}

// D.
// SETUP PROVIDER

export function StopsExplorerContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');

  //
  // C. Supporting functions

  const updateWindowUrl = (stopId = 'all', stopName = 'Carris Metropolitana') => {
    const newUrl = `/stops/${stopId}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    document.title = stopName;
  };

  //
  // D. Setup actions

  const updateMapState = useCallback(
    (newMapState, reset = false) => {
      if (reset) setMapState({ ...initialMapState, ...newMapState });
      else setMapState({ ...mapState, ...newMapState });
    },
    [mapState]
  );

  const updateEntities = useCallback(
    (newEntitiesState, reset = false) => {
      if (reset) setEntitiesState({ ...initialEntitiesState, ...newEntitiesState });
      else setEntitiesState({ ...entitiesState, ...newEntitiesState });
    },
    [entitiesState]
  );

  // --------

  const setSelectedCoordinates = useCallback((newCoordinates) => {
    setEntitiesState(initialEntitiesState);
    setMapState((prev) => ({ ...prev, selected_coordinates: newCoordinates, selected_feature: null }));
  }, []);

  const setSelectedFeature = useCallback((newFeature) => {
    setMapState((prev) => ({ ...prev, selected_feature: newFeature, selected_coordinates: null }));
  }, []);

  const disableAutoZoom = useCallback(() => {
    setMapState((prev) => ({ ...prev, auto_zoom: false }));
  }, []);

  // --------

  const selectStop = useCallback(
    (stopId) => {
      const foundStop = allStopsData.find((item) => item.id === stopId);
      if (foundStop) {
        setMapState((prev) => ({ ...prev, auto_zoom: true, selected_feature: null, selected_coordinates: null }));
        setEntitiesState({ ...initialEntitiesState, stop: foundStop });
        updateWindowUrl(stopId, foundStop.name);
      }
    },
    [allStopsData]
  );

  const clearSelectedStop = useCallback(() => {
    setEntitiesState(initialEntitiesState);
    updateWindowUrl();
  }, []);

  // --------

  const selectTrip = useCallback((tripData) => {
    setEntitiesState((prev) => ({ ...prev, trip: tripData }));
  }, []);

  const clearSelectedTrip = useCallback(() => {
    setEntitiesState((prev) => ({ ...initialEntitiesState, stop: prev.stop }));
  }, []);

  //
  // E. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      map: mapState,
      updateMap: updateMapState,
      setSelectedCoordinates,
      setSelectedFeature,
      disableAutoZoom,
      //
      entities: entitiesState,
      updateEntities,
      //
      selectStop,
      clearSelectedStop,
      //
      selectTrip,
      clearSelectedTrip,
    }),
    [mapState, updateMapState, setSelectedCoordinates, setSelectedFeature, disableAutoZoom, entitiesState, updateEntities, selectStop, clearSelectedStop, selectTrip, clearSelectedTrip]
  );

  //
  // D. Return provider

  return <StopsExplorerContext.Provider value={contextObject}>{children}</StopsExplorerContext.Provider>;

  //
}
