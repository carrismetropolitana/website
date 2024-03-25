'use client';

/* * */

import useSWR from 'swr';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/* * */

// 1.
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
  vehicle: {
    id: '43|2254',
    timestamp: 1707620666,
    schedule_relationship: 'SCHEDULED',
    trip_id: '3708_0_1_2630_2659_0_ESC_SAB',
    pattern_id: '3708_0_1',
    route_id: '3708_0',
    line_id: '3708',
    stop_id: '021001',
    current_status: 'INCOMING_AT',
    block_id: 'ESC_SAB_ES2041',
    shift_id: 'ES2130',
    lat: 38.666954040527344,
    lon: -9.182901382446289,
    bearing: 57,
    speed: 3.888888888888889,
    status: 'REPLACED BY current_status',
    heading: 0,
  },
  vehicle_prev: {
    id: '43|2254',
    timestamp: 1707620666,
    schedule_relationship: 'SCHEDULED',
    trip_id: '3708_0_1_2630_2659_0_ESC_SAB',
    pattern_id: '3708_0_1',
    route_id: '3708_0',
    line_id: '3708',
    stop_id: '021001',
    current_status: 'INCOMING_AT',
    block_id: 'ESC_SAB_ES2041',
    shift_id: 'ES2130',
    lat: 38.64061,
    lon: -9.230475,
    bearing: 57,
    speed: 3.888888888888889,
    status: 'REPLACED BY current_status',
    heading: 0,
  },
};

/* * */

// 2.
// CREATE CONTEXTS

const FrontendStopsContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useFrontendStopsContext() {
  return useContext(FrontendStopsContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function FrontendStopsContextProvider({ children }) {
  //

  //
  // A. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [entitiesState, setEntitiesState] = useState(initialEntitiesState);

  //
  // B. Fetch data

  const { data: allStopsData } = useSWR('https://api.carrismetropolitana.pt/stops');
  const { data: allVehiclesData } = useSWR('https://api.carrismetropolitana.pt/vehicles', { refreshInterval: 5000 });

  //
  // C. Supporting functions

  const updateWindowUrl = (stopId = 'all', stopName = 'Carris Metropolitana') => {
    let newUrl = `/stops/${stopId}`;
    // TODO:
    // Refactor to correctly parse the location path
    if (window.location.pathname.includes('mupi')) newUrl = `/mupi${newUrl}`;
    // :TODO
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

  const selectTrip = useCallback(
    (tripData) => {
      const selectedVehicleData = allVehiclesData.find((item) => item.trip_id && item.trip_id === tripData.trip_id);
      setEntitiesState((prev) => ({ ...prev, trip: tripData, vehicle: selectedVehicleData, vehicle_prev: prev.vehicle }));
    },
    [allVehiclesData]
  );

  const clearSelectedTrip = useCallback(() => {
    setEntitiesState((prev) => ({ ...initialEntitiesState, stop: prev.stop }));
  }, []);

  const updateVehicle = useCallback((newVehicle) => {
    setEntitiesState((prev) => ({ ...initialEntitiesState, vehicle: newVehicle, vehicle_prev: { lat: 38.64061, lon: -9.230475 } }));
  }, []);

  //   useEffect(() => {
  //     if (!allVehiclesData) return;
  //     const selectedVehicleData = {
  //       id: '43|2254',
  //       timestamp: 1707620666,
  //       schedule_relationship: 'SCHEDULED',
  //       trip_id: '3708_0_1_2630_2659_0_ESC_SAB',
  //       pattern_id: '3708_0_1',
  //       route_id: '3708_0',
  //       line_id: '3708',
  //       stop_id: '021001',
  //       current_status: 'INCOMING_AT',
  //       block_id: 'ESC_SAB_ES2041',
  //       shift_id: 'ES2130',
  //       lat: 38.666954040527344,
  //       lon: -9.182901382446289,
  //       bearing: 57,
  //       speed: 3.888888888888889,
  //       status: 'REPLACED BY current_status',
  //       heading: 0,
  //     };

  //     if (selectedVehicleData) {
  //       setEntitiesState((prev) => ({ ...initialEntitiesState, vehicle: selectedVehicleData, vehicle_prev: prev.vehicle }));
  //     }
  //   }, [allVehiclesData, entitiesState.trip?.trip_id]);

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
      updateVehicle: updateVehicle,
      //
      selectTrip,
      clearSelectedTrip,
    }),
    [mapState, updateMapState, setSelectedCoordinates, setSelectedFeature, disableAutoZoom, entitiesState, updateEntities, selectStop, clearSelectedStop, updateVehicle, selectTrip, clearSelectedTrip]
  );

  //
  // D. Return provider

  return <FrontendStopsContext.Provider value={contextObject}>{children}</FrontendStopsContext.Provider>;

  //
}
