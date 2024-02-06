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
  auto_zoom: true,
  popup_data: null,
};

const initialViewsState = {
  //
  date: new Date(2023, 0, 1),
  date_string: '20230101',
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

const FrontendDemandDateLineStopContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useFrontendDemandDateLineStopContext() {
  return useContext(FrontendDemandDateLineStopContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function FrontendDemandDateLineStopContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [viewsState, setViewsState] = useState(initialViewsState);

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: demandDataViewByDateForEachStop } = useSWR('https://api.carrismetropolitana.pt/datasets/demand/date-line-stop/viewByDateForEachStop');
  const { data: demandDataViewByDateForEachStopForEachLine } = useSWR('https://api.carrismetropolitana.pt/datasets/demand/date-line-stop/viewByDateForEachStopForEachLine');

  //
  // B. Setup actions

  const selectDate = useCallback((date) => {
    if (!date) return;
    setViewsState((prev) => ({ ...prev, date: date, date_string: parseDateToString(date) }));
  }, []);

  const clearSelectedDate = useCallback(() => {
    setViewsState((prev) => ({ ...prev, date: null, date_string: null }));
  }, []);

  const selectStop = useCallback(
    (stopId) => {
      const foundStop = allStopsData.find((item) => item.id === stopId);
      if (foundStop) {
        setMapState((prev) => ({ ...prev, selected_feature: null, selected_coordinates: null }));
        setViewsState({ ...initialViewsState, stop: foundStop });
      }
    },
    [allStopsData]
  );

  const setPopupData = useCallback(
    (stopId) => {
      // Return if data is not yet available
      if (!allStopsData || !demandDataViewByDateForEachStop || !demandDataViewByDateForEachStopForEachLine || !viewsState.date_string) return null;
      // Return if there is no data for the selected date
      if (!demandDataViewByDateForEachStop[viewsState.date_string] || !demandDataViewByDateForEachStopForEachLine[viewsState.date_string]) return null;
      // Return if there is no data for the selected stop
      if (!demandDataViewByDateForEachStop[viewsState.date_string][stopId] || !demandDataViewByDateForEachStopForEachLine[viewsState.date_string][stopId]) return null;
      // If there is validations data fetch the stop data
      const foundStop = allStopsData.find((stopData) => stopData.id === stopId);
      // Return if no stop is found
      if (!foundStop) return null;
      // Find
      const linesValidationsBreakdown = Object.entries(demandDataViewByDateForEachStopForEachLine[viewsState.date_string][stopId]);
      const result = {
        ...foundStop,
        validations_total: linesValidationsBreakdown.map(([key, value]) => ({ line_id: key, validations: value })),
        validations_lines_breakdown: linesValidationsBreakdown.map(([key, value]) => ({ line_id: key, validations: value })),
      };
      console.log(result);
      setMapState((prev) => ({ ...prev, popup_data: result }));
    },
    [allStopsData, demandDataViewByDateForEachStop, demandDataViewByDateForEachStopForEachLine, viewsState.date_string]
  );

  const clearPopupData = useCallback(() => {
    setMapState((prev) => ({ ...prev, popup_data: null }));
  }, []);

  const clearSelectedStop = useCallback(() => {
    setViewsState(initialViewsState);
  }, []);

  const setSelectedFeature = useCallback((newFeature) => {
    setMapState((prev) => ({ ...prev, selected_feature: newFeature, selected_coordinates: null }));
  }, []);

  // ---------

  const enableAutoZoom = useCallback(() => {
    setMapState((prev) => ({ ...prev, auto_zoom: true }));
  }, []);

  const disableAutoZoom = useCallback(() => {
    setMapState((prev) => ({ ...prev, auto_zoom: false }));
  }, []);

  const updateMapState = useCallback(
    (newMapState, reset = false) => {
      if (reset) setMapState({ ...initialMapState, ...newMapState });
      else setMapState({ ...mapState, ...newMapState });
    },
    [mapState]
  );

  //
  // C. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      map: mapState,
      updateMap: updateMapState,
      //
      views: viewsState,
      //
      selectDate,
      clearSelectedDate,
      //
      setPopupData,
      clearPopupData,
      //
      selectStop,
      clearSelectedStop,
      //
      setSelectedFeature,
      //
      enableAutoZoom,
      disableAutoZoom,
      //
    }),
    [mapState, updateMapState, viewsState, selectDate, clearSelectedDate, setPopupData, clearPopupData, selectStop, clearSelectedStop, setSelectedFeature, enableAutoZoom, disableAutoZoom]
  );

  //
  // D. Return provider

  return <FrontendDemandDateLineStopContext.Provider value={contextObject}>{children}</FrontendDemandDateLineStopContext.Provider>;

  //
}
