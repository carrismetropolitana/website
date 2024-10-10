'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { OperatorMetrics } from '@/types/metrics.types';
import getOperationalDay from '@/utils/operation';
import { Routes } from '@/utils/routes';
import classNames from 'classnames';
import useSWR from 'swr';

import MetricsCardByLine from '../MetricsCardByLine';
import MetricsCardByOperator from '../MetricsCardByOperator';
import MetricsCardToday from '../MetricsCardToday';
import MetricsCardYearToDate from '../MetricsCardYearToDate';
import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Fetch Data

	const { data, isLoading } = useSWR<OperatorMetrics[]>(`${Routes.API}/metrics/demand/operator/cm/${getOperationalDay()}`, { refreshInterval: 5 * 60 * 1000 }); // 5 minutes

	//
	// B. Render components

	return (
		<Surface>
			<Section withGap withPadding>
				<Grid columns="ab" withGap>
					<MetricsCardToday />
					<MetricsCardByLine />
				</Grid>
				<MetricsCardYearToDate chartHeight={200} />
				<Grid columns="abcd" withGap>
					<MetricsCardByOperator backgroundImage="/images/common/area1.svg" className={classNames(styles.area, styles.areaOne)} loading={isLoading} metrics={data && data[0]} />
					<MetricsCardByOperator backgroundImage="/images/common/area2.svg" className={classNames(styles.area, styles.areaTwo)} loading={isLoading} metrics={data && data[1]} />
					<MetricsCardByOperator backgroundImage="/images/common/area3.svg" className={classNames(styles.area, styles.areaThree)} loading={isLoading} metrics={data && data[2]} />
					<MetricsCardByOperator backgroundImage="/images/common/area4.svg" className={classNames(styles.area, styles.areaFour)} loading={isLoading} metrics={data && data[3]} />
				</Grid>
			</Section>
		</Surface>
	);

	//
}
