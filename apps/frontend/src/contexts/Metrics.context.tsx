'use client';

/* * */

import { formatDay, formatMonth } from '@/utils/formatDates';
import { TopDemandLinesByAgency } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DemandByAgencyByDay, DemandByAgencyByMonth, DemandByLineByDay, TopDemandByAgency } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/utils';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { createContext, useContext, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

export interface MetricDayData {
	day_group: string
	formatted_day: string
	qty: number
}

interface MetricMonthData {
	formatted_month: string
	month_group: string
	qty: number
}

/* * */

interface MetricsContextState {
	actions: {
		setEndDate: (date: string) => void
		setStartDate: (date: string) => void
	}
	data: {
		agenciesByDay: {
			agencies: Record<string, { chart: MetricDayData[], sum: number }>
			all: { chart: MetricDayData[], sum: number }
			lastUpdated: Date | null
		}
		agenciesByMonth: {
			agencies: Record<string, { chart: MetricMonthData[], sum: number }>
			all: { chart: MetricMonthData[], sum: number }
			lastUpdated: Date | null
		}
		demandRecords: {
			lastUpdated: Date | null
			topDay: null | { date: string, qty: number }
			topMonth: null | { date: string, qty: number }
		}
		linesByDay: {
			lastUpdated: Date | null
			topLinesByAgency: Record<string, { lines: { chart: MetricDayData[], line: DemandByLineByDay, sum: number }[] }>
		}
		totalPassengersThisYear: number
	}
	filters: {
		endDate: Dates
		startDate: Dates
	}
	flags: {
		is_demand_by_agency_loading: boolean
		is_demand_by_line_loading: boolean
		is_demand_records_loading: boolean
	}
}

/* * */

const MetricsContext = createContext<MetricsContextState | undefined>(undefined);

export function useMetricsContext() {
	const context = useContext(MetricsContext);
	if (!context) {
		throw new Error('useMetricsContext must be used within a MetricsContextProvider');
	}
	return context;
}

/* * */

