'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsComplaintsPageCardGroup } from '@/components/metrics/MetricsPageComplaintsCardGroup';
import { MetricsPageComplaintsGlobalCard } from '@/components/metrics/MetricsPageComplaintsGlobalCard';
import { MetricsPageComplaintsToolbar } from '@/components/metrics/MetricsPageComplaintsToolbar';
import { useLinesContext } from '@/contexts/Lines.context';
import { useLocationsContext } from '@/contexts/Locations.context';
import { type ComplaintMetrics, type DemandMetricsByAgency, type DemandMetricsByAgencyMonth, type DemandMetricsByLine } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

export function MetricsPageComplaints() {
	//

	//
	// A. Setup variables

	const [state, setState] = useState({
		complaints_by_line: [] as ComplaintMetrics[],
		complaints_by_municipality: [] as ComplaintMetrics[],
		complaints_global: [] as ComplaintMetrics[],
		filter_type: 'global',
		filter_value: '-',
		filtered_data: [] as ComplaintMetrics[],
		last_update: '',
		line_color: '',
		municipality_name: '',
		total_passengers_last_week: 0,
		total_passengers_last_week_line_id: 0,
		total_passengers_last_year: 0,
	});

	const todayStr = DateTime.local().toISODate();
	const sevenDaysAgoStr = DateTime.local().minus({ days: 7 }).toISODate();

	const t = useTranslations('metrics.MetricsPageComplaints');

	const linesContext = useLinesContext();
	const locationsContext = useLocationsContext();

	//
	// B. Fetch data

	const { data: demandMetricsByAgencyMonthData } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/month`);
	const { data: demandMetricsByLineMonthData } = useSWR<DemandMetricsByLine[]>(`${getPublicVariable('api_url')}/metrics/demand/by_line`);

	const { data: demandMetricsByAgencyYearData } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/year`);

	const { data: complaintsMetricsData } = useSWR<ComplaintMetrics[]>(`${getPublicVariable('api_url')}/metrics/complaints/`);

	//
	// C. Transform data

	// By Month

	useEffect(() => {
		if (!demandMetricsByAgencyMonthData || demandMetricsByAgencyMonthData.length === 0) return;
		const byDayData = demandMetricsByAgencyMonthData.flatMap((agencyBlock) => {
			return (agencyBlock.data as DemandMetricsByAgencyMonth[]).filter((record) => {
				return record.day_group >= sevenDaysAgoStr && record.day_group <= todayStr;
			});
		});
		setState(prevState => ({
			...prevState,
			total_passengers_last_week: byDayData.reduce((acc, block) => acc + block.qty, 0),
		}));
	}, [demandMetricsByAgencyMonthData]);

	useEffect(() => {
		if (!demandMetricsByLineMonthData || demandMetricsByLineMonthData.length === 0 || state.filter_type !== 'line' || !state.filter_value) return;
		const byLastWeekData = demandMetricsByLineMonthData.flatMap((lineBlock) => {
			return (lineBlock.by_day).filter((record) => {
				return record.day >= sevenDaysAgoStr && record.day <= todayStr && lineBlock.line_id === state.filter_value;
			});
		});
		setState(prevState => ({
			...prevState,
			total_passengers_last_week_line_id: byLastWeekData.reduce((acc, block) => acc + block.qty, 0),
		}));
	}, [demandMetricsByLineMonthData, state.filter_type, state.filter_value]);

	// By Year

	useEffect(() => {
		if (!demandMetricsByAgencyYearData || demandMetricsByAgencyYearData.length === 0) return;
		let totalPassengersLastYear = 0;
		// Sum total passengers for all agencies
		for (const agencyBlock of demandMetricsByAgencyYearData) {
			for (const record of agencyBlock.data) {
				totalPassengersLastYear += record.qty;
			}
		}
		setState(prevState => ({
			...prevState,
			total_passengers_last_year: totalPassengersLastYear,
		}));
	}, [demandMetricsByAgencyYearData]);

	useEffect(() => {
		if (!complaintsMetricsData) return;
		const line_complaints = complaintsMetricsData.filter(item => item.type === 'line' && item.filter_value === state.filter_value);
		const municipal_complaints = complaintsMetricsData.filter(item => item.type === 'municipality' && item.filter_value === state.filter_value);
		const global_complaints = complaintsMetricsData.filter(item => item.type === 'global' && item.filter_value === '-');
		const last_update = complaintsMetricsData.find(item => item.type === 'global' && item.filter_value === '-')?.last_update || '';
		const lineColor = linesContext.data.lines.find(line => line.id === state.filter_value)?.color || '';
		const municipalityName = locationsContext.data.municipalities.find(municipality => municipality.id === state.filter_value)?.name || '';

		setState(prevState => ({
			...prevState,
			complaints_by_line: line_complaints,
			complaints_by_municipality: municipal_complaints,
			complaints_global: global_complaints,
			filtered_data: prevState.filtered_data.length ? prevState.filtered_data : global_complaints,
			last_update: last_update,
			line_color: lineColor,
			municipality_name: municipalityName,
		}));
	}, [complaintsMetricsData, state.filter_type, state.filter_value]);

	//
	// D. Handle actions

	useEffect(() => {
		if (!complaintsMetricsData) return;

		switch (state.filter_type) {
			case 'global':
				setState(prevState => ({ ...prevState, filtered_data: prevState.complaints_global, line_color: '', municipality_name: '' }));
				break;
			case 'line':
				setState(prevState => ({ ...prevState, filtered_data: prevState.complaints_by_line, line_color: prevState.line_color, municipality_name: '' }));
				break;
			case 'municipality':
				setState(prevState => ({ ...prevState, filtered_data: prevState.complaints_by_municipality, line_color: '', municipality_name: prevState.municipality_name }));
				break;
			default:
				break;
		}
	}, [state.filter_type, state.filter_value]);

	const handleFilterChange = (value: string) => {
		setState(prevState => ({
			...prevState,
			filter_type: value || 'global',
		}));
	};

	//
	// E. Render components

	return (
		<Surface>
			<div id="contactsMetrics">
				<Section heading={t('heading')} subheading={t('subheading')} withPadding>
					<MetricsPageComplaintsGlobalCard allData={state.complaints_global} totalPassengersLastYear={state.total_passengers_last_year} />
					<MetricsPageComplaintsToolbar allLines={linesContext.data.lines} filter_type={handleFilterChange} filter_value={value => setState(prevState => ({ ...prevState, filter_value: value }))} />
					<MetricsComplaintsPageCardGroup data={state.filtered_data} filter_type={state.filter_type} filter_value={state.filter_value} last_update={state.last_update} lineColor={state.line_color} municipalityName={state.municipality_name} totalPassengersLastWeekLineId={state.total_passengers_last_week_line_id} totalPassengersLastYear={state.total_passengers_last_year} />
				</Section>
			</div>
		</Surface>
	);

	//
}
