'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// A.
// SETUP INITIAL STATE

const initialMapState = {
  style: 'map',
  auto_zoom: null,
};

const initialEntitiesState = {
  line_id: null,
  //
  stop_id: null,
  pattern_id: null,
  shape_id: null,
  vehicle_id: null,
  trip_id: null,
};

// B.
// CREATE CONTEXTS

const LinesExplorerContext = createContext(null);

// C.
// SETUP CUSTOM HOOKS

export function useLinesExplorerContext() {
  return useContext(LinesExplorerContext);
}

// D.
// SETUP PROVIDER

export function LinesExplorerContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

  //
  // B. Setup actions

  const updateMapState = useCallback(
    (newMapState, reset = false) => {
      if (reset) setMapState({ ...initialMapState, ...newMapState });
      else setMapState({ ...mapState, ...newMapState });
    },
    [mapState]
  );

  const updateEntitiesState = useCallback(
    (newEntitiesState, reset = false) => {
      if (reset) setEntitiesState({ ...initialEntitiesState, ...newEntitiesState });
      else setEntitiesState({ ...entitiesState, ...newEntitiesState });
    },
    [entitiesState]
  );

  //
  // C. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      map: mapState,
      updateMap: updateMapState,
      //
      entities: entitiesState,
      updateEntities: updateEntitiesState,
    }),
    [mapState, updateMapState, entitiesState, updateEntitiesState]
  );

  //
  // D. Return provider

  return <LinesExplorerContext.Provider value={contextObject}>{children}</LinesExplorerContext.Provider>;

  //
}
