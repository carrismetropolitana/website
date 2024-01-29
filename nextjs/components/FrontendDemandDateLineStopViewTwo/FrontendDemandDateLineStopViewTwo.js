'use client';

/* * */

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FrontendDemandDateLineStopViewTwo.module.css';
import { Select } from '@mantine/core';
import { LineChart } from '@mantine/charts';

/* * */

export default function FrontendDemandDateLineStopViewTwo() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendDemandDateLineStopViewTwo');
  const [selectedLineId, setSelectedLineId] = useState('1001');

  //
  // B. Transform data

  const { data: allLinesData } = useSWR('https://api.carrismetropolitana.pt/lines');
  const { data: demandData } = useSWR('https://api.carrismetropolitana.pt/datasets/demand/date-line-stop/viewByDateForEachLine');

  //
  // B. Transform data

  const lineChartSeries = useMemo(() => {
    // Return if data is not yet available
    if (!selectedLineId || !allLinesData || !demandData) return [];
    // Search selected line
    const selectedLineData = allLinesData.find((line) => selectedLineId === line.id);
    //
    if (selectedLineData) return [{ label: t('line_chart.series.name', { line_short_name: selectedLineData.short_name }), name: selectedLineId, color: selectedLineData.color }];
    else return [];
    //
  }, [allLinesData, demandData, selectedLineId, t]);

  const lineChartData = useMemo(() => {
    // Return if data is not yet available
    if (!selectedLineId || !allLinesData || !demandData) return [];
    // Initialize an empty array to store the result
    const resultArray = [];
    // Iterate over the keys (dates) in the input data
    for (const [dateString, allValidationData] of Object.entries(demandData)) {
      const validationsForThisDate = { date: dateString };
      for (const [lineId, validationsCount] of Object.entries(allValidationData)) {
        validationsForThisDate[lineId] = validationsCount || 0;
      }
      resultArray.push(validationsForThisDate);
    }
    //
    return resultArray;
    //
  }, [allLinesData, demandData, selectedLineId]);

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <Select label={t('date_picker.label')} description={t('date_picker.description')} placeholder={t('date_picker.placeholder')} value={selectedLineId} onChange={setSelectedLineId} data={allLinesData ? allLinesData.map((l) => ({ label: l.id, value: l.id })) : []} clearable />
      <LineChart h={300} data={lineChartData} dataKey="date" series={lineChartSeries} withLegend curveType="linear" connectNulls={false} />
    </div>
  );

  //
}
