'use client';
/* * */

import { type Facility } from '@carrismetropolitana/api-types/facilities';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
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

	const [surveyState, setSurveyState] = useState<PipsSurveyState>({ selected_answer_code: null });
	const { data: pipsData, isLoading } = useSWR<Facility[]>('https://api.carrismetropolitana.pt/v2/facilities/pips');
	const pipData = useMemo(() => pipsData?.find(pip => pip.id === pipId), [pipsData, pipId]);

	//
	// B. Handle actions

	const selectAnswer = useCallback(async (answerCode: string) => {
		setSurveyState({ selected_answer_code: answerCode });
		try {
			await fetch('https://stats.carrismetropolitana.pt/collector/feedback/pipStatus', {
				body: JSON.stringify({ answer_code: answerCode, pip_id: pipId }),
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				method: 'POST',
			});
		}
		catch (error) {
			console.error(error);
		}

		if (!pipData?.stop_ids?.length) {
			window.location.href = '/stops';
		}

		else if (pipData.stop_ids.length === 1) {
			const stopId = pipData.stop_ids[0];
			window.location.href = `/stops/${stopId}`;
		}
		else if (pipData.stop_ids.length > 1) {
			return;
		}
	}, [pipId, pipData]);

	const selectStop = useCallback((stopId: string) => {
		window.location.href = `/stops/${stopId}`;
	}, []);

	//
	// C. Define context value

	const value = useMemo<PipsContextState>(() => ({
		actions: {
			selectAnswer,
			selectStop,
		},
		data: {
			allPipsData: pipsData,
			pipData,
			pipId,
			survey: surveyState,
		},
		flags: {
			is_loading: isLoading,
		},
	}), [pipsData, pipData, pipId, surveyState, isLoading, selectAnswer, selectStop]);

	//
	// D. Render components

	return (
		<PipsContext.Provider value={value}>
			{children}
		</PipsContext.Provider>
	);

	//
};
