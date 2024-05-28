'use client';

/* * */

import parseDateToString from '@/services/parseDateToString'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'

/* * */

// 1.
// SETUP INITIAL STATE

const initialMapState = {
  auto_zoom: true,
  style: 'map',
};

const initialEntitiesState = {
  //
  date: null,
  //
  line: null,
  locality: null,
  //
  municipality: null,
  pattern: null,
  route: null,
  //
  stop: null,
  stop_sequence: null,
  trip_id: null,
  vehicle_id: null,
};

/* * */

// 2.
// CREATE CONTEXTS

const FrontendLinesContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useFrontendLinesContext() {
  return useContext(FrontendLinesContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function FrontendLinesContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

  //
  // B. Fetch data

  const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');

  //
  // C. Supporting functions

  const updateWindowUrl = (lineId = 'all', lineShortName = 'Horários', lineLongName = 'Carris Metropolitana') => {
    let newUrl = `/lines/${lineId}`;
    // TODO:
    // Refactor to correctly parse the location path
    if (window.location.pathname.includes('mupi')) newUrl = `/mupi${newUrl}`;
    // :TODO
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    document.title = `${lineShortName} - ${lineLongName}`;
  };

  //
  // B. Setup actions

  const selectMunicipality = useCallback((municipalityData) => {
    setEntitiesState(prev => ({ ...prev, municipality: municipalityData }));
  }, []);

  const clearSelectedMunicipality = useCallback(() => {
    setEntitiesState(prev => ({ ...prev, municipality: null }));
  }, []);

  // ---------

  const selectLocality = useCallback((localityData) => {
    setEntitiesState(prev => ({ ...prev, locality: localityData }));
  }, []);

  const clearSelectedLocality = useCallback(() => {
    setEntitiesState(prev => ({ ...prev, locality: null }));
  }, []);

  // ---------

  const selectLine = useCallback(
    (lineId) => {
      const foundLine = allLinesData.find(item => item.id === lineId);
      if (foundLine) {
        setEntitiesState(prev => ({ ...prev, line: foundLine, pattern: null, stop: null }));
        updateWindowUrl(lineId, foundLine.short_name, foundLine.long_name);
      }
    },
    [allLinesData],
  )

  const clearSelectedLine = useCallback(() => {
    setEntitiesState(prev => ({ ...initialEntitiesState, municipality: prev.municipality }));
    updateWindowUrl();
  }, []);

  // ---------

  const selectDate = useCallback((date) => {
    if (!date) return;
    setEntitiesState(prev => ({ ...prev, date: date, date_string: parseDateToString(date) }));
  }, []);

  const clearSelectedDate = useCallback(() => {
    setEntitiesState(prev => ({ ...prev, date: null, date_string: null }));
  }, []);

  // ---------

  const selectPattern = useCallback((routeData, patternData) => {
    setEntitiesState(prev => ({ ...prev, pattern: patternData, route: routeData, stop: patternData.path[0]?.stop, stop_sequence: patternData.path[0]?.stop_sequence }));
    setMapState(prev => ({ ...prev, auto_zoom: true }));
  }, []);

  const clearSelectedPattern = useCallback(() => {
    setEntitiesState(prev => ({ ...prev, pattern: null, route: null, stop: null }));
  }, []);

  // ---------

  const selectStop = useCallback((stopData, stopSequence) => {
    setEntitiesState(prev => ({ ...prev, stop: stopData, stop_sequence: stopSequence }));
    setMapState(prev => ({ ...prev, auto_zoom: false }));
  }, []);

  const clearSelectedStop = useCallback(() => {
    setEntitiesState(prev => ({ ...prev, stop: null, stop_sequence: null }));
    setMapState(prev => ({ ...prev, auto_zoom: true }));
  }, []);

  // ---------

  const enableAutoZoom = useCallback(() => {
    setMapState(prev => ({ ...prev, auto_zoom: true }));
  }, []);

  const disableAutoZoom = useCallback(() => {
    setMapState(prev => ({ ...prev, auto_zoom: false }));
  }, []);

  const updateMapState = useCallback(
    (newMapState, reset = false) => {
      if (reset) setMapState({ ...initialMapState, ...newMapState });
      else setMapState({ ...mapState, ...newMapState });
    },
    [mapState],
  )

  const updateEntitiesState = useCallback(
    (newEntitiesState, reset = false) => {
      if (reset) setEntitiesState({ ...initialEntitiesState, ...newEntitiesState });
      else setEntitiesState({ ...entitiesState, ...newEntitiesState });
    },
    [entitiesState],
  )

  //
  // C. Setup context object

  const contextObject = useMemo(
    () => ({
      clearSelectedDate,
      clearSelectedLine,
      clearSelectedLocality,
      clearSelectedMunicipality,
      clearSelectedPattern,
      clearSelectedStop,
      disableAutoZoom,
      //
      enableAutoZoom,
      //
      entities: entitiesState,
      //
      map: mapState,
      //
      selectDate,
      //
      selectLine,
      //
      selectLocality,
      //
      selectMunicipality,
      //
      selectPattern,
      //
      selectStop,
      updateEntities: updateEntitiesState,
      updateMap: updateMapState,
      //
    }),
    [
      clearSelectedDate,
      clearSelectedLine,
      clearSelectedLocality,
      clearSelectedMunicipality,
      clearSelectedPattern,
      clearSelectedStop,
      disableAutoZoom,
      enableAutoZoom,
      entitiesState,
      mapState,
      selectDate,
      selectLine,
      selectLocality,
      selectMunicipality,
      selectPattern,
      selectStop,
      updateEntitiesState,
      updateMapState,
    ],
  )

  //
  // D. Return provider

  return <FrontendLinesContext.Provider value={contextObject}>{children}</FrontendLinesContext.Provider>;

  //
}
