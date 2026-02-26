'use client';
/* * */

import { createContext, useCallback, useContext, useState } from 'react';
import useSWR from 'swr';

/* * */

interface PipsItemData {
	pip_id: string
	stops?: string[]
}

interface PipsSurveyState {
	selected_answer_code: null | string
}

interface PipsContextState {
	actions: {
		selectAnswer: (answerCode: string) => Promise<void>
		selectStop: (stopId: string) => void
	}
	data: {
		item_data: PipsItemData | undefined
		item_id: string | undefined
		survey: PipsSurveyState
	}
}

/* * */

const PipsContext = createContext<PipsContextState | undefined>(undefined);

export function usePipsContext() {
	const context = useContext(PipsContext);
	if (!context) {
		throw new Error('usePipsContext must be used within a PipsContextProvider');
	}
	return context;
}

/* * */

export const PipsContextProvider = ({ children, pipId }: { children: React.ReactNode, pipId: string }) => {
	//

	//
	// A. Setup variables

	const [surveyState, setSurveyState] = useState<PipsSurveyState | undefined>(undefined);
	const { data: itemData } = useSWR<PipsItemData>(pipId && `https://api.carrismetropolitana.pt/datasets/facilities/pip/${pipId}`);

	//
	// B. Handle actions

	const updateSurvey = useCallback((newSurveyState: PipsSurveyState) => {
		if (!newSurveyState) return;
		console.log('updateSurvey', newSurveyState);
		setSurveyState(newSurveyState);
	},
	[]);

	const selectAnswer = async (answerCode: string) => {
		updateSurvey({ selected_answer_code: answerCode });
		try {
			await fetch('https://stats.carrismetropolitana.pt/collector/feedback/pipStatus', {
				body: JSON.stringify({
					answer_code: answerCode,
					pip_id: pipId,
				}),
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				method: 'POST',
			});
		}
		catch (error) {
			console.log(error);
		}

		// if (!itemData?.stops || itemData?.stops.length === 0) {
		// 	window.location.href = '/stops';
		// }

		// else if (itemData?.stops?.length === 1) {
		// 	window.location.href = `/stops/${itemData?.stops[0]}`;
		// }
	};

	const selectStop = (stopId: string) => {
		window.location.href = `/stops/${stopId}`;
	};

	//
	// C. Define context value

	const contextValue: PipsContextState = {
		actions: {
			selectAnswer,
			selectStop,
		},
		data: {
			item_data: itemData,
			item_id: pipId,
			survey: surveyState,
		},
	};

	//
	// D. Render components

	return (
		<PipsContext.Provider value={contextValue}>
			{children}
		</PipsContext.Provider>
	);

	//
};
