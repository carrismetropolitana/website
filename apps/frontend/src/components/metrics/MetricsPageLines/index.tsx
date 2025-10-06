'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsCardByLine } from '@/components/metrics/MetricsCardByLine';
import { type DemandMetricsByLine } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function MetricsPageLines() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageLines');

	//
	// B. Fetch Data

	const { data: metricsDemandByLineData } = useSWR<DemandMetricsByLine[]>(`${getPublicVariable('api_url')}/metrics/demand/by_line`, { refreshInterval: 60000 });

	//
	// C. Transform data

	const totalQtyForEachLine = useMemo(() => {
		if (!metricsDemandByLineData) return;
		return metricsDemandByLineData.reduce((acc, line) => {
			acc[line.line_id] = (acc[line.line_id] || 0) + line.qty;
			return acc;
		}, {} as Record<string, number>);
	}, [metricsDemandByLineData]);

	const topLinesForAgency41 = useMemo(() => {
		if (!metricsDemandByLineData) return;
		return metricsDemandByLineData
			.filter(item => item.line_id.startsWith('1'))
			.sort((a, b) => b.qty - a.qty)
			.slice(0, 3);
	}, [totalQtyForEachLine]);

	const topLinesForAgency42 = useMemo(() => {
		if (!metricsDemandByLineData) return;
		return metricsDemandByLineData
			.filter(item => item.line_id.startsWith('2'))
			.sort((a, b) => b.qty - a.qty)
			.slice(0, 3);
	}, [totalQtyForEachLine]);

	const topLinesForAgency43 = useMemo(() => {
		if (!metricsDemandByLineData) return;
		return metricsDemandByLineData
			.filter(item => item.line_id.startsWith('3'))
			.sort((a, b) => b.qty - a.qty)
			.slice(0, 3);
	}, [totalQtyForEachLine]);

	const topLinesForAgency44 = useMemo(() => {
		if (!metricsDemandByLineData) return;
		return metricsDemandByLineData
			.filter(item => item.line_id.startsWith('4'))
			.sort((a, b) => b.qty - a.qty)
			.slice(0, 3);
	}, [totalQtyForEachLine]);

	//
	// B. Render components

	return (
		<Surface>
			<div id="linesMetrics">
				<Section heading={t('heading')} withPadding>
					<p className={styles.text}>{t('text_1')}</p>
				</Section>

				<Section withPadding>
					<Grid columns="ab" withGap>
						<MetricsCardByLine data={topLinesForAgency41} main_description={t('agencies.41.main_description')}main_label={t('agencies.41.main_label')} />
						<MetricsCardByLine data={topLinesForAgency42} main_description={t('agencies.42.main_description')}main_label={t('agencies.42.main_label')} />
						<MetricsCardByLine data={topLinesForAgency43} main_description={t('agencies.43.main_description')}main_label={t('agencies.43.main_label')} />
						<MetricsCardByLine data={topLinesForAgency44} main_description={t('agencies.44.main_description')}main_label={t('agencies.44.main_label')} />
					</Grid>
				</Section>
			</div>
		</Surface>
	);

	//
}
