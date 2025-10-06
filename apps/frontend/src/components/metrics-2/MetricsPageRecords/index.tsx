'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageRecords() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPageRecords');

	//
	// B. Render components

	return (
		<Surface>
			<div id="passengerRecords">
				<Section heading={t('heading')} withPadding>
					<p className={styles.text}>{t('text_1')}</p>
				</Section>

				<Section withPadding>
					<Grid columns="ab" withGap>
						<Image src="/assets/metrics/record-1.svg" />
						<Image src="/assets/metrics/record-2.svg" />
					</Grid>
				</Section>
			</div>
		</Surface>
	);

	//
}
