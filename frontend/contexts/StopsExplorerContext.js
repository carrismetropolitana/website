'use client';

import useSWR from 'swr';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// A.
// SETUP INITIAL STATE

const initialMapState = {
  style: 'map',
  auto_zoom: null,
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
  // B. Setup actions

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

  const selectStop = useCallback(
    (stopId) => {
      const foundStop = allStopsData.find((item) => item.id === stopId);
      if (foundStop) {
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
  // C. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      map: mapState,
      updateMap: updateMapState,
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
    [mapState, updateMapState, entitiesState, updateEntities, selectStop, clearSelectedStop, selectTrip, clearSelectedTrip]
  );

  //
  // D. Return provider

  return <StopsExplorerContext.Provider value={contextObject}>{children}</StopsExplorerContext.Provider>;

  //
}
