'use client';

/* * */

import CardSummary from '@/components/cards/CardSummary';
import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import getOperationalDateStringForToday from '@/services/getOperationalDateStringForToday';
import getOperationalDateStringForTodayMinusOneWeek from '@/services/getOperationalDateStringForTodayMinusOneWeek';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const todayDateString = getOperationalDateStringForToday();
	const lastWeekDateString = getOperationalDateStringForTodayMinusOneWeek();

	//
	// B. Fetch data

	const { data: todayPutCmData, isLoading: todayPutCmLoading, isValidating: todayPutCmValidating } = useSWR(`/api/cm/${todayDateString}/put`);
	const { data: lastWeekPutCmData, isLoading: lastWeekPutCmLoading, isValidating: lastWeekPutCmValidating } = useSWR(`/api/cm/${lastWeekDateString}/put`);

	const { data: todayPut41Data, isLoading: todayPut41Loading, isValidating: todayPut41Validating } = useSWR(`/api/41/${todayDateString}/put`);
	const { data: lastWeekPut41Data, isLoading: lastWeekPut41Loading, isValidating: lastWeekPut41Validating } = useSWR(`/api/41/${lastWeekDateString}/put`);

	const { data: todayPut42Data, isLoading: todayPut42Loading, isValidating: todayPut42Validating } = useSWR(`/api/42/${todayDateString}/put`);
	const { data: lastWeekPut42Data, isLoading: lastWeekPut42Loading, isValidating: lastWeekPut42Validating } = useSWR(`/api/42/${lastWeekDateString}/put`);

	const { data: todayPut43Data, isLoading: todayPut43Loading, isValidating: todayPut43Validating } = useSWR(`/api/43/${todayDateString}/put`);
	const { data: lastWeekPut43Data, isLoading: lastWeekPut43Loading, isValidating: lastWeekPut43Validating } = useSWR(`/api/43/${lastWeekDateString}/put`);

	const { data: todayPut44Data, isLoading: todayPut44Loading, isValidating: todayPut44Validating } = useSWR(`/api/44/${todayDateString}/put`);
	const { data: lastWeekPut44Data, isLoading: lastWeekPut44Loading, isValidating: lastWeekPut44Validating } = useSWR(`/api/44/${lastWeekDateString}/put`);

	//
	// C. Transform data

	const putCmSummaryDataFormatted = useMemo(() => {
		if (!todayPutCmData || !lastWeekPutCmData) return {};
		return {
			big_number: todayPutCmData.value,
			comparisson: (todayPutCmData.value * 100) / lastWeekPutCmData.value,
		};
	}, [lastWeekPutCmData, todayPutCmData]);

	const put41SummaryDataFormatted = useMemo(() => {
		if (!todayPut41Data || !lastWeekPut41Data) return {};
		return {
			big_number: todayPut41Data.value,
			comparisson: (todayPut41Data.value * 100) / lastWeekPut41Data.value,
		};
	}, [lastWeekPut41Data, todayPut41Data]);

	const put42SummaryDataFormatted = useMemo(() => {
		if (!todayPut42Data || !lastWeekPut42Data) return {};
		return {
			big_number: todayPut42Data.value,
			comparisson: (todayPut42Data.value * 100) / lastWeekPut42Data.value,
		};
	}, [lastWeekPut42Data, todayPut42Data]);

	const put43SummaryDataFormatted = useMemo(() => {
		if (!todayPut43Data || !lastWeekPut43Data) return {};
		return {
			big_number: todayPut43Data.value,
			comparisson: (todayPut43Data.value * 100) / lastWeekPut43Data.value,
		};
	}, [lastWeekPut43Data, todayPut43Data]);

	const put44SummaryDataFormatted = useMemo(() => {
		if (!todayPut44Data || !lastWeekPut44Data) return {};
		return {
			big_number: todayPut44Data.value,
			comparisson: (todayPut44Data.value * 100) / lastWeekPut44Data.value,
		};
	}, [lastWeekPut44Data, todayPut44Data]);

	//
	// A. Render components

	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<CardSummary
					bigNumber={putCmSummaryDataFormatted.big_number}
					comparison={putCmSummaryDataFormatted.comparisson}
					endDate={todayPutCmData?.end_date}
					isLoading={todayPutCmLoading || lastWeekPutCmLoading}
					isValidating={todayPutCmValidating || lastWeekPutCmValidating}
					level={1}
					startDate={todayPutCmData?.start_date}
					timestamp={todayPutCmData?.timestamp}
					title="CM / Total de Pessoas Hoje"
				/>
			</Columns>
			<Columns cols={2}>
				<CardSummary
					bigNumber={put41SummaryDataFormatted.big_number}
					comparison={put41SummaryDataFormatted.comparisson}
					endDate={todayPut41Data?.end_date}
					isLoading={todayPut41Loading || lastWeekPut41Loading}
					isValidating={todayPut41Validating || lastWeekPut41Validating}
					level={2}
					startDate={todayPut41Data?.start_date}
					timestamp={todayPut41Data?.timestamp}
					title="Área 1 / Total de Pessoas Hoje"
				/>
				<CardSummary
					bigNumber={put42SummaryDataFormatted.big_number}
					comparison={put42SummaryDataFormatted.comparisson}
					endDate={todayPut42Data?.end_date}
					isLoading={todayPut42Loading || lastWeekPut42Loading}
					isValidating={todayPut42Validating || lastWeekPut42Validating}
					level={2}
					startDate={todayPut42Data?.start_date}
					timestamp={todayPut42Data?.timestamp}
					title="Área 2 / Total de Pessoas Hoje"
				/>
				<CardSummary
					bigNumber={put43SummaryDataFormatted.big_number}
					comparison={put43SummaryDataFormatted.comparisson}
					endDate={todayPut43Data?.end_date}
					isLoading={todayPut43Loading || lastWeekPut43Loading}
					isValidating={todayPut43Validating || lastWeekPut43Validating}
					level={2}
					startDate={todayPut43Data?.start_date}
					timestamp={todayPut43Data?.timestamp}
					title="Área 3 / Total de Pessoas Hoje"
				/>
				<CardSummary
					bigNumber={put44SummaryDataFormatted.big_number}
					comparison={put44SummaryDataFormatted.comparisson}
					endDate={todayPut44Data?.end_date}
					isLoading={todayPut44Loading || lastWeekPut44Loading}
					isValidating={todayPut44Validating || lastWeekPut44Validating}
					level={2}
					startDate={todayPut44Data?.start_date}
					timestamp={todayPut44Data?.timestamp}
					title="Área 4 / Total de Pessoas Hoje"
				/>
			</Columns>
		</ScreenWrapper>
	);

	//
}
