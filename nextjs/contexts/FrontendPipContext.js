'use client';

/* * */

import useSWR from 'swr';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

/* * */

// 1.
// SETUP INITIAL STATE

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

  const [surveyState, setSurveyState] = useState(initialSurveyState);

  //
  // B. Fetch data

  const { data: itemData } = useSWR(itemId && `https://api.carrismetropolitana.pt/datasets/facilities/pip/${itemId}`);

  //
  // D. Setup actions

  const updateSurvey = useCallback(
    (newSurveyState, reset = false) => {
      if (reset) setSurveyState({ ...initialSurveyState, ...newSurveyState });
      else setSurveyState({ ...surveyState, ...newSurveyState });
    },
    [surveyState]
  );

  // --------

  const selectAnswer = useCallback(
    async (answerCode) => {
      setSurveyState((prev) => ({ ...prev, selected_answer_code: answerCode }));
      try {
        await fetch('https://stats.carrismetropolitana.pt/collector/feedback/pipStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            pip_id: itemId,
            answer_code: answerCode,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      if (itemData?.stops?.length < 2) {
        window.location = `/stops/${itemData?.stops[0]}`;
      }
    },
    [itemData?.stops, itemId]
  );

  const selectStop = useCallback((stopId) => {
    window.location = `/stops/${stopId}`;
  }, []);

  //
  // E. Setup context object

  const contextObject = useMemo(
    () => ({
      //
      item_id: itemId,
      item_data: itemData,
      //
      survey: surveyState,
      updateSurvey,
      //
      selectAnswer,
      selectStop,
      //
    }),
    [itemId, itemData, surveyState, updateSurvey, selectAnswer, selectStop]
  );

  //
  // D. Return provider

  return <FrontendPipContext.Provider value={contextObject}>{children}</FrontendPipContext.Provider>;

  //
}
