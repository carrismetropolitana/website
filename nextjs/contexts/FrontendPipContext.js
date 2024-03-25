'use client';

/* * */

import useSWR from 'swr';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

/* * */

// 1.
// SETUP INITIAL STATE

const initialMapState = {
  style: 'map',
  auto_zoom: null,
  selected_coordinates: null,
  selected_feature: null,
};

const initialSurveyState = {
  selected_answer_code: null,
};

/* * */

// 2.
// CREATE CONTEXTS

const FrontendPipContext = createContext(null);

/* * */

// 3.
// SETUP CUSTOM HOOKS

export function useFrontendPipContext() {
  return useContext(FrontendPipContext);
}

/* * */

// 4.
// SETUP PROVIDER

export function FrontendPipContextProvider({ children }) {
  //

  //
  // A. Setup variables

  const { pip_id: itemId } = useParams();

  //
  // B. Setup state

  const [mapState, setMapState] = useState(initialMapState);
  const [surveyState, setSurveyState] = useState(initialSurveyState);

  //
  // B. Fetch data

  const { data: allItemsData } = useSWR('https://api.carrismetropolitana.pt/datasets/facilities/pip');
  const { data: itemData } = useSWR(itemId && `https://api.carrismetropolitana.pt/datasets/facilities/pip/${itemId}`);

  //
  // D. Setup actions

  const updateMapState = useCallback(
    (newMapState, reset = false) => {
      if (reset) setMapState({ ...initialMapState, ...newMapState });
      else setMapState({ ...mapState, ...newMapState });
    },
    [mapState]
  );

  const updateSurvey = useCallback(
    (newSurveyState, reset = false) => {
      if (reset) setSurveyState({ ...initialSurveyState, ...newSurveyState });
      else setSurveyState({ ...surveyState, ...newSurveyState });
    },
    [surveyState]
  );

  // --------

  const setSelectedCoordinates = useCallback((newCoordinates) => {
    setSurveyState(initialSurveyState);
    setMapState((prev) => ({ ...prev, selected_coordinates: newCoordinates, selected_feature: null }));
  }, []);

  const setSelectedFeature = useCallback((newFeature) => {
    setMapState((prev) => ({ ...prev, selected_feature: newFeature, selected_coordinates: null }));
  }, []);

  const disableAutoZoom = useCallback(() => {
    setMapState((prev) => ({ ...prev, auto_zoom: false }));
  }, []);

  // --------

  const selectAnswer = useCallback((answerCode) => {
    setSurveyState((prev) => ({ ...prev, selected_answer_code: prev.selected_answer_code !== answerCode ? answerCode : null }));
  }, []);

  const clearSelectedStop = useCallback(() => {
    setSurveyState(initialSurveyState);
    updateWindowUrl();
  }, []);

  // --------

  const selectTrip = useCallback((tripData) => {
    setSurveyState((prev) => ({ ...prev, trip: tripData }));
  }, []);

  const clearSelectedTrip = useCallback(() => {
    setSurveyState((prev) => ({ ...initialSurveyState, pip: prev.pip }));
  }, []);

  //
  // E. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      item_id: itemId,
      item_data: itemData,
      //
      map: mapState,
      updateMap: updateMapState,
      setSelectedCoordinates,
      setSelectedFeature,
      disableAutoZoom,
      //
      survey: surveyState,
      updateSurvey,
      //
      selectAnswer,
      clearSelectedStop,
      //
      selectTrip,
      clearSelectedTrip,
    }),
    [itemId, itemData, mapState, updateMapState, setSelectedCoordinates, setSelectedFeature, disableAutoZoom, surveyState, updateSurvey, selectAnswer, clearSelectedStop, selectTrip, clearSelectedTrip]
  );

  //
  // D. Return provider

  return <FrontendPipContext.Provider value={contextObject}>{children}</FrontendPipContext.Provider>;

  //
}
