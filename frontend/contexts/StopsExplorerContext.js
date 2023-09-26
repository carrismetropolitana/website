'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// A.
// SETUP INITIAL STATE

const initialValues = {
  // Selections
  selected_stop_id: null,
  selected_pattern_id: null,
  selected_shape_id: null,
  selected_vehicle_id: null,
  selected_trip_id: null,
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

  const [values, setValues] = useState(initialValues);

  //
  // B. Setup actions

  const updateValues = useCallback(
    (newValues) => {
      setValues({ ...values, ...newValues });
    },
    [values]
  );

  const selectStop = useCallback(
    (stopId) => {
      setValues({ ...values, selected_stop_id: stopId, selected_pattern_id: null, selected_shape_id: null, selected_vehicle_id: null, selected_trip_id: null });
    },
    [values]
  );

  const unselectTrip = useCallback(
    (newValues) => {
      setValues({ ...values, selected_pattern_id: null, selected_shape_id: null, selected_vehicle_id: null, selected_trip_id: null });
    },
    [values]
  );

  //
  // C. Setup context object

  const contextObject = useMemo(
    () => ({
      values,
      selectStop,
      updateValues,
      unselectTrip,
    }),
    [values, selectStop, updateValues, unselectTrip]
  );

  //
  // D. Return provider

  return <StopsExplorerContext.Provider value={contextObject}>{children}</StopsExplorerContext.Provider>;

  //
}