export const MetricsContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const tCommon = useTranslations('common');

	const DEFAULT_START_DATE = Dates.now('Europe/Lisbon').minus({ days: 30 });
	const DEFAULT_END_DATE = Dates.now('Europe/Lisbon');

	const [startDate, setStartDate] = useState(DEFAULT_START_DATE);
	const [endDate, setEndDate] = useState(DEFAULT_END_DATE);

	//
	// B. Fetch data

	const { data: demandByAgencyByDay, isLoading: demandByAgencyByDayLoading } = useSWR<DemandByAgencyByDay[]>(
		`${getPublicVariable('api_url')}/metrics/demand/by_agency/day`,
	);

	const { data: demandByAgencyByMonth, isLoading: demandByAgencyByMonthLoading } = useSWR<DemandByAgencyByMonth[]>(
		`${getPublicVariable('api_url')}/metrics/demand/by_agency/month`,
	);

	const { data: topDemandByAgency, isLoading: topDemandByAgencyLoading } = useSWR<TopDemandLinesByAgency>(
		`${getPublicVariable('api_url')}/metrics/demand/top_lines/by_agency`,
	);

	const { data: demandRecords, isLoading: demandRecordsLoading } = useSWR<TopDemandByAgency[]>(
		`${getPublicVariable('api_url')}/metrics/demand/by_agency/records`,
	);

	//
	// C. Helpers

	function filterByDateRange(
		data: MetricDayData[] | MetricMonthData[] = [],
		start: Dates,
		end: Dates,
	) {
		return data
			.filter((item) => {
				const hasMonthGroup = 'month_group' in item;

				if (hasMonthGroup) {
					const monthStr = (item as MetricMonthData).month_group;
					const startMonth = `${start.js_date.getFullYear()}-${(start.js_date.getMonth() + 1).toString().padStart(2, '0')}`;
					const endMonth = `${end.js_date.getFullYear()}-${(end.js_date.getMonth() + 1).toString().padStart(2, '0')}`;
					return monthStr >= startMonth && monthStr <= endMonth;
				}
				else {
					const itemDate = Dates.fromISO((item as MetricDayData).day_group);
					return itemDate.iso >= start.iso && itemDate.iso <= end.iso;
				}
			})
			.sort((a, b) => {
				const keyA = 'month_group' in a ? (a as MetricMonthData).month_group : (a as MetricDayData).day_group;
				const keyB = 'month_group' in b ? (b as MetricMonthData).month_group : (b as MetricDayData).day_group;
				return keyA.localeCompare(keyB);
			});
	}

	function updateStartDate(value: string) {
		const date = Dates.fromFormat(value, 'yyyy-MM-dd', 'Europe/Lisbon');
		setStartDate(date);
	}

	function updateEndDate(value: string) {
		const date = Dates.fromFormat(value, 'yyyy-MM-dd', 'Europe/Lisbon');
		setEndDate(date);
	}

	//
	// D. Process data

	// Process day-level data

	const processedByDay = useMemo(() => {
		if (!demandByAgencyByDay) return { agencies: {}, all: { chart: [], sum: 0 }, lastUpdated: null };

		const aggregated: Record<string, { day_group: string, day_type?: '1' | '2' | '3', holiday?: '0' | '1', notes?: string, qty: number }> = {};

		demandByAgencyByDay.forEach((agencyBlock) => {
			Object.entries(agencyBlock.data).forEach(([day_group, dayData]) => {
				if (!aggregated[day_group]) {
					aggregated[day_group] = {
						day_group,
						day_type: dayData.day_type,
						holiday: dayData.holiday,
						notes: dayData.notes,
						qty: dayData.qty,
					};
				}
				else {
					aggregated[day_group].qty += dayData.qty;
				}
			});
		});

		const allAgenciesArray = Object.values(aggregated).map(item => ({
			day_group: item.day_group,
			formatted_day: formatDay(item, tCommon),
			qty: item.qty,
		}));

		const filteredAll = filterByDateRange(allAgenciesArray, startDate, endDate) as MetricDayData[];
		const allSum = filteredAll.reduce((acc, d) => acc + d.qty, 0);

		// Per-agency data
		const perAgency: Record<string, { chart: MetricDayData[], sum: number }> = {};

		['41', '42', '43', '44'].forEach((agencyId) => {
			const agency = demandByAgencyByDay.find(a => a.properties.agency_id === agencyId);
			if (!agency) {
				perAgency[agencyId] = { chart: [], sum: 0 };
				return;
			}

			const array = Object.entries(agency.data).map(([day_group, dayData]) => ({
				day_group,
				formatted_day: formatDay({
					day_group,
					day_type: dayData.day_type,
					holiday: dayData.holiday,
					notes: dayData.notes,
				}, tCommon),
				qty: dayData.qty,
			}));

			const filtered = filterByDateRange(array, startDate, endDate) as MetricDayData[];
			const sum = filtered.reduce((acc, d) => acc + d.qty, 0);
			perAgency[agencyId] = { chart: filtered, sum };
		});

		return {
			agencies: perAgency,
			all: { chart: filteredAll, sum: allSum },
			lastUpdated: demandByAgencyByDay?.[0]?.generated_at,
		};
	}, [demandByAgencyByDay, startDate, endDate, tCommon]);

	// Process month-level data

	const processedByMonth = useMemo(() => {
		if (!demandByAgencyByMonth) return { agencies: {}, all: { chart: [], sum: 0 }, lastUpdated: null };

		const aggregated: Record<string, number> = {};
		demandByAgencyByMonth.forEach((agencyBlock) => {
			Object.entries(agencyBlock.data).forEach(([month_group, d]) => {
				aggregated[month_group] = (aggregated[month_group] || 0) + d.qty;
			});
		});

		const allArray = Object.entries(aggregated).map(([month_group, qty]) => ({
			formatted_month: formatMonth(month_group, tCommon),
			month_group,
			qty,
		}));
		const filteredAll = filterByDateRange(allArray, startDate, endDate) as MetricMonthData[];
		const allSum = filteredAll.reduce((acc, d) => acc + d.qty, 0);

		const perAgency: Record<string, { chart: MetricMonthData[], sum: number }> = {};
		['41', '42', '43', '44'].forEach((id) => {
			const agency = demandByAgencyByMonth.find(a => a.properties.agency_id === id);
			if (!agency) return (perAgency[id] = { chart: [], sum: 0 });
			const arr = Object.entries(agency.data).map(([month_group, d]) => ({
				formatted_month: formatMonth(month_group, tCommon),
				month_group,
				qty: d.qty,
			}));
			const filteredAgency = filterByDateRange(arr, startDate, endDate) as MetricMonthData[];
			perAgency[id] = { chart: filteredAgency, sum: filteredAgency.reduce((a, b) => a + b.qty, 0) };
		});

		return {
			agencies: perAgency,
			all: { chart: filteredAll, sum: allSum },
			lastUpdated: demandByAgencyByMonth?.[0]?.generated_at,
		};
	}, [demandByAgencyByMonth, tCommon, startDate, endDate]);

	// Process lines-by-day data

	const processedLinesByDay = useMemo(() => {
		if (!topDemandByAgency) return { lastUpdated: null, topLinesByAgency: {} };

		const DAYS_RANGE = 30;
		const now = DateTime.now();
		const startLimit = now.minus({ days: DAYS_RANGE });

		const topLinesByAgency: Record<
			string,
			{
				lines: {
					chart: MetricDayData[]
					line: DemandByLineByDay
					sum: number
				}[]
			}
		> = {};

		Object.entries(topDemandByAgency.topLinesByAgency).forEach(([prefix, { lines }]) => {
			const linesWithChart = lines.map((line) => {
				const chartEntries = Object.entries(line.data || {})
					.map(([day_group, dayData]) => {
						const d = DateTime.fromISO(day_group);
						if (d < startLimit || d > now) return null;
						return {
							day_group,
							formatted_day: formatDay({ day_group }, tCommon),
							qty: dayData.qty,
						};
					})
					.filter(Boolean)
					.sort((a, b) => a.day_group.localeCompare(b.day_group)) as MetricDayData[];

				const sum = chartEntries.reduce((acc, d) => acc + d.qty, 0);
				return { chart: chartEntries, line, sum };
			});

			topLinesByAgency[prefix] = { lines: linesWithChart };
		});

		return {
			lastUpdated: topDemandByAgency.lastUpdated,
			topLinesByAgency,
		};
	}, [topDemandByAgency]);

	// Process records data

	const processedDemandRecords = useMemo(() => {
		if (!demandRecords || demandRecords.length === 0) return { lastUpdated: null, topDay: null, topMonth: null };

		return {
			lastUpdated: demandRecords[0]?.generated_at,
			topDay: demandRecords[0].data.total.day,
			topMonth: demandRecords[0].data.total.month,
		};
	}, [demandRecords]);

	// Define total passengers last year

	const totalPassengersThisYear = useMemo(() => {
		if (!demandByAgencyByMonth) return 0;

		const currentYear = Dates.now('Europe/Lisbon').js_date.getFullYear();
		let total = 0;

		demandByAgencyByMonth.forEach((agencyBlock) => {
			Object.entries(agencyBlock.data).forEach(([month_group, d]) => {
				const [yearStr] = month_group.split('-');
				const year = parseInt(yearStr, 10);
				if (year === currentYear) {
					total += d.qty;
				}
			});
		});

		return total;
	}, [demandByAgencyByMonth]);

	//
	// E. Define context value

	const contextValue: MetricsContextState = {
		actions: {
			setEndDate: updateEndDate,
			setStartDate: updateStartDate,
		},
		data: {
			agenciesByDay: processedByDay,
			agenciesByMonth: processedByMonth,
			demandRecords: processedDemandRecords,
			linesByDay: processedLinesByDay,
			totalPassengersThisYear,
		},
		filters: {
			endDate,
			startDate,
		},
		flags: {
			is_demand_by_agency_loading: demandByAgencyByDayLoading || demandByAgencyByMonthLoading,
			is_demand_by_line_loading: topDemandByAgencyLoading,
			is_demand_records_loading: demandRecordsLoading,
		},
	};

	//
	// F. Render

	return (
		<MetricsContext.Provider value={contextValue}>
			{children}
		</MetricsContext.Provider>
	);
};
