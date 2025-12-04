'use client';

import { formatDay } from '@/utils/formatDates';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DemandByLineByDay } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/dates';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

export interface MetricDayData {
	day_group: string
	formatted_day: string
	qty: number
}

interface UseLineDataResult {
	chart: MetricDayData[]
	line: DemandByLineByDay
	sum: number
}

export function useLineData(
	lineId: null | string,
	start: Dates,
	end: Dates,
): { data: null | UseLineDataResult, isLoading: boolean } {
	const t = useTranslations('common');

	const { data: lineData, isLoading } = useSWR<DemandByLineByDay[]>(
		lineId ? `${getPublicVariable('api_url')}/metrics/demand/by_line/${lineId}` : null,
	);

	const data = useMemo(() => {
		if (!lineData || !lineData.length) return null;

		const line = lineData[0];

		const chart: MetricDayData[] = Object.entries(line.data).map(([day_group, dayData]) => ({
			day_group,
			formatted_day: formatDay({
				day_group,
				day_type: dayData.day_type,
				holiday: dayData.holiday,
				notes: dayData.notes,
			}, t),
			qty: dayData.qty,
		}));

		const filtered = chart.filter(d => d.day_group >= start.iso && d.day_group <= end.iso);
		const sum = filtered.reduce((acc, d) => acc + d.qty, 0);

		return { chart: filtered, line, sum };
	}, [lineData, start, end, t]);

	return { data, isLoading };
}
