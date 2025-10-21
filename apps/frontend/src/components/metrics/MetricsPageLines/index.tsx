'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LastUpdatedAt } from '@/components/metrics/LastUpdatedAt';
import { MetricsCardByLine } from '@/components/metrics/MetricsCardByLine';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageLines() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageLines');
	const { data } = useMetricsContext();

	//
	// B. Transform data

	const hasTopLinesData = Object.keys(data.linesByDay.topLinesByAgency).length > 0;

	const agencyIds = hasTopLinesData
		? Object.keys(data.linesByDay.topLinesByAgency)
		: ['41', '42', '43', '44']; // Default agency IDs if none exist

	//
	// C. Render components

	return (
		<Surface>
			<div id="linesMetrics">
				<Section heading={t('heading')} withGap withPadding>
					<p className={styles.text}>
						{t('text_1')}
					</p>

					<LastUpdatedAt lastUpdated={data.linesByDay.lastUpdated} />

				</Section>

				<Section withPadding>
					<Grid columns="ab" withGap>
						<>
							{
								agencyIds.map(agencyId => (
									<MetricsCardByLine
										key={agencyId}
										agencyId={agencyId}
									/>
								))
							}
						</>
					</Grid>
				</Section>
			</div>
		</Surface>
	);
}
