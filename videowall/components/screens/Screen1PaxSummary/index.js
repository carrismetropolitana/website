'use client';

/* * */

import CardSummary from '@/components/cards/CardSummary';
import getOperationalDateStringForToday from '@/services/getOperationalDateStringForToday';
import getOperationalDateStringForTodayMinusOneWeek from '@/services/getOperationalDateStringForTodayMinusOneWeek';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export default function Screen1PaxSummary() {
	//

	//
	// A. Setup variables

	const todayDateString = getOperationalDateStringForToday();
	const lastWeekDateString = getOperationalDateStringForTodayMinusOneWeek();

	//
	// B. Fetch data

	const { data: todayPaxCmData, isLoading: todayPaxCmLoading, isValidating: todayPaxCmValidating } = useSWR(`/api/cm/${todayDateString}/pax`);
	const { data: todayPax41Data, isLoading: todayPax41Loading, isValidating: todayPax41Validating } = useSWR(`/api/41/${todayDateString}/pax`);
	const { data: todayPax42Data, isLoading: todayPax42Loading, isValidating: todayPax42Validating } = useSWR(`/api/42/${todayDateString}/pax`);
	const { data: todayPax43Data, isLoading: todayPax43Loading, isValidating: todayPax43Validating } = useSWR(`/api/43/${todayDateString}/pax`);
	const { data: todayPax44Data, isLoading: todayPax44Loading, isValidating: todayPax44Validating } = useSWR(`/api/44/${todayDateString}/pax`);

	const { data: lastWeekPaxCmData, isLoading: lastWeekPaxCmLoading, isValidating: lastWeekPaxCmValidating } = useSWR(`/api/cm/${lastWeekDateString}/pax`);
	const { data: lastWeekPax41Data, isLoading: lastWeekPax41Loading, isValidating: lastWeekPax41Validating } = useSWR(`/api/41/${lastWeekDateString}/pax`);
	const { data: lastWeekPax42Data, isLoading: lastWeekPax42Loading, isValidating: lastWeekPax42Validating } = useSWR(`/api/42/${lastWeekDateString}/pax`);
	const { data: lastWeekPax43Data, isLoading: lastWeekPax43Loading, isValidating: lastWeekPax43Validating } = useSWR(`/api/43/${lastWeekDateString}/pax`);
	const { data: lastWeekPax44Data, isLoading: lastWeekPax44Loading, isValidating: lastWeekPax44Validating } = useSWR(`/api/44/${lastWeekDateString}/pax`);

	//
	// C. Transform data

	const paxSummaryDataFormatted = useMemo(() => {
		//
		if (!todayPaxCmData || !todayPax41Data || !todayPax42Data || !todayPax43Data || !todayPax44Data) return {};
		if (!lastWeekPaxCmData || !lastWeekPax41Data || !lastWeekPax42Data || !lastWeekPax43Data || !lastWeekPax44Data) return {};
		//
		const finalJson = {
			big_number: todayPaxCmData.value,
			comparisson: (todayPaxCmData.value * 100) / lastWeekPaxCmData.value,
			sections: [
				{ label: 'Área 1 (VA)', percentage: Math.round((todayPax41Data.value * 100) / todayPaxCmData.value), value: todayPax41Data.value },
				{ label: 'Área 2 (RL)', percentage: Math.round((todayPax42Data.value * 100) / todayPaxCmData.value), value: todayPax42Data.value },
				{ label: 'Área 3 (TST)', percentage: Math.round((todayPax43Data.value * 100) / todayPaxCmData.value), value: todayPax43Data.value },
				{ label: 'Área 4 (ALSA)', percentage: Math.round((todayPax44Data.value * 100) / todayPaxCmData.value), value: todayPax44Data.value },
			],
		};
		//
		return finalJson;
		//
	}, [lastWeekPax41Data, lastWeekPax42Data, lastWeekPax43Data, lastWeekPax44Data, lastWeekPaxCmData, todayPax41Data, todayPax42Data, todayPax43Data, todayPax44Data, todayPaxCmData]);

	//
	// D. Render components

	return (
		<CardSummary
			bigNumber={paxSummaryDataFormatted.big_number}
			comparison={paxSummaryDataFormatted.comparisson}
			endDate={todayPaxCmData?.end_date}
			isLoading={todayPaxCmLoading || todayPax41Loading || todayPax42Loading || todayPax43Loading || todayPax44Loading || lastWeekPaxCmLoading || lastWeekPax41Loading || lastWeekPax42Loading || lastWeekPax43Loading || lastWeekPax44Loading}
			isValidating={todayPaxCmValidating || todayPax41Validating || todayPax42Validating || todayPax43Validating || todayPax44Validating || lastWeekPaxCmValidating || lastWeekPax41Validating || lastWeekPax42Validating || lastWeekPax43Validating || lastWeekPax44Validating}
			sections={paxSummaryDataFormatted.sections}
			startDate={todayPaxCmData?.start_date}
			timestamp={todayPaxCmData?.timestamp}
			title="Total de Validações Hoje"
		/>
	);

	//
}
