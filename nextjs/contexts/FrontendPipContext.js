'use client';

/* * */

import { useParams } from 'next/navigation';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import useSWR from 'swr';

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
		[surveyState],
	);

	// --------

	const selectAnswer = useCallback(
		async (answerCode) => {
			setSurveyState(prev => ({ ...prev, selected_answer_code: answerCode }));
			try {
				await fetch('https://stats.carrismetropolitana.pt/collector/feedback/pipStatus', {
					body: JSON.stringify({
						answer_code: answerCode,
						pip_id: itemId,
					}),
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
					method: 'POST',
				});
			}
			catch (error) {
				console.log(error);
			}
			if (!itemData?.stops || itemData?.stops.length === 0) {
				window.location = '/stops';
			}
			else if (itemData?.stops?.length === 1) {
				window.location = `/stops/${itemData?.stops[0]}`;
			}
		},
		[itemData, itemId],
	);

	const selectStop = useCallback((stopId) => {
		window.location = `/stops/${stopId}`;
	}, []);

	//
	// E. Setup context object

	const contextObject = useMemo(
		() => ({
			item_data: itemData,
			//
			item_id: itemId,
			//
			selectAnswer,
			selectStop,
			//
			survey: surveyState,
			updateSurvey,
			//
		}),
		[itemId, itemData, surveyState, updateSurvey, selectAnswer, selectStop],
	);

	//
	// D. Return provider

	return <FrontendPipContext.Provider value={contextObject}>{children}</FrontendPipContext.Provider>;

	//
}
