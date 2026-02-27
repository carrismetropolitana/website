'use client';

/* * */

import { type Facility } from '@carrismetropolitana/api-types/facilities';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */
interface PipsSurveyState {
	selected_answer_code: null | string
}

interface PipsContextState {
	actions: {
		selectAnswer: (answerCode: string) => Promise<void>
		selectStop: (stopId: string) => void
	}
	data: {
		allPipsData: Facility[] | undefined
		pipData: Facility | undefined
		pipId: string | undefined
		survey: PipsSurveyState
	}
	flags: {
		is_loading: boolean | undefined
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
	const [pipData, setPipData] = useState<Facility | undefined>(undefined);
	const { data: pipsData, isLoading: isLoadingPipsData } = useSWR<Facility[]>(`https://api.carrismetropolitana.pt/v2/facilities/pips`);

	//
	// B. Transform data

	useEffect(() => {
		if (!pipsData?.length || !pipId) return;
		setPipData(pipsData.find(pip => pip.id === pipId));
	}, [pipsData, pipId]);

	//
	// C. Handle actions

	const updateSurvey = useCallback((newSurveyState: PipsSurveyState) => {
		if (!newSurveyState) return;
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

		// if (!pipData?.stop_ids || pipData?.stop_ids.length === 0) {
		// 	window.location.href = '/stops';
		// }

		// else

		console.log(pipData?.stop_ids, pipData?.id);
		if (pipData?.stop_ids?.length === 1) {
			window.location.href = `/stops/${pipData.stop_ids[0]}`;
		}
	};

	const selectStop = (stopId: string) => {
		window.location.href = `/stops/${stopId}`;
	};

	// C. Define context value

	const contextValue: PipsContextState = {
		actions: {
			selectAnswer,
			selectStop,
		},
		data: {
			allPipsData: pipsData,
			pipData: pipData,
			pipId: pipId,
			survey: surveyState || { selected_answer_code: null },
		},
		flags: {
			is_loading: isLoadingPipsData,
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
