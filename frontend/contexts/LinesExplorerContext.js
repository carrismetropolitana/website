'use client';

/* * */

import useSWR from 'swr';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import parseDateToString from '@/services/parseDateToString';

/* * */

// 1.
// SETUP INITIAL STATE

const initialMapState = {
  style: 'map',
  auto_zoom: null,
};

const initialEntitiesState = {
  //
  municipality: null,
  //
  date: null,
  //
  line: null,
  pattern: null,
  //
  stop: null,
  vehicle_id: null,
  trip_id: null,
};

/* * */

// 2.
// CREATE CONTEXTS

const LinesExplorerContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useLinesExplorerContext() {
  return useContext(LinesExplorerContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function LinesExplorerContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

  //
  // B. Fetch data

  const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

  //
  // C. Supporting functions

  const updateWindowUrl = (lineId = 'all', lineName = 'Carris Metropolitana') => {
    let newUrl = `/lines/${lineId}`;
    // TODO:
    // Refactor to correctly parse the location path
    if (window.location.pathname.includes('mupi')) newUrl = `/mupi${newUrl}`;
    // :TODO
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    document.title = lineName;
  };

  //
  // B. Setup actions

  const selectMunicipality = useCallback(
    (municipalityId) => {
      const foundMunicipality = allMunicipalitiesData.find((item) => item.id === municipalityId);
      if (foundMunicipality) {
        setEntitiesState((prev) => ({ ...prev, municipality: foundMunicipality }));
      }
    },
    [allMunicipalitiesData]
  );

  const clearSelectedMunicipality = useCallback(() => {
    setEntitiesState((prev) => ({ ...prev, municipality: null }));
  }, []);

  // ---------

  const selectLine = useCallback(
    (lineId) => {
      const foundLine = allLinesData.find((item) => item.id === lineId);
      if (foundLine) {
        setEntitiesState((prev) => ({ ...prev, line: foundLine, pattern: null, stop: null }));
        updateWindowUrl(lineId, foundLine.long_name);
      }
    },
    [allLinesData]
  );

  const clearSelectedLine = useCallback(() => {
    setEntitiesState((prev) => ({ ...initialEntitiesState, municipality: prev.municipality }));
    updateWindowUrl();
  }, []);

  // ---------

  const selectDate = useCallback((date) => {
    if (!date) return;
    setEntitiesState((prev) => ({ ...prev, date: date, date_string: parseDateToString(date) }));
  }, []);

  const clearSelectedDate = useCallback(() => {
    setEntitiesState((prev) => ({ ...prev, date: null, date_string: null }));
  }, []);

  // ---------

  const selectPattern = useCallback((patternData) => {
    setEntitiesState((prev) => ({ ...prev, pattern: patternData, stop: null }));
  }, []);

  const clearSelectedPattern = useCallback(() => {
    setEntitiesState((prev) => ({ ...prev, pattern: null }));
  }, []);

  // ---------

  const selectStop = useCallback((stopData) => {
    setEntitiesState((prev) => ({ ...prev, stop: stopData }));
  }, []);

  const clearSelectedStop = useCallback(() => {
    setEntitiesState((prev) => ({ ...prev, stop: null }));
  }, []);

  // ---------

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
      //
      selectMunicipality,
      clearSelectedMunicipality,
      //
      selectLine,
      clearSelectedLine,
      //
      selectDate,
      clearSelectedDate,
      //
      selectPattern,
      clearSelectedPattern,
      //
      selectStop,
      clearSelectedStop,
      //
    }),
    [mapState, updateMapState, entitiesState, updateEntitiesState, selectMunicipality, clearSelectedMunicipality, selectLine, clearSelectedLine, selectDate, clearSelectedDate, selectPattern, clearSelectedPattern, selectStop, clearSelectedStop]
  );

  //
  // D. Return provider

  return <LinesExplorerContext.Provider value={contextObject}>{children}</LinesExplorerContext.Provider>;

  //
}
