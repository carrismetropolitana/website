'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { terminalsData } from '@/components/review-2025/_data/cards';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025GroupTerminal() {
	//
	const t = useTranslations('review-2025.Review2025GroupTerminal');

	return (
		<Surface forceOverflow>
			<Section withPadding="desktop" withGap>
				<div className={styles.headingWrapper}>
					<h2 className={styles.heading}>{t('heading')}</h2>
					<h5 className={styles.subheading}>{t('subheading')}</h5>
				</div>
			</Section>
			<Section withGap withPadding>
				<Grid columns="abc" withGap>
					{terminalsData.map((data, index) => <Review2025Card key={index} data={data} />)}
				</Grid>
			</Section>
		</Surface>
	);
	//
}
