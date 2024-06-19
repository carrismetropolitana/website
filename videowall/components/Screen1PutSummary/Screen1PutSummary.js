'use client';

/* * */

import useSWR from 'swr';
import { useMemo } from 'react';
import CardSummary from '@/components/CardSummary/CardSummary';
import getOperationalDateStringForToday from '@/services/getOperationalDateStringForToday';
import getOperationalDateStringForTodayMinusOneWeek from '@/services/getOperationalDateStringForTodayMinusOneWeek';

/* * */

export default function Screen1PutSummary() {
  //

  //
  // A. Setup variables

  const todayDateString = getOperationalDateStringForToday();
  const lastWeekDateString = getOperationalDateStringForTodayMinusOneWeek();

  //
  // B. Fetch data

  const { data: todayPutCmData, isLoading: todayPutCmLoading, isValidating: todayPutCmValidating } = useSWR(`/api/cm/${todayDateString}/put`);
  const { data: todayPut41Data, isLoading: todayPut41Loading, isValidating: todayPut41Validating } = useSWR(`/api/41/${todayDateString}/put`);
  const { data: todayPut42Data, isLoading: todayPut42Loading, isValidating: todayPut42Validating } = useSWR(`/api/42/${todayDateString}/put`);
  const { data: todayPut43Data, isLoading: todayPut43Loading, isValidating: todayPut43Validating } = useSWR(`/api/43/${todayDateString}/put`);
  const { data: todayPut44Data, isLoading: todayPut44Loading, isValidating: todayPut44Validating } = useSWR(`/api/44/${todayDateString}/put`);

  const { data: lastWeekPutCmData, isLoading: lastWeekPutCmLoading, isValidating: lastWeekPutCmValidating } = useSWR(`/api/cm/${lastWeekDateString}/put`);
  const { data: lastWeekPut41Data, isLoading: lastWeekPut41Loading, isValidating: lastWeekPut41Validating } = useSWR(`/api/41/${lastWeekDateString}/put`);
  const { data: lastWeekPut42Data, isLoading: lastWeekPut42Loading, isValidating: lastWeekPut42Validating } = useSWR(`/api/42/${lastWeekDateString}/put`);
  const { data: lastWeekPut43Data, isLoading: lastWeekPut43Loading, isValidating: lastWeekPut43Validating } = useSWR(`/api/43/${lastWeekDateString}/put`);
  const { data: lastWeekPut44Data, isLoading: lastWeekPut44Loading, isValidating: lastWeekPut44Validating } = useSWR(`/api/44/${lastWeekDateString}/put`);

  //
  // C. Transform data

  const putSummaryDataFormatted = useMemo(() => {
    //
    if (!todayPutCmData || !todayPut41Data || !todayPut42Data || !todayPut43Data || !todayPut44Data) return {};
    if (!lastWeekPutCmData || !lastWeekPut41Data || !lastWeekPut42Data || !lastWeekPut43Data || !lastWeekPut44Data) return {};
    //
    const finalJson = {
      big_number: todayPutCmData.value,
      comparisson: (todayPutCmData.value * 100) / lastWeekPutCmData.value,
      sections: [
        { label: 'Área 1 (VA)', value: todayPut41Data.value, percentage: Math.round((todayPut41Data.value * 100) / todayPutCmData.value) },
        { label: 'Área 2 (RL)', value: todayPut42Data.value, percentage: Math.round((todayPut42Data.value * 100) / todayPutCmData.value) },
        { label: 'Área 3 (TST)', value: todayPut43Data.value, percentage: Math.round((todayPut43Data.value * 100) / todayPutCmData.value) },
        { label: 'Área 4 (ALSA)', value: todayPut44Data.value, percentage: Math.round((todayPut44Data.value * 100) / todayPutCmData.value) },
      ],
    };
    //
    return finalJson;
    //
  }, [lastWeekPut41Data, lastWeekPut42Data, lastWeekPut43Data, lastWeekPut44Data, lastWeekPutCmData, todayPut41Data, todayPut42Data, todayPut43Data, todayPut44Data, todayPutCmData]);

  //
  // D. Render components

  return (
    <CardSummary
      title="Total de Pessoas Hoje"
      timestamp={todayPutCmData?.timestamp}
      startDate={todayPutCmData?.start_date}
      endDate={todayPutCmData?.end_date}
      bigNumber={putSummaryDataFormatted.big_number}
      comparison={putSummaryDataFormatted.comparisson}
      sections={putSummaryDataFormatted.sections}
      isLoading={todayPutCmLoading || todayPut41Loading || todayPut42Loading || todayPut43Loading || todayPut44Loading || lastWeekPutCmLoading || lastWeekPut41Loading || lastWeekPut42Loading || lastWeekPut43Loading || lastWeekPut44Loading}
      isValidating={todayPutCmValidating || todayPut41Validating || todayPut42Validating || todayPut43Validating || todayPut44Validating || lastWeekPutCmValidating || lastWeekPut41Validating || lastWeekPut42Validating || lastWeekPut43Validating || lastWeekPut44Validating}
    />
  );

  //
}
